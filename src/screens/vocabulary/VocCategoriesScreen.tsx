import React, { useRef } from 'react';
import { Animated, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { translate, TxKeyPath } from '@/core/i18n';
import { WordCategory } from '@/types';
import { HeaderScroll, Choice, ChoiceGroup, ContainerWithInsets, Emoji } from '@/ui/core';
import { useTheme } from '@/ui/theme';
import { useVocabularyStore } from './vocabularyState';

export const VocCategoriesScreen = () => {
  const { theme } = useTheme();
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const { setIsLoading, categories, category, typedCategory, setCategory } = useVocabularyStore();
  const { goBack } = useNavigation();

  return (
    <ContainerWithInsets withoutBottom>
      <HeaderScroll withBackButton title="voc.whichCategory">
        <ScrollView
          scrollEventThrottle={16}
          contentContainerStyle={{ padding: theme.spacing.md }}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }], {
            useNativeDriver: false, // NOTE: native driver doesn't work on ios (not sure on Android) https://stackoverflow.com/questions/55055873/react-native-animated-with-usenativedriver-reactnative-animated-event-is
          })}>
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
        </ScrollView>
      </HeaderScroll>
    </ContainerWithInsets>
  );
};
