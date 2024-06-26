import { ReactNode, useCallback } from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

import { useHaptics } from '@/core/providers';
import { VoidCb } from '@/types';
import { useTheme } from '../theme';

type EnhancedPressableProps = {
  children: ((props: { pressed: boolean }) => ReactNode) | ReactNode;
  style?: StyleProp<ViewStyle>;
  withoutBackground?: boolean;
  onPress?: VoidCb;
} & PressableProps;

export function EnhancedPressable({
  children,
  style,
  onPress,
  withoutBackground = false,
  disabled,
  ...props
}: EnhancedPressableProps) {
  const { theme, isDark } = useTheme();
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

  // NOTE: Function as Child Component
  const isFacc = typeof children === 'function';

  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        isFacc
          ? {}
          : {
              opacity: pressed ? (isDark ? 0.4 : 0.2) : disabled ? 0.5 : 1,
              backgroundColor: getBackgroundColor(pressed),
            },
        style,
      ]}
      onPress={onPressHandle}
      {...props}>
      {({ pressed }) => {
        return isFacc ? children({ pressed }) : children;
      }}
    </Pressable>
  );
}
