import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, EnhancedText, HeroWithChat } from '@/ui/core';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

export const OnboardGetStartedScreen = () => {
  const { navigate } = useNavigation();
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      <View style={{ flex: 1, paddingHorizontal: theme.spacing.md }}>
        <View style={[gStyles.fullWidthFromStart, { justifyContent: 'space-evenly' }]}>
          <HeroWithChat tx="onboard.greeting1" chatPosition="top" hero="vampire" withConfetti />

          <EnhancedText
            tx="universal.yakka"
            size="xxxl"
            weight="medium"
            style={{ color: theme.colors.primary700, textAlign: 'center' }}
          />
          <View>
            <EnhancedText
              tx="onboard.benefit1"
              size="sm"
              weight="medium"
              style={{ textAlign: 'center' }}
            />
          </View>
        </View>

        <View
          style={[
            { width: '100%', gap: theme.spacing.md, paddingVertical: theme.spacing.md },
            gStyles.centerColumn,
          ]}>
          <Button
            tx="onboard.getStarted"
            color={theme.colors.base0}
            onPress={() => navigate('OnboardQuestions' as never)}
          />
          <Button
            tx="onboard.haveAnAccount"
            backgroundColor={theme.colors.primary100}
            color={theme.colors.primary900}
          />
        </View>
      </View>
    </View>
  );
};
