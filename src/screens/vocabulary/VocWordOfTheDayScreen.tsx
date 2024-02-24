import { View } from 'react-native';

import { Word } from '@/types';
import { ContainerWithInsets } from '@/ui/core';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { WordCard } from './WordCard';
import vocabulary from '../../mocks/vocabulary.json';

// TODO: word of the day will be provided via network
export const VocWordOfTheDayScreen = () => {
  const { theme, appColorScheme } = useTheme();
  const gStyles = useGlobalThemedStyles();

  return (
    <ContainerWithInsets
      backgroundColor={
        appColorScheme === 'light' ? theme.colors.primary100 : theme.colors.background
      }>
      <View style={[gStyles.centerColumn]}>
        <View style={{ minWidth: 320, minHeight: 560 }}>
          <WordCard word={vocabulary.mighty as Word} />
        </View>
      </View>
    </ContainerWithInsets>
  );
};
