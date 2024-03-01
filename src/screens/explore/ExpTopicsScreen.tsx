import React, { useRef, useState } from 'react';
import { Animated, ScrollView, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Choice, ChoiceGroup, ContainerWithInsets, Emoji, TextField } from '@/ui/core';
import { useTheme } from '@/ui/theme';
import { MagnifyingGlassIcon } from '@/ui/icons';
import { HeaderScrollView } from './Header';

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
  const [typedTopic, setTypedTopic] = useState('');

  return (
    <ContainerWithInsets withoutBottom>
      <HeaderScrollView title="aaa">
        {/* <ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={{ padding: theme.spacing.md }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }], {
          useNativeDriver: false,
        })}> */}
        <View
          style={{
            paddingVertical: theme.spacing.xs,
          }}>
          <TextField
            value={typedTopic}
            onChangeText={setTypedTopic}
            placeholderTx="voc.searchCategory"
            style={{ paddingVertical: theme.spacing.md }}
            RightAccessory={props => (
              <View style={[props.style]}>
                <MagnifyingGlassIcon />
              </View>
            )}
          />
        </View>
        <ChoiceGroup
          options={TOPICS}
          onChange={topic => {
            setTimeout(() => {
              navigate('ExpSubtopics' as never, { topic } as never);
            });
          }}
        />
        {/* </ScrollView> */}
      </HeaderScrollView>
    </ContainerWithInsets>
  );
};
