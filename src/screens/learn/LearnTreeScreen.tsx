import { View, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { SheetManager } from 'react-native-actions-sheet';
import { useShallow } from 'zustand/react/shallow';

import { useAuth } from '@/core/providers';
import { Lesson } from '@/types';
import { HeaderPlaceholder, Tile, ContainerWithInsets, FullAccessPrompt } from '@/ui/core';
import { useTheme } from '@/ui/theme';
import { LearnHeader } from './LearnHeader';
import { useLearnStore } from './learnState';

export const LearnTreeScreen = () => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  const { lessons, completed, current } = useLearnStore();

  const stats = useLearnStore(useShallow(state => state.stats));
  const { user } = useAuth();
  console.log(stats);

  const lessonPressHandler = async (lesson: Lesson) => {
    const canOpen = await SheetManager.show('start-lesson-sheet', {
      payload: {
        title: lesson.title,
        description: lesson.description,
        isCompleted: completed.includes(lesson.id),
        lives: stats.lives,
        // title: `Form basic sentences`,
        // description: 'Lesson 1',
      },
    });

    if (canOpen) {
      navigate('LearnLesson' as never, { lessonId: lesson.id });
    }
  };

  const shouldPromptLoginForFullAccess = !user && completed.length >= 5;

  return (
    <ContainerWithInsets>
      <HeaderPlaceholder />

      {shouldPromptLoginForFullAccess && <FullAccessPrompt />}

      <LearnHeader stats={stats}>
        <ScrollView style={{ flex: 1 }}>
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
                  current={lesson.id === current}
                  onPress={() => lessonPressHandler(lesson)}
                  completed={completed.includes(lesson.id)}
                  withHero={index % 3 === 0}
                  heroPos={index % 6 === 0 ? 'left' : 'right'}
                />
              );
            })}

            {/* <Tile type="globe" />
          <Tile type="countdown" withHero heroPos="left" />
          <Tile type="globe" current onPress={() => lessonPressHandler()} />
          <Tile completed type="globe" />
          <Tile completed type="countdown" withHero heroPos="right" />
          <Tile completed type="globe" />
          <Tile completed type="globe" />
          <Tile completed type="globe" />
          <Tile completed type="globe" />
          <Tile completed type="globe" />
          <Tile completed type="globe" withHero heroPos="left" />
          <Tile completed type="start" /> */}
          </View>
        </ScrollView>
      </LearnHeader>
    </ContainerWithInsets>
  );
};
