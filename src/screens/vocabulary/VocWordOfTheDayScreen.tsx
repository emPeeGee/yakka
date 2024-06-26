import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { supabase } from '@/api';
import { Word } from '@/types';
import { Loader } from '@/ui/core';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { WordCard } from './WordCard';

export const VocWordOfTheDayScreen = () => {
  const { theme, appColorScheme } = useTheme();
  const gStyles = useGlobalThemedStyles();
  const [wordOfTheDay, setWordOfTheDay] = useState<Word | null>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getWordOfTheDay = async () => {
      const { data, error } = await supabase.rpc('get_daily_word');

      if (error) {
        return;
      }

      setWordOfTheDay(data[0]);
      setIsLoading(false);
    };

    getWordOfTheDay();
  }, []);

  return (
    <View
      style={[
        {
          paddingVertical: theme.spacing.md,
          flex: 1,
          backgroundColor:
            appColorScheme === 'light' ? theme.colors.primary100 : theme.colors.background,
        },
        gStyles.centerColumn,
      ]}>
      {isLoading ? <Loader /> : <WordCard word={wordOfTheDay} />}
    </View>
  );
};
