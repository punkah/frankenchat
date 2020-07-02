import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const SOCKET_ENDPOINT = 'http://localhost:5000';
const socket = io(SOCKET_ENDPOINT);

const Main = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on(
      'chat-message',
      ({ user, msg }: { user: string; msg: string }) => {
        console.log('message received', user, msg);
        setMessages((m) => m.concat([`${user}: ${msg}`]));
      }
    );

    socket.on('connect', () => {
      console.log('socket id', socket.id);
      socket.emit('chat-message', 'hellohallo');
    });
  }, []);

  return (
    <>
      Messages:
      <div>
        {messages.map((msg) => (
          <div>{msg}</div>
        ))}
      </div>
    </>
  );
};

export default Main;
