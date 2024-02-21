import { View } from 'react-native';

import { Word } from '@/types';
import { ContainerWithInsets } from '@/ui/core';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { WordCard } from './WordCard';
import vocabulary from '../../mocks/vocabulary.json';

// TODO: word of the day will be provided via network
export const VocWordOfTheDayScreen = () => {
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();

  return (
    <ContainerWithInsets>
      <View
        style={[
          {
            flex: 1,
            width: '100%',
            gap: theme.spacing.md,
            paddingVertical: theme.spacing.md,
            backgroundColor: theme.colors.primary100,
          },
          gStyles.centerColumn,
        ]}>
        <View style={{ minWidth: 320, minHeight: 560 }}>
          <WordCard word={vocabulary.mighty as Word} />
        </View>
      </View>
    </ContainerWithInsets>
  );
};
