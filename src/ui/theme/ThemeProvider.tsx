import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';

import * as NavigationBar from 'expo-navigation-bar';
import { StatusBarStyle } from 'expo-status-bar';

import { rootLog } from '@/core/logger';
import { getItem, setItem } from '@/core/storage';
import { UserColorSchemeType, Theme, AppColorSchemeType } from '@/types';
import { getTheme } from './appearance';

type ThemeContextType = {
  theme: Theme;
  userColorScheme: UserColorSchemeType;
  appColorScheme: AppColorSchemeType;
  statusBarScheme: StatusBarStyle;
  setColorScheme: (colorScheme: UserColorSchemeType) => Promise<void>;
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
  const [theme, setTheme] = useState<Theme>(getTheme(systemColorScheme));

  /**
   * The color scheme selected by the user, which can be one of: dark, light, or system.
   */
  const userColorScheme = useRef<UserColorSchemeType>(systemColorScheme as UserColorSchemeType);

  /**
   * The color scheme of the application, which is based on user preferences and can be 'dark', 'light', or 'system'.
   * If 'system' is selected, the actual color (dark or light) is determined by the system.
   *
   */
  const appColorScheme = useRef<AppColorSchemeType>(systemColorScheme as AppColorSchemeType);

  useEffect(() => {
    const readTheme = async () => {
      const colorScheme = await getItem<UserColorSchemeType>(SELECTED_THEME_KEY);
      if (colorScheme) {
        setColorScheme(colorScheme);
      }
    };
    readTheme();
  }, []);

  useEffect(() => {
    if (userColorScheme.current === 'system') {
      setTheme(getTheme(systemColorScheme));
    }
  }, [systemColorScheme]);

  const setColorScheme = async (colorScheme: UserColorSchemeType) => {
    await setItem(SELECTED_THEME_KEY, colorScheme);
    userColorScheme.current = colorScheme;

    switch (colorScheme) {
      case 'light':
      case 'dark':
        appColorScheme.current = colorScheme;
        setTheme(getTheme(colorScheme));
        break;
      case 'system':
        // NOTE: Assigning appColorScheme after setTheme won't have the latest value when consumed. It must be set before.
        appColorScheme.current = systemColorScheme as AppColorSchemeType;
        setTheme(getTheme(systemColorScheme));
        break;
    }

    const newTheme = getTheme(appColorScheme.current);
    // Color system nav bar as the background color
    NavigationBar.setBackgroundColorAsync(newTheme.colors.background);
    rootLog.info('User theme changed: ', userColorScheme.current, appColorScheme.current);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        userColorScheme: userColorScheme.current,
        appColorScheme: appColorScheme.current,
        setColorScheme,
        statusBarScheme: getStatusBarScheme(userColorScheme.current, systemColorScheme),
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

function getStatusBarScheme(
  userColorScheme: UserColorSchemeType,
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
