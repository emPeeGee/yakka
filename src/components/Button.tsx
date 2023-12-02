import { Pressable, StyleSheet, Text } from 'react-native';
import { getContrastColor } from '@/utils';
import React from 'react';

type ButtonProps = {
  title: string;
  backgroundColor?: string;
  titleColor?: string;
  onPress?: () => void;
};
export const Button = ({ title, titleColor, backgroundColor, onPress }: ButtonProps) => {
  // TODO: move into theme
  const background = backgroundColor || '#ffffff';
  const color = titleColor || getContrastColor(background);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: background },
        pressed ? { opacity: 0.8 } : {},
      ]}
      onPress={onPress}>
      <Text style={{ color }}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 26,
  },
});
