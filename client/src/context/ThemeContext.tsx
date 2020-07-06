import React from 'react';
import { DEFAULT_THEME } from '../types/constants';
import { Theme } from '../types/enums';
import { ThemeContextProps } from '../types/types';

const ThemeContext = React.createContext<ThemeContextProps>({
  theme: DEFAULT_THEME,
  setTheme: (theme: Theme) => {},
  resetTheme: () => {},
});

export default ThemeContext;
