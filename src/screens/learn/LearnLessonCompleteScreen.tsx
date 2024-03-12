// pass stats here as well

import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Button, ContainerWithInsets, EnhancedText, HeroWithChat, InfoBox } from '@/ui/core';
import { BallonIcon, CrosshairIcon, HourglassIcon, LightningIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

export const LearnLessonCompleteScreen = () => {
  const { navigate } = useNavigation();
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();

  return (
    <ContainerWithInsets>
      <View style={{ flex: 1, paddingHorizontal: theme.spacing.md }}>
        <View style={[gStyles.fullWidthFromStart, { justifyContent: 'space-evenly' }]}>
          <EnhancedText
            tx="learn.lessonCompleted"
            size="xxxl"
            weight="medium"
            style={{ color: theme.colors.primary700, textAlign: 'center' }}
          />

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '80%', height: 250 }}>
              <HeroWithChat
                chatPosition="no-chat"
                hero="magician"
                withConfetti
                width={161}
                height={183}
              />
            </View>
          </View>

          <View style={[gStyles.centerColumn, { gap: theme.spacing.sm }]}>
            <InfoBox
              Icon={() => <BallonIcon />}
              color={theme.colors.secondary500}
              txTitle="common.balloons"
              value="24"
            />
            <View
              style={[
                gStyles.centerRow,
                {
                  gap: theme.spacing.sm,
                  width: '100%',
                },
              ]}>
              <InfoBox
                Icon={() => <LightningIcon />}
                color={theme.colors.coral}
                txTitle="common.totalXp"
                value="12"
              />
              <InfoBox
                Icon={() => <HourglassIcon />}
                color={theme.colors.mint}
                txTitle="common.time"
                value="01:34"
              />
              <InfoBox
                Icon={() => <CrosshairIcon />}
                color={theme.colors.lilac}
                txTitle="common.accuracy"
                value="88%"
              />
            </View>
          </View>
        </View>

        <View
          style={[
            { width: '100%', gap: theme.spacing.md, paddingVertical: theme.spacing.md },
            gStyles.centerColumn,
          ]}>
          <Button
            tx="common.continue"
            color={theme.colors.base0}
            onPress={() => navigate('LearnTree' as never)}
          />
        </View>
      </View>
    </ContainerWithInsets>
  );
};
