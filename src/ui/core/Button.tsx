import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

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
  const background = backgroundColor || theme.colors.accent;
  const color = titleColor || theme.colors.text;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: background, borderRadius: radius },
        pressed ? { opacity: 0.8 } : {},
      ]}
      onPress={onPress}>
      <Text style={[{ color }, styles.text]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 26,
    width: '100%',
    paddingVertical: 16,
  },
  text: {
    fontWeight: '500',
    fontSize: 18,
  },
});
