import React, { useState } from 'react';
import {
  DEFAULT_CLOCK_DISPLAY,
  DEFAULT_SEND_MESSAGES_ON_CTRL_ENTER,
  get_DEFAULT_USERNAME,
  Setting,
} from '../types/constants';
import SettingsContext from './SettingsContext';

const SettingsProvider = ({ children }: { children: any }) => {
  const [settings, setSettings] = useState({
    [Setting.Username]:
      localStorage.getItem(Setting.Username.toString()) ||
      get_DEFAULT_USERNAME(),
    [Setting.ClockDisplay]:
      localStorage.getItem(Setting.ClockDisplay.toString()) ||
      DEFAULT_CLOCK_DISPLAY,
    [Setting.SendMessageOnCtrlEnter]:
      localStorage.getItem(Setting.SendMessageOnCtrlEnter.toString()) ||
      DEFAULT_SEND_MESSAGES_ON_CTRL_ENTER,
  });

  const handleSettingChange = (name: string, value: string) => {
    setSettings((settings) => ({
      ...settings,
      [name]: value,
    }));
    localStorage.setItem(name.toString(), value);
  };

  const resetSettings = () => {
    const newSettings = {
      [Setting.Username.toString()]: get_DEFAULT_USERNAME(),
      [Setting.ClockDisplay.toString()]: DEFAULT_CLOCK_DISPLAY,
      [Setting.SendMessageOnCtrlEnter.toString()]: DEFAULT_SEND_MESSAGES_ON_CTRL_ENTER,
    };
    setSettings(newSettings);
    Object.keys(newSettings).forEach((setting) => {
      localStorage.setItem(setting, newSettings[setting]);
    });
  };

  const getSetting = (setting: string) => {
    return settings[setting] || '';
  };

  return (
    <SettingsContext.Provider
      value={{
        getSetting,
        setSetting: handleSettingChange,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
