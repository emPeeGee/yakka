import React from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { translate, TxKeyPath } from '@/core/i18n';
import { WordCategory } from '@/types';
import { HeaderScroll, Choice, ChoiceGroup, Emoji } from '@/ui/core';
import { useTheme } from '@/ui/theme';
import { useVocabularyStore } from './vocabularyState';

export const VocCategoriesScreen = () => {
  const { theme } = useTheme();
  const { setIsLoading, categories, category, typedCategory, setCategory } = useVocabularyStore();
  const { goBack } = useNavigation();

  return (
    <View style={{ padding: theme.spacing.md, flex: 1 }}>
      <HeaderScroll withBackButton title="voc.whichCategory">
        <View style={{ paddingVertical: theme.spacing.md }}>
          <ChoiceGroup
            options={categories
              .map(
                c =>
                  ({
                    value: c,
                    label: translate(c.category_name as TxKeyPath),
                    Right: () => <Emoji emoji={c.emoji} />,
                  }) as Choice<WordCategory>,
              )
              .filter(c => c.label?.includes(typedCategory.toLowerCase()))}
            value={category}
            onChange={category => {
              setIsLoading(true);
              setCategory(category as WordCategory);
              setTimeout(() => {
                goBack();
              });
            }}
          />
        </View>
      </HeaderScroll>
    </View>
  );
};
