import { ColorSchemeName } from 'react-native';

import { Theme, Colors } from '@/types';

export const darkColors: Colors = {
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#2c3e50',
  surface: '#34495e',
  error: '#e74c3c',
  success: '#2ecc71',
  warning: '#f39c12',
  info: '#3498db',
  text: '#ecf0f1',
  textSecondary: '#bdc3c7',
  disabled: '#7f8c8d',
  accent: '#f39c12',
  link: '#3498db',
  selection: '#3498db',
  backgroundSecondary: '#2c3e50',
  border: '#bdc3c7',
  placeholder: '#bdc3c7',
  focus: '#3498db',
};

export const lightColors: Colors = {
  primary: '#f44336',
  secondary: '#e91e63',
  background: '#ffffff',
  surface: '#f5f5f5',
  error: '#ff5722',
  success: '#c0ca33',
  warning: '#ffce56',
  info: '#673ab7',
  text: '#212121',
  textSecondary: '#757575',
  disabled: '#cccccc',
  accent: '#ffce56',
  link: '#673ab7',
  selection: '#673ab7',
  backgroundSecondary: '#ffffff',
  border: '#cccccc',
  placeholder: '#999999',
  focus: '#673ab7',
};

// eslint-disable-next-line max-lines-per-function
export const getTheme = (colorScheme: ColorSchemeName): Theme => {
  const colors = colorScheme === 'dark' ? darkColors : lightColors;
  return {
    colors,
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
    spacing: {
      tiny: 4,
      small: 8,
      medium: 16,
      large: 24,
      extraLarge: 32,
    },
    borderRadius: {
      small: 4,
      medium: 8,
      large: 12,
    },
    elevation: {
      tiny: 1,
      small: 2,
      medium: 4,
      large: 8,
      extraLarge: 16,
    },
    shadows: {
      small: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      medium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      large: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
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
