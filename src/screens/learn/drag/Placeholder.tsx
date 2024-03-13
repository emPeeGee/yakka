import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Theme } from '@/types';
import { useTheme } from '@/ui/theme';

interface PlaceholderProps {
  style: StyleProp<ViewStyle>;
}

export function Placeholder({ style }: PlaceholderProps) {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return <View style={[styles.placeholder, style]} />;
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    placeholder: {
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
    },
  });
