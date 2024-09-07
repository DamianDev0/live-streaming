import React from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { ConnectForm } from './components/ConnectForm';
import { LiveVideo } from './components/LiveVideo';
import { RemoteVideo } from './components/RemotoVideo';
import AgoraRTC, { AgoraRTCProvider, useRTCClient } from 'agora-rtc-react';
import './App.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const agoraClient = useRTCClient(AgoraRTC.createClient({ codec: 'vp8', mode: 'live' }));

  const handleConnect = (channelName: string) => {
    if (location.pathname.includes('remote')) {
      navigate(`/remote/${channelName}`);
    } else {
      navigate(`/via/${channelName}`);
    }
  };
  return (
    <AgoraRTCProvider client={agoraClient}>
      <Routes>
        <Route path="/" element={<ConnectForm connectToVideo={handleConnect} routeType="default" />} />
        <Route path="/remote" element={<ConnectForm connectToVideo={handleConnect} routeType="default" />} />
        <Route path="/via/:channelName" element={<LiveVideo />} />
        <Route path="/remote/:channelName" element={<RemoteVideo />} />
      </Routes>
    </AgoraRTCProvider>
  );
}


export default App;
