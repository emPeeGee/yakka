import { View, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { SheetManager } from 'react-native-actions-sheet';

import { HeaderPlaceholder, EnhancedText, Tile, ContainerWithInsets } from '@/ui/core';
import { useTheme } from '@/ui/theme';

export const LearnTreeScreen = () => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();

  const lessonPressHandler = async () => {
    const canOpen = await SheetManager.show('start-lesson-sheet', {
      payload: {
        title: `Form basic sentences`,
        description: 'Lesson 1',
      },
    });

    if (canOpen) {
      navigate('LearnLesson' as never);
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
            gap: 16,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            flexDirection: 'column',
          }}>
          <Tile type="globe" />
          <Tile type="countdown" withHero heroPos="left" />
          <Tile type="globe" current onPress={() => lessonPressHandler()} />
          <Tile completed type="globe" />
          <Tile completed type="countdown" withHero heroPos="right" />
          <Tile completed type="globe" />
          <Tile completed type="globe" withHero heroPos="left" />
          <Tile completed type="start" />
        </View>
      </ScrollView>
    </ContainerWithInsets>
  );
};
