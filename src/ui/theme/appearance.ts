import { ColorSchemeName, StyleProp, TextStyle } from 'react-native';

import { Theme, Colors } from '@/types';

const PRIMARY_COLORS = {
  primary: '#009688',
  primaryLight: '#4DB6AC',
  primaryDark: '#00796B',
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
  // primaryA100: '#A7FFEB',
  // primaryA200: '#64FFDA',
  // primaryA400: '#1DE9B6',
  // primaryA700: '#00BFA5',
} satisfies Partial<Colors>;

const SECONDARY_COLORS = {
  secondary: '#FFC107',
  secondaryLight: '#FFD54F',
  secondaryDark: '#FFA000',
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
  // secondaryA100: '#FFE57F',
  // secondaryA200: '#FFD740',
  // secondaryA400: '#FFC400',
  // secondaryA700: '#FFAB00',
} satisfies Partial<Colors>;

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
  successBackground: '#547017',
  warning: '#FFD237',
  error: '#FF4B4C',
  errorBackground: '#b50001',
  info: '#3870FF',

  mint: '#00C9B1',
  lilac: '#8E78CF',
  coral: '#FFA17A',
  chilly: '#E32227',

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
  successBackground: '#F5FFD8',
  warning: '#FFD237',
  error: '#FF4B4C',
  errorBackground: '#FFDDD8',
  info: '#3870FF',

  mint: '#00C9B1',
  lilac: '#8E78CF',
  coral: '#FFA17A',
  chilly: '#E32227',

  surface: '#CFCFCF',
  background: '#FAFAFA',
  textPri: 'rgba(0, 0, 0, 0.87)',
  textSec: 'rgba(0, 0, 0, 0.54)',
  textDis: 'rgba(0, 0, 0, 0.38)',

  border: 'rgba(0, 0, 0, 0.12)',

  // as textPri
  tabColor: 'rgba(0, 0, 0, 0.87)',
};

type TypographyItem = {
  fontSize: number;
  lineHeight: number;
};

type Typography = {
  xxxl: TypographyItem;
  xxl: TypographyItem;
  xl: TypographyItem;
  lg: TypographyItem;
  md: TypographyItem;
  sm: TypographyItem;
  xs: TypographyItem;
  xxs: TypographyItem;
};

const getTypographySizes = (size: number) => {
  // TODO: rename
  const baseSize = size - DEFAULT_FONT_SIZE;

  return {
    xxxl: { fontSize: 48 + baseSize * 2, lineHeight: 56 + baseSize * 2 } satisfies TextStyle,
    xxl: { fontSize: 36 + baseSize * 2, lineHeight: 44 + baseSize * 2 } satisfies TextStyle,
    xl: { fontSize: 24 + baseSize * 1.5, lineHeight: 32 + baseSize * 1.5 } satisfies TextStyle,
    lg: { fontSize: 20 + baseSize, lineHeight: 30 } satisfies TextStyle,
    md: { fontSize: 18 + baseSize, lineHeight: 24 } satisfies TextStyle,
    sm: { fontSize: 16 + baseSize, lineHeight: 24 } satisfies TextStyle,
    xs: { fontSize: 14 + baseSize, lineHeight: 20 } satisfies TextStyle,
    xxs: { fontSize: 12 + baseSize, lineHeight: 16 } satisfies TextStyle,
  };
};

const FONT_WEIGHTS = {
  bold: { fontWeight: '700' } satisfies TextStyle,
  medium: { fontWeight: '500' } satisfies TextStyle,
  regular: { fontWeight: '400' } satisfies TextStyle,
  light: { fontWeight: '300' } satisfies TextStyle,
};

const getFontPresets = (typography: Typography) => {
  const textBaseStyle: StyleProp<TextStyle> = [typography.xs, FONT_WEIGHTS.regular];

  return {
    default: textBaseStyle,
    bold: [textBaseStyle, FONT_WEIGHTS.bold] as StyleProp<TextStyle>,
    heading: [textBaseStyle, typography.xxl, FONT_WEIGHTS.bold] as StyleProp<TextStyle>,
    subheading: [textBaseStyle, typography.lg, FONT_WEIGHTS.medium] as StyleProp<TextStyle>,
    formLabel: [textBaseStyle, FONT_WEIGHTS.medium] as StyleProp<TextStyle>,
    formHelper: [textBaseStyle, typography.sm, FONT_WEIGHTS.regular] as StyleProp<TextStyle>,
    button: [textBaseStyle, typography.sm, FONT_WEIGHTS.bold] as StyleProp<TextStyle>,
  };
};

const SPACING = {
  xxxs: 2,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const DEFAULT_FONT_SIZE = 16;

// https://bareynol.github.io/mui-theme-creator/
// eslint-disable-next-line max-lines-per-function
export const getTheme = (colorScheme: ColorSchemeName, fontSize = DEFAULT_FONT_SIZE): Theme => {
  const colors = colorScheme === 'dark' ? DARK_COLORS : LIGHT_COLORS;
  const typographySizes = getTypographySizes(fontSize);
  return {
    colors,
    typography: {
      sizes: typographySizes,
      weights: FONT_WEIGHTS,
      presets: getFontPresets(typographySizes),
    },
    spacing: SPACING,
    borderRadius: {
      xs: 4,
      sm: 6,
      md: 8,
      lg: 12,
      xl: 40,
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
    // TODO: naming, S, M, L
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
