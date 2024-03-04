import { View } from 'react-native';

import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { HeroWithChat } from './HeroWithChat';
import { EnhancedText } from '../EnhancedText';
import { Loader } from '../Loader';

export const HeroLoading = () => {
  const gStyles = useGlobalThemedStyles();
  const { theme } = useTheme();

  return (
    <View style={[gStyles.centerColumn, { gap: theme.spacing.xl, flex: 1 }]}>
      <HeroWithChat
        hero="clock"
        chatPosition="top"
        text="Counting Sheep..."
        width={100}
        height={180}
      />
      <EnhancedText
        weight="bold"
        preset="heading"
        text="Loading"
        style={[{ color: theme.colors.secondary700 }, theme.typography.sizes.xl]}
      />
      <Loader />
      <EnhancedText
        weight="bold"
        preset="subheading"
        text="Complete the course faster to get more XP and Balloons"
        style={[
          { width: '75%', textAlign: 'center', color: theme.colors.textSec },
          theme.typography.sizes.lg,
        ]}
      />
    </View>
  );
};
