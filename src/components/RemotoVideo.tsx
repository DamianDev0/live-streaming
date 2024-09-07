import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRemoteUsers, useJoin } from 'agora-rtc-react';
import { RemoteUser } from './RemoteUser';

export const RemoteVideo = () => {
  const { channelName } = useParams<{ channelName: string }>();
  const appId = 'ea48913c23d049608c170c70e20bec1e'; // Reemplaza con tu App ID
  const [isConnected, setIsConnected] = useState(false);
  
  // Unirse al canal
  useJoin({
    appid: appId,
    channel: channelName!,
    token: null, // No token for now
  }, isConnected);

  const remoteUsers = useRemoteUsers();

  useEffect(() => {
    setIsConnected(true);
  }, []);

  return (
    <div id="remoteVideoGrid">
      {remoteUsers.length > 0 ? (
        remoteUsers.map((user) => (
          <div key={user.uid} className="remote-video-container">
            <RemoteUser user={user} />
          </div>
        ))
      ) : (
        <p>No one is currently streaming.</p>
      )}
    </div>
  );
};
