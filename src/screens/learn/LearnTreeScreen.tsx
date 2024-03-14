import { View, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { SheetManager } from 'react-native-actions-sheet';

import { Lesson } from '@/types';
import { HeaderPlaceholder, EnhancedText, Tile, ContainerWithInsets } from '@/ui/core';
import { useTheme } from '@/ui/theme';
import { useLearnStore } from './learnState';

export const LearnTreeScreen = () => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  const { lessons, completed, current } = useLearnStore();
  console.log('tree', lessons, completed, current);

  // TODO:
  // const completed = ['1', '2'];
  // const current = '3';

  const lessonPressHandler = async (lesson: Lesson) => {
    const canOpen = await SheetManager.show('start-lesson-sheet', {
      payload: {
        title: lesson.title,
        description: lesson.description,
        isCompleted: completed.includes(lesson.id),
        // title: `Form basic sentences`,
        // description: 'Lesson 1',
      },
    });

    if (canOpen) {
      navigate('LearnLesson' as never, { lessonId: lesson.id });
    }
  };

  return (
    <ContainerWithInsets>
      <HeaderPlaceholder />
      <View>
        <EnhancedText size="xxl">Hello, Mate</EnhancedText>
        <EnhancedText
          size="xl"
          style={{
            color: theme.colors.textSec,
          }}>
          What would you like to learn today?
        </EnhancedText>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            gap: theme.spacing.xl,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            flexDirection: 'column',
          }}>
          {lessons.map((lesson, index) => (
            <Tile
              key={`${lesson.title}-${index}`}
              type="globe"
              current={lesson.id === current}
              onPress={() => lessonPressHandler(lesson)}
              completed={completed.includes(lesson.id)}
              withHero={index % 3 === 0}
              heroPos={index % 6 === 0 ? 'left' : 'right'}
            />
          ))}

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
    </ContainerWithInsets>
  );
};
