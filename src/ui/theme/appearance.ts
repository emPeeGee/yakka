import { ColorSchemeName } from 'react-native';

import { Theme, Colors } from '@/types';

const PRIMARY_COLORS = {
  primary100: '#0074CE',
  primary80: '#0693F1',
  primary60: '#3DB2FF',
  primary40: '#B8E1FF',
  primary20: '#EFF8FF',
};

const SECONDARY_COLORS = {
  secondary100: '#FFC107',
  secondary80: '#FFD899',
  secondary60: '#FFE5BB',
  secondary40: '#FFF2DD',
  secondary20: '#FFF9EF',
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
  surface: '#828282',
  background: '#000000',
  // background: '#121212',
  textPri: '#FFFFFF',
  textSec: '#9C9FA5',
  border: '#444444',
  link: '#3DB2FF',

  tabColor: '#888890',

  disabled: '#AA36A2',
  focus: '#AA36A2',
  placeholder: '#AA36A2',
  selection: '#AA36A2',
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

  surface: '#FAFAFA',
  background: '#FFFFFF',
  textPri: '#263238',
  textSec: '#898989',
  border: '#DADADA',
  link: '#3DB2FF',

  tabColor: '#1C1C1E',

  disabled: '#AA36A2',
  focus: '#AA36A2',
  placeholder: '#AA36A2',
  selection: '#AA36A2',
};

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
