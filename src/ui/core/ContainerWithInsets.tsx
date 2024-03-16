import { View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FocusAwareStatusBar } from './FocusAwareStatusBar';
import { useTheme } from '../theme';

type ContainerWithInsetsProps = {
  children?: React.ReactNode;
  direction?: 'column' | 'row';
  backgroundColor?: string;
  withoutBottom?: boolean;
};

export function ContainerWithInsets({
  children,
  backgroundColor,
  direction = 'column',
  withoutBottom = false,
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
          paddingBottom: withoutBottom ? 0 : insets.bottom, // TODO: Check bottom everythere.  it is not alright
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      <FocusAwareStatusBar />
      {children}
    </View>
  );
}
