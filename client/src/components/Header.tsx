import React, { useEffect, useState } from 'react';
import { Tab } from '../types/enums';
import { Message } from '../types/interfaces';
import './header.scss';

const Header = ({
  selectedTab,
  onTabChange,
  messages,
}: {
  selectedTab: Tab;
  onTabChange: (tab: Tab) => void;
  messages: Message[];
}) => {
  const [blinking, setBlinking] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const handleTabSelect = (tab: Tab) => () => {
    onTabChange(tab);
    if (tab === Tab.Chat) {
      setBlinking(false);
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    if (selectedTab === Tab.Settings) {
      setBlinking(true);
      setUnreadCount((count) => count + 1);
    }
  }, [messages]);

  return (
    <div className={'header'}>
      <div
        onClick={handleTabSelect(Tab.Chat)}
        className={
          selectedTab === Tab.Chat ? 'selected' : blinking ? ' blinking' : ''
        }
      >
        Chat {unreadCount ? `(${unreadCount})` : ''}
      </div>
      <div
        onClick={handleTabSelect(Tab.Settings)}
        className={selectedTab === Tab.Settings ? 'selected' : ''}
      >
        Settings
      </div>
    </div>
  );
};

export default Header;
