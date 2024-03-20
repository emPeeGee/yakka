import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Button, ContainerWithInsets, EnhancedText, HeroWithChat } from '@/ui/core';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

export const SignUpDoneScreen = () => {
  const { navigate } = useNavigation();
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();

  return (
    <ContainerWithInsets>
      <View style={{ flex: 1, paddingHorizontal: theme.spacing.md }}>
        <View style={[gStyles.fullWidthFromStart, { justifyContent: 'space-evenly' }]}>
          <View style={{ gap: theme.spacing.xxxl }}>
            <HeroWithChat
              tx="common.hurray"
              chatPosition="top"
              hero="watering"
              width={197}
              height={194}
            />

            <View style={{ gap: theme.spacing.xl }}>
              <EnhancedText
                tx="common.welcome"
                size="xxxl"
                weight="medium"
                style={{ color: theme.colors.primary700, textAlign: 'center' }}
              />
              <View>
                <EnhancedText
                  tx="auth.profileCreated"
                  size="sm"
                  weight="medium"
                  style={{ textAlign: 'center' }}
                />
              </View>
            </View>
          </View>
        </View>

        <View
          style={[
            { width: '100%', gap: theme.spacing.md, paddingVertical: theme.spacing.md },
            gStyles.centerColumn,
          ]}>
          <Button
            tx="common.start"
            color={theme.colors.base0}
            onPress={() => navigate('App' as never, { screen: 'LearnTree' })}
          />
        </View>
      </View>
    </ContainerWithInsets>
  );
};
