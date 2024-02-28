import React, { useRef } from 'react';
import { Animated, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { TxKeyPath } from '@/core/i18n';
import { Choice, ChoiceGroup, ContainerWithInsets, Emoji } from '@/ui/core';
import { useTheme } from '@/ui/theme';

export const TENSES: Choice<{ content: string; title: TxKeyPath }>[] = [
  {
    value: { content: 'test.md', title: 'exp.presentSimple' },
    tx: 'exp.presentSimple',
    Left: () => <Emoji emoji="🙂" />,
  },
  {
    value: { content: './presentSimple.md', title: 'exp.presentContinuous' },
    tx: 'exp.presentContinuous',
    Left: () => <Emoji emoji="🏃‍♂️" />,
  },
  {
    value: { content: './presentSimple.md', title: 'exp.presentPerfect' },
    tx: 'exp.presentPerfect',
    Left: () => <Emoji emoji="🎁" />,
  },
  {
    value: { content: './presentSimple.md', title: 'exp.presentPerfectContinuous' },
    tx: 'exp.presentPerfectContinuous',
    Left: () => <Emoji emoji="🌱" />,
  },

  {
    value: { content: './presentSimple.md', title: 'exp.pastSimple' },
    tx: 'exp.pastSimple',
    Left: () => <Emoji emoji="🕰️" />,
  },
  {
    value: { content: './presentSimple.md', title: 'exp.pastContinuous' },
    tx: 'exp.pastContinuous',
    Left: () => <Emoji emoji="🚶‍♀️" />,
  },
  {
    value: { content: './presentSimple.md', title: 'exp.pastPerfect' },
    tx: 'exp.pastPerfect',
    Left: () => <Emoji emoji="🚪" />,
  },
  {
    value: { content: './presentSimple.md', title: 'exp.pastPerfectContinuous' },
    tx: 'exp.pastPerfectContinuous',
    Left: () => <Emoji emoji="🛣️" />,
  },

  {
    value: { content: './presentSimple.md', title: 'exp.futureSimple' },
    tx: 'exp.futureSimple',
    Left: () => <Emoji emoji="🎯" />,
  },
  {
    value: { content: './presentSimple.md', title: 'exp.futureContinuous' },
    tx: 'exp.futureContinuous',
    Left: () => <Emoji emoji="🌧️" />,
  },
  {
    value: { content: './presentSimple.md', title: 'exp.futurePerfect' },
    tx: 'exp.futurePerfect',
    Left: () => <Emoji emoji="🌅" />,
  },
  {
    value: { content: './presentSimple.md', title: 'exp.futurePerfectContinuous' },
    tx: 'exp.futurePerfectContinuous',
    Left: () => <Emoji emoji="🏖️" />,
  },
];

export const ExpBasicTensesScreen = () => {
  const { theme } = useTheme();
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const { navigate } = useNavigation();

  return (
    <ContainerWithInsets withoutBottom>
      <ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={{ padding: theme.spacing.md }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }], {
          useNativeDriver: false,
        })}>
        <ChoiceGroup
          options={TENSES}
          onChange={({ content, title }) => {
            setTimeout(() => {
              navigate('ExpContent' as never, { content, title } as never);
            });
          }}
        />
      </ScrollView>
    </ContainerWithInsets>
  );
};
