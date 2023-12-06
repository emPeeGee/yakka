import { Text, TextProps } from 'react-native';

import { useGlobalThemedStyles } from '../theme';

export const EnhancedText = ({ children, style, ...rest }: React.PropsWithChildren<TextProps>) => {
  const globalThemes = useGlobalThemedStyles();

  return (
    <Text style={[globalThemes.text, style, { fontFamily: 'monospace' }]} {...rest}>
      {children}
    </Text>
  );
};
