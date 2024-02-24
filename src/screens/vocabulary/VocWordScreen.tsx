import React from 'react';
import { View } from 'react-native';

import { useShallow } from 'zustand/react/shallow';

import { EnhancedText } from '@/ui/core';
import { useTheme } from '@/ui/theme';
import { useVocabularyStore } from './vocabularyState';
import { FlipCardWrapper } from './WordCard';

export const VocWordScreen = ({ route }: any) => {
  const { theme } = useTheme();

  const word = useVocabularyStore(
    useShallow(state => state.words.find(w => w.word === route?.params?.word)),
  );

  if (!word) {
    // TODO: wrong screen
    return <EnhancedText>Something went wrong</EnhancedText>;
  }

  return (
    <View style={{ padding: theme.spacing.md }}>
      <FlipCardWrapper side="back" item={word} />
    </View>
  );
};
