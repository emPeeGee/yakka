import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import { Theme } from '@/types';

import { getTheme } from './colors';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

// TODO: storage and default light, dark and system https://medium.com/simform-engineering/manage-dark-mode-in-react-native-application-2a04ba7e76d0
const initialTheme: Theme = getTheme('light');

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const colorScheme = useColorScheme();

  useEffect(() => {
    console.log('Color scheme changed', colorScheme);
    setTheme(getTheme(colorScheme));
  }, [colorScheme]);

  const toggleTheme = () => {
    // setTheme(Object.assign(lightTheme));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
