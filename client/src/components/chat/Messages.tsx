import moment from 'moment';
import React, { useContext, useEffect, useRef } from 'react';
import SettingsContext from '../../context/SettingsContext';
import { Setting } from '../../types/constants';
import { ClockDisplay } from '../../types/enums';
import { Message } from '../../types/interfaces';
import './messages.scss';

const Messages = ({ messages }: { messages: Message[] }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { getSetting } = useContext(SettingsContext);

  const getDate = (timestamp: number) =>
    getSetting(Setting.ClockDisplay) === ClockDisplay.Twelve
      ? moment(timestamp).format('hh:mm A')
      : moment(timestamp).format('HH:mm');

  const isCurrentUser = (username: string) =>
    username === getSetting(Setting.Username);

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'auto' });
  }, [messages]);

  const renderMessage = ({ timestamp, username, message }: Message) => {
    return (
      <div
        key={timestamp}
        className={`message ${isCurrentUser(username) ? 'right' : 'left'}`}
      >
        <div className={'timestamp text-secondary'}>
          {!isCurrentUser(username) && `${username}, `}
          {getDate(timestamp)}
        </div>
        <pre className={'bubble'}>{message}</pre>
      </div>
    );
  };

  return (
    <div className={'messages'}>
      {messages.map((message) => renderMessage(message))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
