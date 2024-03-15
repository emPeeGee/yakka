import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { rootLog } from '@/core/logger';
import { Button, ContainerWithInsets, EnhancedText, HeroWithChat } from '@/ui/core';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

export const OnboardGetStartedScreen = () => {
  const { navigate } = useNavigation();
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();

  return (
    <ContainerWithInsets>
      <View style={{ flex: 1, paddingHorizontal: theme.spacing.md }}>
        <View style={[gStyles.fullWidthFromStart, { justifyContent: 'space-evenly' }]}>
          <HeroWithChat
            tx="onboard.greeting1"
            chatPosition="top"
            hero="vampire"
            withConfetti
            width={100}
            height={145}
          />

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
            onPress={() => {
              navigate('OnboardQuestions' as never);
              rootLog.warn('Here is a delay on button press');
            }}
            // TODO: I noticed a delay when pressing this button
          />
          <Button
            tx="onboard.haveAnAccount"
            backgroundColor={theme.colors.primary100}
            color={theme.colors.primary900}
            onPress={() => {
              navigate('Auth' as never, { screen: 'AuthLogin' });
              rootLog.warn('Here is a delay on button press');
            }}
          />
        </View>
      </View>
    </ContainerWithInsets>
  );
};
