import React, { useRef } from 'react';
import { Animated, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { WordCategory } from '@/types';
import { Choice, ChoiceGroup, ContainerWithInsets, Emoji } from '@/ui/core';
import { useTheme } from '@/ui/theme';
import { DynamicHeader } from './DynamicHeader';
import { useVocabularyStore } from './vocabularyState';

export const CATEGORIES: Choice<WordCategory>[] = [
  {
    value: 'all',
    tx: 'voc.allWords',
    Left: () => <Emoji emoji="🍓" />,
  },
  {
    value: 'animals1',
    tx: 'voc.animals',
    Left: () => <Emoji emoji="🦔" />,
  },
  {
    value: 'colors1',
    tx: 'voc.colors1',
    Left: () => <Emoji emoji="🌈" />,
  },
  {
    value: 'colors2',
    tx: 'voc.colors2',
    Left: () => <Emoji emoji="🌈" />,
  },
  {
    value: 'shapes1',
    tx: 'voc.shapes',
    Left: () => <Emoji emoji="🟦" />,
  },
  {
    value: 'actions1',
    tx: 'voc.actions1',
    Left: () => <Emoji emoji="🏃" />,
  },
  {
    value: 'actions2',
    tx: 'voc.actions2',
    Left: () => <Emoji emoji="🙋🏻‍♂️" />,
  },
  {
    value: 'vegetables1',
    tx: 'voc.vegetables',
    Left: () => <Emoji emoji="🥕" />,
  },
  {
    value: 'transport1',
    tx: 'voc.transport',
    Left: () => <Emoji emoji="🚜" />,
  },
  {
    value: 'pets1',
    tx: 'voc.pets',
    Left: () => <Emoji emoji="🐾" />,
  },
  {
    value: 'weather1',
    tx: 'voc.weather',
    Left: () => <Emoji emoji="☀️" />,
  },
];

// TODO: word of the day will be provided via network
export const VocCategoriesScreen = () => {
  const { theme } = useTheme();
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const { category, typedCategory, setCategory } = useVocabularyStore();
  const { goBack } = useNavigation();

  return (
    <ContainerWithInsets withoutBottom>
      <DynamicHeader animHeaderValue={scrollOffsetY} />
      <ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={{ padding: theme.spacing.md }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }], {
          useNativeDriver: false, // NOTE: native driver doesn't work on ios (not sure on Android) https://stackoverflow.com/questions/55055873/react-native-animated-with-usenativedriver-reactnative-animated-event-is
        })}>
        <ChoiceGroup
          options={CATEGORIES.filter(c => c.value.includes(typedCategory.toLowerCase()))}
          value={category}
          onChange={category => {
            setCategory(category);
            setTimeout(() => {
              goBack();
            });
          }}
        />
      </ScrollView>
    </ContainerWithInsets>
  );
};
