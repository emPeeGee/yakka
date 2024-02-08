import { View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../theme';

type ContainerWithInsetsProps = {
  children?: React.ReactNode;
  direction?: 'column' | 'row';
  backgroundColor?: string;
};

export function ContainerWithInsets({
  children,
  backgroundColor,
  direction = 'column',
}: ContainerWithInsetsProps) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: direction,
          backgroundColor: backgroundColor || theme.colors.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      {children}
    </View>
  );
}
