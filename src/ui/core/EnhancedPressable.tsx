import { ReactNode } from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

import * as Haptics from 'expo-haptics';

import { isThemeDark } from '@/core/utils';
import { useTheme } from '../theme';

type EnhancedPressableProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  noHaptic?: boolean;
} & PressableProps;

export function EnhancedPressable({
  noHaptic = false,
  children,
  style,
  onPress,
  ...props
}: EnhancedPressableProps) {
  const { theme, appColorScheme } = useTheme();
  const isDark = isThemeDark(appColorScheme);

  const onPressHandle = () => {
    if (!noHaptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
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
