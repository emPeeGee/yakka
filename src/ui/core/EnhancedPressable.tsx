import { ReactNode } from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

import { isThemeDark } from '@/core/utils';
import { useTheme } from '../theme';

type EnhancedPressableProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
} & PressableProps;

export function EnhancedPressable({ children, style, ...props }: EnhancedPressableProps) {
  const { theme, appColorScheme } = useTheme();
  const isDark = isThemeDark(appColorScheme);

  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? (isDark ? 0.4 : 0.2) : 1,
          backgroundColor: pressed
            ? isDark
              ? theme.colors.base100
              : theme.colors.base20
            : undefined,
        },
        style,
      ]}
      {...props}>
      {children}
    </Pressable>
  );
}
