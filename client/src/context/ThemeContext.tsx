import React from 'react';
import { Theme } from '../types/enums';

const ThemeContext = React.createContext({
  theme: Theme.Dark,
  setTheme: (_theme: any) => {},
  resetTheme: () => {},
});

export default ThemeContext;
