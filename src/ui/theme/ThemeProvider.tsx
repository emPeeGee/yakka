import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';

import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { StatusBarStyle } from 'expo-status-bar';

import { ColorSchemeType, Theme } from '@/types';
import { getTheme } from './colors';

type ThemeContextType = {
  theme: Theme;
  userColorScheme: ColorSchemeType;
  statusBarScheme: StatusBarStyle;
  setColorScheme: (colorScheme: ColorSchemeType) => Promise<void>;
};

const SELECTED_THEME_KEY = 'SELECTED_THEME';
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

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
      value={{
        theme,
        userColorScheme: userColorScheme.current,
        setColorScheme,
        statusBarScheme: getStatusBarScheme(userColorScheme.current, systemColorScheme),
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

function getStatusBarScheme(
  userColorScheme: ColorSchemeType,
  systemColorScheme: ColorSchemeName,
): StatusBarStyle {
  switch (userColorScheme) {
    case 'light':
      return 'dark';
    case 'dark':
      return 'light';
    case 'system':
      return systemColorScheme === 'dark' ? 'light' : 'dark';
    default:
      throw new Error('No such color scheme');
  }
}
