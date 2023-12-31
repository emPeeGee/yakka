import { ForwardedRef, forwardRef } from 'react';
import { Text, TextProps } from 'react-native';

import { FontVariant, FontWeight } from '@/types';
import { useGlobalThemedStyles, useTheme } from '../theme';

const CustomText = (
  {
    children,
    style,
    variant = 'default',
    weight,
    ...rest
  }: React.PropsWithChildren<TextProps> & {
    variant?: keyof FontVariant;
    weight?: FontWeight;
  },

  ref: ForwardedRef<Text>,
) => {
  const globalThemes = useGlobalThemedStyles();
  const { theme } = useTheme();

  return (
    <Text
      ref={ref}
      style={[
        globalThemes.text,
        { ...theme.typography.variants[variant] },
        { fontWeight: weight },
        style,
      ]}
      {...rest}>
      {children}
    </Text>
  );
};

export const EnhancedText = forwardRef(CustomText);
