import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';

import * as NavigationBar from 'expo-navigation-bar';

import { FONT_SIZE_DATA_KEY } from '@/core/constants';
import { rootLog } from '@/core/logger';
import { getItem, setItem } from '@/core/storage';
import { isThemeDark } from '@/core/utils';
import { UserColorSchemeType, Theme, AppColorSchemeType } from '@/types';
import { DEFAULT_FONT_SIZE, getTheme } from './appearance';

type ThemeContextType = {
  theme: Theme;
  fontSize: number;
  userColorScheme: UserColorSchemeType;
  appColorScheme: AppColorSchemeType;
  setColorScheme: (colorScheme: UserColorSchemeType) => Promise<void>;
  isDark: boolean;
  changeFontSize: (fontSize: number | null) => Promise<void>;
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
  const fontSize = useRef<number>(DEFAULT_FONT_SIZE);

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
      const savedFontSize = await getItem<number>(FONT_SIZE_DATA_KEY);

      if (colorScheme) {
        setColorScheme(colorScheme);
      }

      if (savedFontSize) {
        fontSize.current = savedFontSize;
        setTheme(getTheme(appColorScheme.current, savedFontSize));
      }
    };
    readTheme();
  }, []);

  useEffect(() => {
    if (userColorScheme.current === 'system') {
      setTheme(getTheme(systemColorScheme, fontSize.current));
    }
  }, [systemColorScheme]);

  const setColorScheme = async (colorScheme: UserColorSchemeType) => {
    await setItem(SELECTED_THEME_KEY, colorScheme);
    userColorScheme.current = colorScheme;

    switch (colorScheme) {
      case 'light':
      case 'dark':
        appColorScheme.current = colorScheme;
        setTheme(getTheme(colorScheme, fontSize.current));
        break;
      case 'system':
        // NOTE: Assigning appColorScheme after setTheme won't have the latest value when consumed. It must be set before.
        appColorScheme.current = systemColorScheme as AppColorSchemeType;
        setTheme(getTheme(systemColorScheme, fontSize.current));
        break;
    }

    const newTheme = getTheme(appColorScheme.current, fontSize.current);
    // Color system nav bar as the background color
    NavigationBar.setBackgroundColorAsync(newTheme.colors.background);
    rootLog.info('User theme changed: ', userColorScheme.current, appColorScheme.current);
  };

  const changeFontSize = useCallback(
    async (size: number | null | undefined) => {
      console.log('calling change', size);
      if (fontSize.current === size || !size) {
        return;
      }

      const newFontSize = size || DEFAULT_FONT_SIZE;

      fontSize.current = newFontSize;
      await setItem(FONT_SIZE_DATA_KEY, newFontSize);
      setTheme(getTheme(appColorScheme.current, newFontSize));
    },
    [fontSize],
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        userColorScheme: userColorScheme.current,
        appColorScheme: appColorScheme.current,
        setColorScheme,
        isDark: isThemeDark(appColorScheme.current),
        fontSize: fontSize.current,
        changeFontSize,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
