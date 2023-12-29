import { ColorSchemeName } from 'react-native';

import { Theme, Colors } from '@/types';

const PRIMARY_COLORS = {
  primary: '#009688',
  primaryLight: 'rgb(0, 105, 95)',
  primaryDark: 'rgb(51, 171, 159)',
  primary50: '#E0F2F1',
  primary100: '#B2DFDB',
  primary200: '#80CBC4',
  primary300: '#4DB6AC',
  primary400: '#26A69A',
  primary500: '#009688',
  primary600: '#00897B',
  primary700: '#00796B',
  primary800: '#00695C',
  primary900: '#004D40',
  primaryA100: '#A7FFEB',
  primaryA200: '#64FFDA',
  primaryA400: '#1DE9B6',
  primaryA700: '#00BFA5',
};

const SECONDARY_COLORS = {
  secondary: '#FFC107',
  secondaryLight: 'rgb(255, 205, 56)',
  secondaryDark: 'rgb(178, 135, 4)',
  secondary50: '#FFF8E1',
  secondary100: '#FFECB3',
  secondary200: '#FFE082',
  secondary300: '#FFD54F',
  secondary400: '#FFCA28',
  secondary500: '#FFC107',
  secondary600: '#FFB300',
  secondary700: '#FFA000',
  secondary800: '#FF8F00',
  secondary900: '#FF6F00',
  secondaryA100: '#FFE57F',
  secondaryA200: '#FFD740',
  secondaryA400: '#FFC400',
  secondaryA700: '#FFAB00',
};

const BASE_COLORS = {
  base100: '#111111',
  base80: '#707070',
  base60: '#A0A0A0',
  base40: '#CFCFCF',
  base20: '#F3F3F3',
  base0: '#FFFFFF',
};

const DARK_COLORS: Colors = {
  ...PRIMARY_COLORS,
  ...SECONDARY_COLORS,
  ...BASE_COLORS,

  success: '#99CC29',
  warning: '#FFD237',
  error: '#FF4B4C',
  info: '#3870FF',

  // https://uxplanet.org/8-tips-for-dark-theme-design-8dfc2f8f7ab6
  surface: '#424242',
  background: '#303030',

  textPri: '#FFFFFF',
  textSec: 'rgba(255, 255, 255, 0.7)',
  textDis: 'rgba(255, 255, 255, 0.5)',
  border: 'rgba(255, 255, 255, 0.12)',

  // as textSec
  tabColor: 'rgba(255, 255, 255, 0.5)',
};

const LIGHT_COLORS: Colors = {
  ...PRIMARY_COLORS,
  ...SECONDARY_COLORS,
  ...BASE_COLORS,

  // Accent Colors
  success: '#99CC29',
  warning: '#FFD237',
  error: '#FF4B4C',
  info: '#3870FF',

  surface: '#FFFFFF',
  background: '#FAFAFA',
  textPri: 'rgba(0, 0, 0, 0.87)',
  textSec: 'rgba(0, 0, 0, 0.54)',
  textDis: 'rgba(0, 0, 0, 0.38)',

  border: 'rgba(0, 0, 0, 0.12)',

  // as textPri
  tabColor: 'rgba(0, 0, 0, 0.87)',
};
// https://bareynol.github.io/mui-theme-creator/
// eslint-disable-next-line max-lines-per-function
export const getTheme = (colorScheme: ColorSchemeName): Theme => {
  const colors = colorScheme === 'dark' ? DARK_COLORS : LIGHT_COLORS;
  return {
    colors,
    // TODO: typography not used yet
    typography: {
      fontFamily: 'Arial, sans-serif',
      fontSize: {
        small: 12,
        medium: 16,
        large: 20,
        extraLarge: 24,
      },
      fontWeight: {
        regular: '400',
        bold: '700',
      },
      lineHeight: {
        small: 16,
        medium: 20,
        large: 24,
        extraLarge: 28,
      },
    },
    // naming, XXS, XS, S, M, L, XL, XXL
    spacing: {
      tiny: 6,
      extraSmall: 8,
      small: 12,
      medium: 16,
      large: 24,
      extraLarge: 32,
    },
    borderRadius: {
      extraSmall: 4,
      small: 6,
      medium: 8,
      large: 12,
    },
    shadows: {
      small: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
      },
      medium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      },
      large: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
      },
    },
    borders: {
      thin: 1,
      medium: 2,
      thick: 4,
    },
    gradients: {
      primary: ['#3498db', '#2ecc71'],
      secondary: ['#f39c12', '#e74c3c'],
    },
  };
};
