import React from 'react';
import { StyleSheet } from 'react-native';

import { EnhancedPressable } from './EnhancedPressable';
import { EnhancedText } from './EnhancedText';
import { useTheme } from '../theme';

type ButtonProps = {
  title: string;
  backgroundColor?: string;
  titleColor?: string;
  onPress?: () => void;
  radius?: number;
};

export const Button = ({
  title,
  titleColor,
  backgroundColor,
  radius = 12,
  onPress,
}: ButtonProps) => {
  const { theme } = useTheme();
  const background = backgroundColor || theme.colors.primary;
  const color = titleColor || theme.colors.textPri;

  return (
    <EnhancedPressable
      style={[styles.button, { backgroundColor: background, borderRadius: radius }]}
      onPress={onPress}>
      <EnhancedText style={[{ color, textAlign: 'center' }]} variant="titleMedium">
        {title}
      </EnhancedText>
    </EnhancedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 26,
    width: '100%',
    paddingVertical: 16,
  },
});
