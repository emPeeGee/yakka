import React, { useState } from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Choice, ChoiceGroup, ContainerWithInsets, Emoji, TextField } from '@/ui/core';
import { MagnifyingGlassIcon } from '@/ui/icons';
import { useTheme } from '@/ui/theme';
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
  const { navigate } = useNavigation();
  const [typedTopic, setTypedTopic] = useState('');

  return (
    <ContainerWithInsets>
      <HeaderScrollView title="exp.learnToday">
        <View
          style={{
            paddingVertical: theme.spacing.xs,
            paddingHorizontal: theme.spacing.md,
          }}>
          <View
            style={{
              paddingVertical: theme.spacing.md,
            }}>
            <TextField
              value={typedTopic}
              onChangeText={setTypedTopic}
              placeholderTx="exp.searchTopic"
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
        </View>
      </HeaderScrollView>
    </ContainerWithInsets>
  );
};
