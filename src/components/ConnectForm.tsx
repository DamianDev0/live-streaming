import { useState } from 'react';


interface ConnectFormProps {
  connectToVideo: (channelName: string) => void;
  routeType: 'default' | 'remote';
}

export const ConnectForm = ({ connectToVideo, routeType }: ConnectFormProps) => {
  const [channelName, setChannelName] = useState('');
  const [invalidInputMsg, setInvalidInputMsg] = useState('');

  const handleConnect = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedChannelName = channelName.trim();

    if (!trimmedChannelName) {
      setInvalidInputMsg("Channel name can't be empty.");
      return;
    }

    connectToVideo(trimmedChannelName);
  };

  return (
    <form onSubmit={handleConnect}>
      <input 
        id="channelName"
        type="text"
        placeholder="Enter Channel Name"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button type="submit">
        {routeType === 'remote' ? 'Connect as Viewer' : 'Connect as Streamer'}
      </button>
      {invalidInputMsg && <p style={{ color: 'red' }}>{invalidInputMsg}</p>}
    </form>
  );
};
