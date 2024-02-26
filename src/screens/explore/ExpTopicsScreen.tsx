import React, { useRef } from 'react';
import { Animated, ScrollView } from 'react-native';

import { Choice, ChoiceGroup, ContainerWithInsets, Emoji } from '@/ui/core';
import { useTheme } from '@/ui/theme';

type ExploreTopics = '12basicTenses' | 'verbs' | 'grammar';

export const CATEGORIES: Choice<ExploreTopics>[] = [
  {
    value: '12basicTenses',
    tx: 'exp.12basicTenses',
    Left: () => <Emoji emoji="📜" />,
  },
  {
    value: 'verbs',
    tx: 'exp.verbs',
    Left: () => <Emoji emoji="🤸" />,
  },
  {
    value: 'grammar',
    tx: 'exp.grammar',
    Left: () => <Emoji emoji="📚" />,
  },
];

export const ExpTopicsScreen = () => {
  const { theme } = useTheme();
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  // const { goBack } = useNavigation();

  return (
    <ContainerWithInsets withoutBottom>
      <ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={{ padding: theme.spacing.md }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }], {
          useNativeDriver: false,
        })}>
        <ChoiceGroup
          options={CATEGORIES}
          // value={category}
          onChange={() => {
            // setCategory(category);
            // setTimeout(() => {
            //   goBack();
            // });
          }}
        />
      </ScrollView>
    </ContainerWithInsets>
  );
};
