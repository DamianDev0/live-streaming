import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRemoteUsers, useRTCClient } from 'agora-rtc-react';

export const Viewer = () => {
  const { channelName } = useParams<{ channelName: string }>();
  const [isConnected, setIsConnected] = useState(false);
  const agoraClient = useRTCClient();
  const remoteUsers = useRemoteUsers();

  useEffect(() => {
    const joinChannelAsViewer = async () => {
      if (channelName) {
        try {
          await agoraClient.join('ea48913c23d049608c170c70e20bec1e', channelName, null, null);
          setIsConnected(true);
        } catch (error) {
          console.error('Failed to join channel as viewer:', error);
          setIsConnected(false);
        }
      }
    };

    joinChannelAsViewer();

    return () => {
      agoraClient.leave().catch((error) => console.error('Failed to leave channel:', error));
    };
  }, [agoraClient, channelName]);

  useEffect(() => {
    remoteUsers.forEach((user) => {
      agoraClient.subscribe(user, 'video').then(() => {
        user.videoTrack?.play(`remote-video-${user.uid}`);
      });
    });

    return () => {
      remoteUsers.forEach((user) => {
        user.videoTrack?.stop();
      });
    };
  }, [agoraClient, remoteUsers]);

  return (
    <div id="viewer-container">
      {isConnected ? (
        <div id="remoteVideoGrid">
          {remoteUsers.length > 0 ? (
            remoteUsers.map((user) => (
              <div key={user.uid} className="remote-video-container">
                <div id={`remote-video-${user.uid}`} className="remote-video" />
              </div>
            ))
          ) : (
            <p>No one is currently streaming.</p>
          )}
        </div>
      ) : (
        <p>Connecting to the channel...</p>
      )}
    </div>
  );
};
