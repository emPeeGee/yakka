import React, { useRef, useState } from 'react';
import { Animated, ScrollView } from 'react-native';

import { Choice, ChoiceGroup, ContainerWithInsets } from '@/ui/core';
import { useTheme } from '@/ui/theme';
import { DynamicHeader } from './DynamicHeader';
import { EmojiComponent } from './Emoji';

export const CATEGORIES: Choice<number>[] = [
  {
    value: 1,
    tx: 'voc.allWords',
    Left: () => <EmojiComponent emoji="🍓" />,
  },
  {
    value: 2,
    tx: 'voc.animals',
    Left: () => <EmojiComponent emoji="🦔" />,
  },
  {
    value: 3,
    tx: 'voc.colors',
    Left: () => <EmojiComponent emoji="🌈" />,
  },
  {
    value: 4,
    tx: 'voc.shapes',
    Left: () => <EmojiComponent emoji="🟦" />,
  },
  {
    value: 5,
    tx: 'voc.actions1',
    Left: () => <EmojiComponent emoji="🏃" />,
  },
  {
    value: 6,
    tx: 'voc.actions2',
    Left: () => <EmojiComponent emoji="🙋🏻‍♂️" />,
  },
  {
    value: 7,
    tx: 'voc.vegetables',
    Left: () => <EmojiComponent emoji="🥕" />,
  },
  {
    value: 8,
    tx: 'voc.transport',
    Left: () => <EmojiComponent emoji="🚜" />,
  },
  {
    value: 9,
    tx: 'voc.pets',
    Left: () => <EmojiComponent emoji="🐾" />,
  },
  {
    value: 10,
    tx: 'voc.weather',
    Left: () => <EmojiComponent emoji="☀️" />,
  },
];

// TODO: word of the day will be provided via network
export const VocCategoriesScreen = () => {
  const { theme } = useTheme();
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const [category, setCategory] = useState<number>(CATEGORIES[0].value);

  return (
    <ContainerWithInsets withoutBottom>
      <DynamicHeader animHeaderValue={scrollOffsetY} />
      <ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={{ padding: theme.spacing.md }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }], {
          useNativeDriver: false, // NOTE: native driver doesn't work on ios (not sure on Android) https://stackoverflow.com/questions/55055873/react-native-animated-with-usenativedriver-reactnative-animated-event-is
        })}>
        <ChoiceGroup options={CATEGORIES} value={category} onChange={setCategory} />
      </ScrollView>
    </ContainerWithInsets>
  );
};
