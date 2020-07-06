import React from 'react';

type SettingContextProps = {
  getSetting: (setting: string) => string;
  setSetting: (setting: string, value: any) => void;
  resetSettings: () => void;
};

const SettingsContext = React.createContext<SettingContextProps>({
  getSetting: (setting: string) => '',
  setSetting: (setting: string, value: any) => {},
  resetSettings: () => {},
});

export default SettingsContext;
