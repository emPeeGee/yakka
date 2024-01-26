import { StyleProp, TextStyle } from 'react-native';

import { Dimensions } from './common';

export type AppColorSchemeType = 'light' | 'dark';
export type UserColorSchemeType = 'light' | 'dark' | 'system';

export type Shadow = {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};

export type Colors = {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primary50: string;
  primary100: string;
  primary200: string;
  primary300: string;
  primary400: string;
  primary500: string;
  primary600: string;
  primary700: string;
  primary800: string;
  primary900: string;
  // primaryA100: string;
  // primaryA200: string;
  // primaryA400: string;
  // primaryA700: string;

  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  secondary50: string;
  secondary100: string;
  secondary200: string;
  secondary300: string;
  secondary400: string;
  secondary500: string;
  secondary600: string;
  secondary700: string;
  secondary800: string;
  secondary900: string;
  // secondaryA100: string;
  // secondaryA200: string;
  // secondaryA400: string;
  // secondaryA700: string;

  base100: string;
  base80: string;
  base60: string;
  base40: string;
  base20: string;
  base0: string;

  surface: string;
  background: string;

  textPri: string;
  textSec: string;
  textDis: string;
  border: string;

  // Accent Colors
  success: string;
  warning: string;
  error: string;
  info: string;
  tabColor: string;
};

export type Theme = {
  colors: Colors;
  typography: {
    weights: FontWeights;
    sizes: FontSizes;
    presets: TypographyPresets;
  };
  spacing: Dimensions;
  borderRadius: Pick<Dimensions, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
  shadows: {
    small: Shadow;
    medium: Shadow;
    large: Shadow;
  };
  // TODO: dimensions as well
  borders: {
    thin: number;
    medium: number;
    thick: number;
  };
  gradients: {
    primary: string[];
    secondary: string[];
  };
};

export type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | undefined;

export type FontWeights = {
  bold: { fontWeight: FontWeight };
  medium: { fontWeight: FontWeight };
  regular: { fontWeight: FontWeight };
  light: { fontWeight: FontWeight };
};

type FontSize = { fontSize: number; lineHeight: number };

export type FontSizes = {
  xxxl: FontSize;
  xxl: FontSize;
  xl: FontSize;
  lg: FontSize;
  md: FontSize;
  sm: FontSize;
  xs: FontSize;
  xxs: FontSize;
};

export type TypographyPresets = {
  default: StyleProp<TextStyle>;
  bold: StyleProp<TextStyle>;
  heading: StyleProp<TextStyle>;
  subheading: StyleProp<TextStyle>;
  formLabel: StyleProp<TextStyle>;
  formHelper: StyleProp<TextStyle>;
  button: StyleProp<TextStyle>;
};
