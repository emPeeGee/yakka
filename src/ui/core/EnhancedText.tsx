import React, { ForwardedRef, forwardRef } from 'react';
import { StyleProp, Text, TextProps as RNTextProps, TextStyle } from 'react-native';

import i18n from 'i18n-js';

import { isRTL, TxKeyPath, translate } from '@/core/i18n';
import { TypographyPresets, FontSizes, FontWeights } from '@/types';
import { useGlobalThemedStyles, useTheme } from '../theme';

type Sizes = keyof FontSizes;
type Presets = keyof TypographyPresets;

export interface TextProps extends RNTextProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath;
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string;
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: i18n.TranslateOptions;
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>;
  /**
   * One of the different types of text presets.
   */
  preset?: Presets;
  /**
   * Text weight modifier.
   */
  weight?: keyof FontWeights;
  /**
   * Text size modifier.
   */
  size?: Sizes;
  /**
   * Children components.
   */
  children?: React.ReactNode;
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 */

const CustomText = (props: React.PropsWithChildren<TextProps>, ref: ForwardedRef<Text>) => {
  const {
    weight,
    size,
    tx,
    txOptions,
    text,
    children,
    style: styleOverride,
    preset = 'default',
    ...rest
  } = props;
  const globalThemes = useGlobalThemedStyles();
  const { theme } = useTheme();

  const i18nText = tx && translate(tx, txOptions);
  const content = i18nText || text || children;

  const styles: StyleProp<TextStyle> = [
    rtlStyle,
    theme.typography.presets[preset],
    weight && theme.typography.weights[weight],
    size && theme.typography.sizes[size],

    globalThemes.text,
    styleOverride,
  ];

  return (
    <Text ref={ref} style={styles} {...rest}>
      {content}
    </Text>
  );
};

const rtlStyle: TextStyle = isRTL ? { writingDirection: 'rtl' } : {};

export const EnhancedText = forwardRef(CustomText);
