import React, { useEffect, useState } from 'react';
import Chat from '../components/Chat';
import Header from '../components/Header';
import Settings from '../components/Settings';
import ThemeProvider from '../context/ThemeProvider';
import socket from '../socket';
import { Tab } from '../types/enums';
import { Message } from '../types/interfaces';
import './main.scss';

const Main = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedTab, setSelectedTab] = useState(Tab.Chat);

  useEffect(() => {
    socket.on('chat-message', (message: Message) => {
      setMessages((messages) => [...messages, message]);
    });
    socket.on('reconnect', (messages: Message[]) => setMessages(messages));
  }, []);

  return (
    <div className={'main'}>
      <ThemeProvider>
        <Header selectedTab={selectedTab} onTabChange={setSelectedTab} />
        {selectedTab === Tab.Chat && <Chat messages={messages} />}
        {selectedTab === Tab.Settings && <Settings />}
      </ThemeProvider>
    </div>
  );
};

export default Main;
