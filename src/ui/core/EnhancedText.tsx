import { ForwardedRef, forwardRef } from 'react';
import { Text, TextProps } from 'react-native';

import { useGlobalThemedStyles } from '../theme';

const CustomText = (
  { children, style, ...rest }: React.PropsWithChildren<TextProps>,
  ref: ForwardedRef<Text>,
) => {
  const globalThemes = useGlobalThemedStyles();

  return (
    <Text ref={ref} style={[globalThemes.text, style, { fontFamily: 'monospace' }]} {...rest}>
      {children}
    </Text>
  );
};

export const EnhancedText = forwardRef(CustomText);
