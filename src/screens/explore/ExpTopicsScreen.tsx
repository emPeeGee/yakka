import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useAuth } from '@/core/providers';
import { ExploreTopic } from '@/types';
import {
  HeaderScroll,
  Choice,
  ChoiceGroup,
  ContainerWithInsets,
  Emoji,
  Loader,
  TextField,
} from '@/ui/core';
import { MagnifyingGlassIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { useExploreStore } from './exploreState';

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
  const gStyles = useGlobalThemedStyles();
  const { navigate } = useNavigation();
  const [typedTopic, setTypedTopic] = useState('');
  const { withAccessControl, user } = useAuth();
  const { init, isLoading, topics } = useExploreStore();

  useEffect(() => {
    init(user);
  }, []);

  return (
    <ContainerWithInsets>
      {isLoading ? (
        <View style={[gStyles.centerColumn, { height: '100%' }]}>
          <Loader />
        </View>
      ) : (
        // <HeaderScrollView title="exp.learnToday">
        <HeaderScroll title="exp.learnToday">
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
              options={topics.map(
                t =>
                  ({
                    value: t,
                    tx: t.topic_name,
                    Left: () => <Emoji emoji={t.emoji} />,
                  }) as Choice<ExploreTopic>,
              )}
              onChange={topic => {
                setTimeout(() => {
                  withAccessControl(
                    () => navigate('ExpSubtopics' as never, { topic } as never),
                    () => navigate('Auth', { screen: 'AuthSignUp' }),
                  )();
                });
              }}
            />
          </View>
        </HeaderScroll>
      )}
    </ContainerWithInsets>
  );
};
