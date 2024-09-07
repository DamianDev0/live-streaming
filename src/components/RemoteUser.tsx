import { useEffect, useRef } from 'react';
import { IAgoraRTCRemoteUser } from 'agora-rtc-react';

interface RemoteUserProps {
  user: IAgoraRTCRemoteUser;
}

export const RemoteUser: React.FC<RemoteUserProps> = ({ user }) => {
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoRef.current && user.videoTrack) {
      user.videoTrack.play(videoRef.current);
    }
  }, [user.videoTrack]);

  return <div ref={videoRef} className="remote-user-video"></div>;
};
