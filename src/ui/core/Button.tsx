import React, { ComponentType, useMemo } from 'react';
import { DimensionValue, StyleSheet } from 'react-native';

import { Theme, VoidCb } from '@/types';
import { EnhancedPressable } from './EnhancedPressable';
import { EnhancedText, TextProps } from './EnhancedText';
import { useGlobalThemedStyles, useTheme } from '../theme';

type ButtonProps = {
  text?: TextProps['text'];
  tx?: TextProps['tx'];
  txOptions?: TextProps['txOptions'];
  textProps?: TextProps;
  backgroundColor?: string;
  color?: string;
  width?: DimensionValue;
  onPress?: VoidCb;
  disabled?: boolean;
  Right?: ComponentType<any>;
  Left?: ComponentType<any>;
};

export const Button = ({
  tx,
  text,
  width = '100%',
  textProps,
  color: titleColor,
  backgroundColor,
  disabled = false,
  onPress,
  Right,
  Left,
}: ButtonProps) => {
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();
  const background = backgroundColor || theme.colors.primary;
  const color = titleColor || theme.colors.textPri;
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <EnhancedPressable
      style={[
        gStyles.centerRow,
        styles.button,
        { backgroundColor: background, width, gap: theme.spacing.xs },
        disabled ? styles.disabledButton : {},
      ]}
      onPress={onPress}
      disabled={disabled}>
      {Left && <Left />}
      <EnhancedText
        style={[styles.text, { color }, disabled ? styles.disabledText : {}]}
        text={text}
        tx={tx}
        preset="button"
        {...textProps}
      />

      {Right && <Right />}
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
