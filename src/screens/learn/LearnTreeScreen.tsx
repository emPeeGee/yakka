import { useEffect } from 'react';
import { View, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { SheetManager } from 'react-native-actions-sheet';
import { useShallow } from 'zustand/react/shallow';

import { useAuth } from '@/core/providers';
import { Lesson } from '@/types';
import { Tile, ContainerWithInsets, FullAccessPrompt, HeroLoading } from '@/ui/core';
import { useTheme } from '@/ui/theme';
import { LearnHeader } from './LearnHeader';
import { useLearnStore } from './learnState';

export const LearnTreeScreen = () => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  const { init, isLoading, lessons, completed, current } = useLearnStore();

  const stats = useLearnStore(useShallow(state => state.stats));
  const { user } = useAuth();

  useEffect(() => {
    init();
  }, []);

  const lessonPressHandler = async (lesson: Lesson) => {
    const canOpen = await SheetManager.show('start-lesson-sheet', {
      payload: {
        title: lesson.title,
        description: lesson.description,
        isCompleted: completed.includes(lesson.lesson_number),
        lives: stats.lives,
      },
    });

    if (canOpen) {
      navigate('LearnLesson' as never, { lessonId: lesson.lesson_id });
    }
  };

  if (isLoading) {
    <HeroLoading />;
  }

  const shouldPromptLoginForFullAccess = !user && completed.length >= 5;

  return (
    <ContainerWithInsets withoutBottom>
      {shouldPromptLoginForFullAccess && <FullAccessPrompt />}

      <LearnHeader stats={stats}>
        <ScrollView style={{ height: '100%' }} contentContainerStyle={{ height: '100%' }}>
          <View
            style={{
              gap: theme.spacing.md,
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              flexDirection: 'column',
              paddingVertical: theme.spacing.md,
            }}>
            {lessons.map((lesson, index) => {
              return (
                <Tile
                  key={`${lesson.title}-${index}`}
                  type="globe"
                  current={lesson.lesson_number === current}
                  onPress={() => lessonPressHandler(lesson)}
                  completed={completed.includes(lesson.lesson_number)}
                  withHero={index % 3 === 0}
                  heroPos={index % 6 === 0 ? 'left' : 'right'}
                />
              );
            })}
          </View>
        </ScrollView>
      </LearnHeader>
    </ContainerWithInsets>
  );
};
