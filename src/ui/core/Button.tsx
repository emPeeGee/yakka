import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { Theme } from '@/types';
import { EnhancedPressable } from './EnhancedPressable';
import { EnhancedText } from './EnhancedText';
import { useTheme } from '../theme';

type ButtonProps = {
  title: string;
  backgroundColor?: string;
  titleColor?: string;
  onPress?: () => void;
};

export const Button = ({ title, titleColor, backgroundColor, onPress }: ButtonProps) => {
  const { theme } = useTheme();
  const background = backgroundColor || theme.colors.primary;
  const color = titleColor || theme.colors.textPri;
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <EnhancedPressable style={[styles.button, { backgroundColor: background }]} onPress={onPress}>
      <EnhancedText style={[{ color, textAlign: 'center' }]} size="md">
        {title}
      </EnhancedText>
    </EnhancedPressable>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      padding: 12,
      borderRadius: theme.borderRadius.xl,
      width: '100%',
      paddingVertical: 16,
    },
  });
