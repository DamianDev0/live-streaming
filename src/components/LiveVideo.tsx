import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteUsers,
  LocalUser,
  RemoteUser
} from 'agora-rtc-react';

export const LiveVideo = () => {
  const appId = 'ea48913c23d049608c170c70e20bec1e'; // Reemplaza con tu App ID
  const { channelName } = useParams<{ channelName: string }>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const location = useLocation();
  const navigate = useNavigate();

  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  const remoteUsers = useRemoteUsers();

  useJoin({
    appid: appId,
    channel: channelName!,
    token: null, // Sin token
  });

  usePublish([localMicrophoneTrack, localCameraTrack]);

  useEffect(() => {
    localCameraTrack?.play('local-video');
    localMicrophoneTrack?.play();
  }, [localCameraTrack, localMicrophoneTrack]);

  return (
    <>
      <div id="remoteVideoGrid">
        {remoteUsers.map((user) => (
          <div key={user.uid} className="remote-video-container">
            <RemoteUser user={user} />
          </div>
        ))}
      </div>
      {localCameraTrack && localMicrophoneTrack && (
        <div id="localVideo">
          <LocalUser
            audioTrack={localMicrophoneTrack}
            videoTrack={localCameraTrack}
            cameraOn={cameraOn}
            micOn={micOn}
            playAudio={micOn}
            playVideo={cameraOn}
          />
          <div>
            <div id="controlsToolbar">
              <button onClick={() => setMic((prev) => !prev)}>
                {micOn ? 'Mute Mic' : 'Unmute Mic'}
              </button>
              <button onClick={() => setCamera((prev) => !prev)}>
                {cameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
              </button>
              <button onClick={() => navigate('/')}>Disconnect</button>
            </div>
          </div>
        </div>
      )}
      {!localCameraTrack && !localMicrophoneTrack && (
        <div>
          <p>Please wait for the stream to start...</p>
        </div>
      )}
    </>
  );
};
