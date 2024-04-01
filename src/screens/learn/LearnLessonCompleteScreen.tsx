// pass stats here as well

import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useShallow } from 'zustand/react/shallow';

import { LESSON_DONE_DATA_KEY } from '@/core/constants';
import { useSound } from '@/core/providers';
import { getItem } from '@/core/storage';
import { formatSecondsToMinutesSeconds, percentage } from '@/core/utils';
import { ParsedLessonAnswers, LearningLessonStats, Lesson } from '@/types';
import { Button, ContainerWithInsets, EnhancedText, HeroWithChat, InfoBox } from '@/ui/core';
import { BalloonIcon, CrosshairIcon, HeartIcon, HourglassIcon, LightningIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { useLearnStore } from './learnState';

export const LearnLessonCompleteScreen = ({ route }: any) => {
  const { navigate } = useNavigation();
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();
  const [lessonStats, setLessonStats] = useState<LearningLessonStats | undefined>();
  const { completeLesson } = useLearnStore();
  const lesson = useLearnStore(
    useShallow(state => state.lessons.find(l => l.lesson_id === route?.params?.lessonId)),
  ) as Lesson;
  const { playSound } = useSound();

  useEffect(() => {
    getItem<ParsedLessonAnswers>(LESSON_DONE_DATA_KEY).then(data => {
      const rightAnswers = Object.values(data.answers).filter(Boolean).length;
      const totalAnswers = Object.values(data.answers).length;

      const statsAfterTheLesson: LearningLessonStats = {
        time: formatSecondsToMinutesSeconds(data.elapsedSeconds),
        balloons: rightAnswers,
        experience: rightAnswers * 2,
        accuracy: percentage(rightAnswers, totalAnswers, true),
        livesUsed: totalAnswers - rightAnswers,
      };

      console.log('stats after lesson', statsAfterTheLesson);

      completeLesson(lesson.lesson_id, statsAfterTheLesson);
      setLessonStats(statsAfterTheLesson);
      playSound('lessonSuccess');
    });
  }, []);

  if (!lessonStats) {
    return null;
  }

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
            <View
              style={[
                gStyles.centerRow,
                {
                  gap: theme.spacing.sm,
                  width: '100%',
                },
              ]}>
              <InfoBox
                Icon={() => <BalloonIcon />}
                color={theme.colors.secondary500}
                txTitle="common.balloons"
                value={lessonStats?.balloons}
              />
              <InfoBox
                Icon={() => <HeartIcon fill={theme.colors.chilly} />}
                color={theme.colors.chilly}
                txTitle="common.livesUsed"
                txInfo="info.lives"
                value={lessonStats?.livesUsed}
              />
            </View>
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
                value={lessonStats?.experience}
              />
              <InfoBox
                Icon={() => <HourglassIcon />}
                color={theme.colors.mint}
                txTitle="common.time"
                value={lessonStats?.time}
              />
              <InfoBox
                Icon={() => <CrosshairIcon />}
                color={theme.colors.lilac}
                txTitle="common.accuracy"
                value={lessonStats.accuracy}
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
