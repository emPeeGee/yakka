import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { supabase } from '@/api';
import { TxKeyPath, translate } from '@/core/i18n';
import { Choice, ChoiceGroup, ContainerWithInsets, Emoji, Loader } from '@/ui/core';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { Explore, useExploreStore } from './exploreState';
import { HeaderScrollView } from './Header';

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
        .eq('topic_id', route.params.topic.topic_id);

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
      <HeaderScrollView title={translate('exp.12basicTenses')} withBackButton>
        {isLoading ? (
          <View style={[gStyles.centerColumn, { height: '100%' }]}>
            <Loader />
          </View>
        ) : (
          <View style={{ padding: theme.spacing.md }}>
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
      </HeaderScrollView>
    </ContainerWithInsets>
  );
};
