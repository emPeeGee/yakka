import { ReactNode, useCallback } from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

import { useHaptics } from '@/core/providers';
import { isThemeDark } from '@/core/utils';
import { VoidCb } from '@/types';
import { useTheme } from '../theme';

type EnhancedPressableProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  withoutBackground?: boolean;
  onPress?: VoidCb;
} & PressableProps;

export function EnhancedPressable({
  children,
  style,
  onPress,
  withoutBackground = false,
  ...props
}: EnhancedPressableProps) {
  const { theme, appColorScheme } = useTheme();
  const isDark = isThemeDark(appColorScheme);
  const { lightHaptics } = useHaptics();

  const getBackgroundColor = useCallback(
    (pressed: boolean) =>
      withoutBackground
        ? undefined
        : pressed
          ? isDark
            ? theme.colors.base100
            : theme.colors.base20
          : undefined,
    [theme],
  );

  const onPressHandle = () => {
    lightHaptics();
    onPress?.();
  };

  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? (isDark ? 0.4 : 0.2) : 1,
          backgroundColor: getBackgroundColor(pressed),
        },
        style,
      ]}
      onPress={onPressHandle}
      {...props}>
      {children}
    </Pressable>
  );
}
