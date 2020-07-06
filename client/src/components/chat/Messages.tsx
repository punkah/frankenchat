import moment from 'moment';
import React, { useEffect, useRef } from 'react';
import {
  DEFAULT_CLOCK_DISPLAY,
  get_DEFAULT_USERNAME,
  Setting,
} from '../../types/constants';
import { ClockDisplay } from '../../types/enums';
import { Message } from '../../types/interfaces';
import './messages.scss';

const Messages = ({ messages }: { messages: Message[] }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const clockDisplay =
    localStorage.getItem(Setting.ClockDisplay) || DEFAULT_CLOCK_DISPLAY;
  const currentUsername =
    localStorage.getItem(Setting.Username) || get_DEFAULT_USERNAME();

  const getDate = (timestamp: number) =>
    clockDisplay === ClockDisplay.Twelve
      ? moment(timestamp).format('hh:mm A')
      : moment(timestamp).format('HH:mm');

  const isCurrentUser = (username: string) => username === currentUsername;

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
