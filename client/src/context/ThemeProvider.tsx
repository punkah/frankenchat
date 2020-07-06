import React, { useLayoutEffect, useState } from 'react';
import { DEFAULT_THEME, Setting } from '../types/constants';
import { Theme } from '../types/enums';
import ThemeContext from './ThemeContext';

const ThemeProvider = ({ children }: { children: any }) => {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem(Setting.Theme) || DEFAULT_THEME) as Theme
  );

  useLayoutEffect(() => {
    applyTheme(`theme-${theme.toLowerCase()}`);
  }, [theme]);

  const applyTheme = (classname: string) => {
    const root = document.getElementsByTagName('html')[0];
    root.setAttribute('class', classname);
  };

  const setNewTheme = (theme: Theme) => {
    setTheme(theme);
    localStorage.setItem(Setting.Theme, theme);
  };

  const resetTheme = () => {
    setNewTheme(DEFAULT_THEME);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: setNewTheme,
        resetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
