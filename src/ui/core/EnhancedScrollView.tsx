import { ScrollViewProps, ScrollView } from 'react-native';

import { useTheme } from '../theme';

type EnhancedScrollViewProps = {
  children?: React.ReactNode;
} & ScrollViewProps;

export const EnhancedScrollView = ({ children, ...props }: EnhancedScrollViewProps) => {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={{ height: '100%' }}
      contentContainerStyle={{ paddingVertical: theme.spacing.sm }}
      {...props}>
      {children}
    </ScrollView>
  );
};
