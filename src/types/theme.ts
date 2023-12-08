export type ColorSchemeType = 'light' | 'dark' | 'system';

export type Shadow = {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
};

export type Colors = {
  primary: string; // Color for primary elements
  secondary: string; // Color for secondary elements
  accent: string; // Accent color for highlighting certain elements
  background: string; // Background color for the entire app
  backgroundSecondary: string; // Secondary background color for specific sections
  surface: string; // Surface color for cards and containers
  error: string; // Color for error messages or indicators
  success: string; // Color for success messages or indicators
  warning: string; // Color for warning messages or indicators
  info: string; // Color for informational messages or indicators
  text: string; // Text color for standard content
  textSecondary: string; // Text color for secondary or muted content
  disabled: string; // Color for disabled or inactive elements

  link: string; // Color for hyperlinks
  selection: string; // Color for selected text or elements
  border: string; // Border color for elements with borders
  placeholder: string; // Color for placeholder text in input fields
  focus: string; // Color for focused elements or input fields
};

export type Theme = {
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
    small: number;
    medium: number;
    large: number;
    extraLarge: number;
  };
  borderRadius: {
    small: number;
    medium: number;
    large: number;
  };
  elevation: {
    tiny: number;
    small: number;
    medium: number;
    large: number;
    extraLarge: number;
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
