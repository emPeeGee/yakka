import { ReactNode } from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

import { useHaptics } from '@/core/providers';
import { isThemeDark } from '@/core/utils';
import { useTheme } from '../theme';

type EnhancedPressableProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
} & PressableProps;

export function EnhancedPressable({ children, style, onPress, ...props }: EnhancedPressableProps) {
  const { theme, appColorScheme } = useTheme();
  const isDark = isThemeDark(appColorScheme);
  const { lightHaptics } = useHaptics();

  const onPressHandle = () => {
    lightHaptics();
    onPress?.();
  };

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
      onPress={onPressHandle}
      {...props}>
      {children}
    </Pressable>
  );
}
