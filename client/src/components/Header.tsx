import React from 'react';
import { Tab } from '../types/enums';
import './header.scss';

const Header = ({
  selectedTab,
  onTabChange,
}: {
  selectedTab: Tab;
  onTabChange: (tab: Tab) => void;
}) => {
  const handleTabSelect = (tab: Tab) => () => {
    onTabChange(tab);
  };

  return (
    <div className={'header'}>
      <div
        onClick={handleTabSelect(Tab.Chat)}
        className={selectedTab === Tab.Chat ? 'selected' : ''}
      >
        Chat
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
