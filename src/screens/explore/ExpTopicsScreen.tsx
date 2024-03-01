import React, { useRef } from 'react';
import { Animated, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Choice, ChoiceGroup, ContainerWithInsets, Emoji } from '@/ui/core';
import { useTheme } from '@/ui/theme';

// TODO: not the best location
export enum ExploreTopics {
  BasicTenses = 'BasicTenses',
  Verbs = 'Verbs',
  Grammar = 'Grammar',
}

export const TOPICS: Choice<ExploreTopics>[] = [
  { value: ExploreTopics.BasicTenses, tx: 'exp.12basicTenses', Left: () => <Emoji emoji="📜" /> },
  { value: ExploreTopics.Grammar, tx: 'exp.grammar', Left: () => <Emoji emoji="📚" /> },
  { value: ExploreTopics.Verbs, tx: 'exp.verbs', Left: () => <Emoji emoji="🤸" /> },
];

export const ExpTopicsScreen = () => {
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
          options={TOPICS}
          onChange={topic => {
            setTimeout(() => {
              navigate('ExpSubtopics' as never, { topic } as never);
            });
          }}
        />
      </ScrollView>
    </ContainerWithInsets>
  );
};
