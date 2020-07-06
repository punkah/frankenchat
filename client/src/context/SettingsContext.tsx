import React from 'react';
import { SettingContextProps } from '../types/types';

const SettingsContext = React.createContext<SettingContextProps>({
  getSetting: (setting: string) => '',
  setSetting: (setting: string, value: any) => {},
  resetSettings: () => {},
});

export default SettingsContext;
