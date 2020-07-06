import React, { useContext, useState } from 'react';
import SettingsContext from '../../context/SettingsContext';
import socket from '../../socket';
import { Setting } from '../../types/constants';
import { SendMessageOnCtrlEnter } from '../../types/enums';
import './input.scss';

const Input = () => {
  const [message, setMessage] = useState('');
  const { getSetting } = useContext(SettingsContext);

  const handleSend = () => {
    if (!message) {
      return;
    }
    const username = getSetting(Setting.Username);
    socket.emit('chat-message', { username, message });
    setMessage('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      (event.key === 'Enter' &&
        event.ctrlKey === true &&
        getSetting(Setting.SendMessageOnCtrlEnter) ===
          SendMessageOnCtrlEnter.On) ||
      (event.key === 'Enter' &&
        event.ctrlKey === false &&
        getSetting(Setting.SendMessageOnCtrlEnter) ===
          SendMessageOnCtrlEnter.Off)
    ) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  return (
    <div className={'input'}>
      <textarea
        placeholder="Enter message"
        rows={1}
        value={message}
        onKeyPress={handleKeyPress}
        onChange={handleInputChange}
        autoFocus={true}
      />
      <button disabled={!message} onClick={handleSend}>
        <i className="fas fa-paper-plane"></i>
      </button>
    </div>
  );
};

export default Input;
