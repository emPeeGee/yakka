import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { supabase } from '@/api';
import { TxKeyPath } from '@/core/i18n';
import { Explore } from '@/types';
import { Choice, ChoiceGroup, ContainerWithInsets, Emoji, Loader, HeaderScroll } from '@/ui/core';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { useExploreStore } from './exploreState';

export const VERBS: Choice<{ content: string; title: TxKeyPath }>[] = [
  {
    value: { content: 'test.md', title: 'exp.irregularVerbs' },
    tx: 'exp.regularVerbs',
    Left: () => <Emoji emoji="🔄" />,
  },
  {
    value: { content: './test.md', title: 'exp.regularVerbs' },
    tx: 'exp.regularVerbs',
    Left: () => <Emoji emoji="📐‍️" />,
  },
];

export const ExpBasicTensesScreen = ({ route }) => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  const gStyles = useGlobalThemedStyles();
  const [subtopics, setSubtopics] = useState<Explore[]>([]);

  const { setIsLoading, isLoading } = useExploreStore();

  useEffect(() => {
    setIsLoading(true);

    const fetchSubtopics = async () => {
      const { data: subTopics, error: subTopicsError } = await supabase
        .from('explore')
        .select('*')
        .eq('topic_id', route.params.topic.topic_id)
        .order('explore_id', { ascending: true });

      if (subTopicsError) {
        return;
      }

      setSubtopics(subTopics);
      setIsLoading(false);
    };

    fetchSubtopics();
  }, []);

  return (
    <ContainerWithInsets withoutBottom>
      <View style={{ padding: theme.spacing.md, height: '100%' }}>
        <HeaderScroll
          title={route.params.topic.topic_name}
          withBackButton
          scrollContainerStyle={{ flexGrow: 1 }}>
          {isLoading ? (
            <View style={[gStyles.centerColumn, { height: '100%' }]}>
              <Loader />
            </View>
          ) : (
            <View style={{ paddingVertical: theme.spacing.md }}>
              <ChoiceGroup
                options={subtopics.map(
                  s =>
                    ({
                      value: s,
                      tx: s.lesson_name,
                      Left: () => <Emoji emoji={s.emoji} />,
                    }) as Choice<Explore>,
                )}
                onChange={({ lesson_content, lesson_name }) => {
                  setTimeout(() => {
                    navigate('ExpContent' as never, { lesson_content, lesson_name } as never);
                  });
                }}
              />
            </View>
          )}
        </HeaderScroll>
      </View>
    </ContainerWithInsets>
  );
};
