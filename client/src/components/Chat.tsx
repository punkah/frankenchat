import React from 'react';
import { Message } from '../types';
import Input from './chat/Input';
import Messages from './chat/Messages';

const Chat = ({ messages }: { messages: Message[] }) => {
  return (
    <>
      <Messages messages={messages} />
      <Input />
    </>
  );
};

export default Chat;
