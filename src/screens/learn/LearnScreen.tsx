import { View, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { HeaderPlaceholder, EnhancedText, Tile, ContainerWithInsets } from '@/ui/core';
import { useTheme } from '@/ui/theme';

export const LearnScreen = () => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();

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
          <Tile type="globe" current onPress={() => navigate('LearnLesson' as never)} />
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
