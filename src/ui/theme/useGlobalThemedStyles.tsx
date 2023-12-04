import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { Theme } from '@/types';

import { useTheme } from './ThemeProvider';

const getGlobalStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
    text: {
      color: theme.colors.text,
    },
  });

export const useGlobalThemedStyles = () => {
  const { theme } = useTheme();

  // We only want to recompute the stylesheet on changes in color.
  const styles = useMemo(() => getGlobalStyles(theme), [theme]);

  return styles;
};
