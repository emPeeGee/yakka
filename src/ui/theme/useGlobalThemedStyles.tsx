import { useMemo } from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';

import { Theme } from '@/types';
import { useTheme } from './ThemeProvider';

const getGlobalStyles = (theme: Theme) =>
  StyleSheet.create({
    // in case it doesn't work: https://docs.expo.dev/versions/latest/sdk/safe-area-context/
    /**
     * Used to handle safe area view on android
     *
     * @deprecated
     */
    notchSafeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
    text: {
      color: theme.colors.textPri,
    },

    centerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },

    centerColumn: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },

    centerColumnReverse: {
      flexDirection: 'column-reverse',
      alignItems: 'center',
      justifyContent: 'center',
    },

    centerRowBetween: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    centerColumnBetween: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    centerColumnStart: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },

    centerRowStart: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    startRowStart: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },

    fullWidthFromStart: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
  });

// TODO: Make it provider!
export const useGlobalThemedStyles = () => {
  const { theme } = useTheme();

  // We only want to recompute the stylesheet on changes in color.
  const styles = useMemo(() => getGlobalStyles(theme), [theme]);

  return styles;
};
