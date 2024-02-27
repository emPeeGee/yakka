import React, { useRef } from 'react';
import { Animated, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Choice, ChoiceGroup, ContainerWithInsets, Emoji } from '@/ui/core';
import { useTheme } from '@/ui/theme';

export const TENSES: Choice<{ value: string; title: string }>[] = [
  {
    value: { value: './presentSimple.md', title: 'exp.presentSimple' },
    tx: 'exp.presentSimple',
    Left: () => <Emoji emoji="📜" />,
  },
  {
    value: { value: './presentSimple.md', title: 'exp.presentContinuous' },
    tx: 'exp.presentContinuous',
    Left: () => <Emoji emoji="📚" />,
  },
  {
    value: { value: './presentSimple.md', title: 'exp.presentPerfect' },
    tx: 'exp.presentPerfect',
    Left: () => <Emoji emoji="🤸" />,
  },
  // {
  //   value: './presentSimple.md',
  //   tx: 'exp.presentPerfectContinuous',
  //   Left: () => <Emoji emoji="🤸" />,
  // },

  // { value: './presentSimple.md', tx: 'exp.pastSimple', Left: () => <Emoji emoji="📜" /> },
  // { value: './presentSimple.md', tx: 'exp.pastContinuous', Left: () => <Emoji emoji="📚" /> },
  // { value: './presentSimple.md', tx: 'exp.pastPerfect', Left: () => <Emoji emoji="🤸" /> },
  // {
  //   value: './presentSimple.md',
  //   tx: 'exp.pastPerfectContinuous',
  //   Left: () => <Emoji emoji="🤸" />,
  // },

  // { value: './presentSimple.md', tx: 'exp.futureSimple', Left: () => <Emoji emoji="📜" /> },
  // { value: './presentSimple.md', tx: 'exp.futureContinuous', Left: () => <Emoji emoji="📚" /> },
  // { value: './presentSimple.md', tx: 'exp.futurePerfect', Left: () => <Emoji emoji="🤸" /> },
  // {
  //   value: './presentSimple.md',
  //   tx: 'exp.futurePerfectContinuous',
  //   Left: () => <Emoji emoji="🤸" />,
  // },
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
          onChange={({ value, title }) => {
            setTimeout(() => {
              navigate('ExpContent' as never, { content: value, title } as never);
            });
          }}
        />
      </ScrollView>
    </ContainerWithInsets>
  );
};
