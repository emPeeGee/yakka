import { useRef } from 'react';
import { View, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import { HeaderPlaceholder, EnhancedText, Tile, ContainerWithInsets, Button } from '@/ui/core';
import { useTheme } from '@/ui/theme';

export const LearnTreeScreen = () => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  const animation = useRef(null);

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
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <LottieView
          // autoPlay
          ref={animation}
          resizeMode="contain"
          style={{
            width: 100,
            height: 100,
            backgroundColor: '#eee',
            // transform: [{ scale: 2 }],
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require('./spinner.json')}
        />
      </View>
      <View style={{ paddingTop: 30 }}>
        <Button
          text="Restart Animation"
          onPress={() => {
            animation.current?.reset();
            animation.current?.play();
          }}
        />
      </View>
    </ContainerWithInsets>
  );
};
