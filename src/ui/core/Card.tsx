import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';

import { Theme } from '@/types';
import { useTheme } from '@/ui/theme';

type CardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
};

export const Card = ({ children, minHeight = 100, maxHeight, minWidth, style }: CardProps) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const cardStyles = {
    minHeight,
    maxHeight,
    minWidth,
  };

  return (
    <View style={[style, styles.card, cardStyles]}>
      <View style={[styles.container]}>{children}</View>
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      borderColor: theme.colors.border,
      borderWidth: theme.borders.medium,
      overflow: 'hidden',
    },
    container: {
      padding: theme.spacing.lg,
    },
  });
