import React, { useState } from 'react';
import socket from '../../socket';
import {
  DEFAULT_SEND_MESSAGES_ON_CTRL_ENTER,
  Setting,
} from '../../types/constants';
import { SendMessageOnCtrlEnter } from '../../types/enums';
import './input.scss';

const Input = ({ initialMessage = '' }) => {
  const [message, setMessage] = useState(initialMessage);

  const sendOnCtrlEnterTurnedOn =
    (localStorage.getItem(Setting.SendMessageOnCtrlEnter) ||
      DEFAULT_SEND_MESSAGES_ON_CTRL_ENTER) === SendMessageOnCtrlEnter.On;

  const handleSend = () => {
    if (!message) {
      return;
    }
    const username = localStorage.getItem(Setting.Username);
    socket.emit('chat-message', { username: username || socket.id, message });
    setMessage('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      (sendOnCtrlEnterTurnedOn &&
        event.key === 'Enter' &&
        event.ctrlKey === true) ||
      (!sendOnCtrlEnterTurnedOn &&
        event.key === 'Enter' &&
        event.ctrlKey === false)
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
