import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { Theme, VoidCb } from '@/types';
import { EnhancedPressable } from './EnhancedPressable';
import { EnhancedText, TextProps } from './EnhancedText';
import { useTheme } from '../theme';

type ButtonProps = {
  text?: TextProps['text'];
  tx?: TextProps['tx'];
  txOptions?: TextProps['txOptions'];
  textProps?: TextProps;
  backgroundColor?: string;
  color?: string;
  onPress?: VoidCb;
  disabled?: boolean;
};

export const Button = ({
  tx,
  text,
  textProps,
  color: titleColor,
  backgroundColor,
  disabled = false,
  onPress,
}: ButtonProps) => {
  const { theme } = useTheme();
  const background = backgroundColor || theme.colors.primary;
  const color = titleColor || theme.colors.textPri;
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <EnhancedPressable
      style={[
        styles.button,
        { backgroundColor: background },
        disabled ? styles.disabledButton : {},
      ]}
      onPress={onPress}
      disabled={disabled}>
      <EnhancedText
        style={[styles.text, { color }, disabled ? styles.disabledText : {}]}
        text={text}
        tx={tx}
        preset="button"
        {...textProps}
      />
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
    text: {
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    disabledButton: {
      backgroundColor: theme.colors.base40,
    },
    disabledText: {
      color: theme.colors.textDis,
    },
  });
