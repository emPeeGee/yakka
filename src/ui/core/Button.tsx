import React, { ComponentType, useMemo } from 'react';
import { DimensionValue, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';

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
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
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
  style,
  textStyle,
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
        style,
      ]}
      onPress={onPress}
      disabled={disabled}>
      {Left && <Left />}
      <EnhancedText
        style={[styles.text, { color }, disabled ? styles.disabledText : {}, textStyle]}
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
      padding: theme.spacing.sm,
      borderRadius: theme.borderRadius.xl,
      width: '100%',
      paddingVertical: theme.spacing.md,
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
