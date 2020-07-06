import { Theme } from './enums';

export type SettingContextProps = {
  getSetting: (setting: string) => string;
  setSetting: (setting: string, value: any) => void;
  resetSettings: () => void;
};
export type ThemeContextProps = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resetTheme: () => void;
};
