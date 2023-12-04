import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { useColorScheme } from 'react-native';

import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { Theme } from '@/types';

import { getTheme } from './colors';

const SELECTED_THEME_KEY = 'SELECTED_THEME';

interface ThemeContextType {
  theme: Theme;
  userColorScheme: ColorSchemeType;
  setColorScheme: (colorScheme: ColorSchemeType) => Promise<void>;
}

type ColorSchemeType = 'light' | 'dark' | 'system';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

// TODO: storage and default light, dark and system https://medium.com/simform-engineering/manage-dark-mode-in-react-native-application-2a04ba7e76d0

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const { getItem, setItem } = useAsyncStorage(SELECTED_THEME_KEY);
  const [theme, setTheme] = useState<Theme>(getTheme(systemColorScheme));
  const userColorScheme = useRef<ColorSchemeType>(systemColorScheme as ColorSchemeType);

  useEffect(() => {
    const readTheme = async () => {
      try {
        const colorScheme = (await getItem()) as ColorSchemeType;
        setColorScheme(colorScheme);
        userColorScheme.current = colorScheme;
      } catch (error) {
        console.error('Error fetching theme from AsyncStorage:', error);
      }
    };
    readTheme();
  }, []);

  useEffect(() => {
    if (userColorScheme.current === 'system') {
      setTheme(getTheme(systemColorScheme));
    }
  }, [systemColorScheme]);

  console.log('theme-provider');

  const setColorScheme = async (colorScheme: ColorSchemeType) => {
    await setItem(colorScheme);
    userColorScheme.current = colorScheme;

    switch (colorScheme) {
      case 'light':
      case 'dark':
        setTheme(getTheme(colorScheme));
        break;
      case 'system':
        setTheme(getTheme(systemColorScheme));
        break;
    }
  };

  return (
    <ThemeContext.Provider
      value={{ theme, userColorScheme: userColorScheme.current, setColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
