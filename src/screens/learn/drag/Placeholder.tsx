import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Theme } from '@/types';
import { useTheme } from '@/ui/theme';

interface PlaceholderProps {
  style: StyleProp<ViewStyle>;
}

export function Placeholder({ style }: PlaceholderProps) {
  const { theme, appColorScheme } = useTheme();
  const styles = getStyles(theme, appColorScheme === 'dark');

  return <View style={[styles.placeholder, style]} />;
}

const getStyles = (theme: Theme, isDark: boolean) =>
  StyleSheet.create({
    placeholder: {
      backgroundColor: isDark ? theme.colors.surface : theme.colors.base40,
      borderRadius: theme.borderRadius.md,
    },
  });
