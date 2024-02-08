import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Button, ContainerWithInsets, EnhancedText, HeroWithChat } from '@/ui/core';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

// IDEA: when there is time, animation

export const OnboardQuestionsDoneScreen = () => {
  const { navigate } = useNavigation();
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();

  return (
    <ContainerWithInsets>
      <View style={{ flex: 1, paddingHorizontal: theme.spacing.md }}>
        <View style={[gStyles.fullWidthFromStart, { justifyContent: 'space-evenly' }]}>
          <HeroWithChat tx="common.awesome" chatPosition="top" hero="flowers" withConfetti />

          <EnhancedText
            tx="universal.yakka"
            size="xxxl"
            weight="medium"
            style={{ color: theme.colors.primary700, textAlign: 'center' }}
          />
          <View>
            <EnhancedText
              tx="onboard.createProfileDesc"
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
            tx="onboard.createProfile"
            color={theme.colors.base0}
            // TODO: right screen
            onPress={() => navigate('' as never)}
          />
          <Button
            tx="common.skip"
            backgroundColor={theme.colors.primary100}
            color={theme.colors.primary900}
          />
        </View>
      </View>
    </ContainerWithInsets>
  );
};
