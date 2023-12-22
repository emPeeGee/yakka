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
  primary100: string;
  primary80: string;
  primary60: string;
  primary40: string;
  primary20: string;

  secondary100: string;
  secondary80: string;
  secondary60: string;
  secondary40: string;
  secondary20: string;

  base100: string;
  base80: string;
  base60: string;
  base40: string;
  base20: string;
  base0: string;

  background: string;
  textPri: string;
  textSec: string;
  border: string;
  link: string;

  tabColor: string;

  // Accent Colors
  success: string;
  warning: string;
  error: string;
  info: string;
  surface: string;

  disabled: string;
  selection: string;
  placeholder: string;
  focus: string; // Do I need this?
};

export type Theme = {
  colors: Colors;
  typography: {
    fontFamily: string;
    fontSize: {
      small: number;
      medium: number;
      large: number;
      extraLarge: number;
    };
    fontWeight: {
      regular: string;
      bold: string;
    };
    lineHeight: {
      small: number;
      medium: number;
      large: number;
      extraLarge: number;
    };
  };
  spacing: {
    tiny: number;
    extraSmall: number;
    small: number;
    medium: number;
    large: number;
    extraLarge: number;
  };
  borderRadius: {
    extraSmall: number;
    small: number;
    medium: number;
    large: number;
  };
  shadows: {
    small: Shadow;
    medium: Shadow;
    large: Shadow;
  };
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
