import { useEffect, useCallback } from 'react';
import { View } from 'react-native';

import { TypeAnswerActivityType } from '@/types';
import { useWizard, EnhancedScrollView, WizardScreenProps, TextField } from '@/ui/core';
import { useTheme } from '@/ui/theme';
import { ActivityHeader } from './ActivityHeader';

type TypeAnswerActivityProps = {
  index: number;
  activity: TypeAnswerActivityType;
} & WizardScreenProps;

/**
 * Compares two strings after removing punctuation marks, spaces, and converting to lowercase.
 * @param {string} str1 - The first string to compare.
 * @param {string} str2 - The second string to compare.
 * @returns {boolean} True if the strings are equal after processing; otherwise, false.
 */
function compareAnswers(str1: string, str2: string) {
  // Remove punctuation marks and spaces outside the strings, and convert to lowercase
  const processedStr1 = str1
    .replace(/[^\w\s]/g, '')
    .toLowerCase()
    .trim();
  const processedStr2 = str2
    .replace(/[^\w\s]/g, '')
    .toLowerCase()
    .trim();

  // Replace consecutive spaces inside the strings with a single space
  const finalStr1 = processedStr1.replace(/\s+/g, ' ');
  const finalStr2 = processedStr2.replace(/\s+/g, ' ');

  // Compare the processed strings
  return finalStr1 === finalStr2;
}

export function TypeAnswerActivity({
  index,
  activity,
  answered,
  answeredCorrect,
}: TypeAnswerActivityProps) {
  const { theme } = useTheme();
  const { data, setData, setIsContinueEnabled, setOnNextScreen, setNextButtonProps } = useWizard();

  useEffect(() => {
    setOnNextScreen(index, () => {
      setIsContinueEnabled(!!data[activity.sentence]);
    });

    setNextButtonProps({
      answer: null,
      title: null,
      txButtonLabel: 'learn.checkAnswer',
      callback: () => {
        setNextButtonProps({
          callback: null,
          answer: activity.answer,
          isCorrect: compareAnswers(data[activity.sentence], activity.answer),
          txButtonLabel: 'common.continue',
          title: 'Amazing',
        });
      },
    });

    return () => {
      setNextButtonProps({
        answer: null,
        title: null,
        txButtonLabel: 'learn.checkAnswer',
        callback: null,
      });
    };
  }, [data[activity.sentence]]);

  const onChangeTextHandler = useCallback((value: string): void => {
    setData(activity.sentence, value);
    setIsContinueEnabled(!!value);
  }, []);

  return (
    <View style={[{ width: '100%', flex: 1, flexDirection: 'column', padding: theme.spacing.md }]}>
      <ActivityHeader activity={activity} />
      <EnhancedScrollView>
        <TextField
          multiline
          status={answered ? 'disabled' : undefined}
          value={data[activity.sentence]}
          onChangeText={onChangeTextHandler}
          inputWrapperStyle={{
            backgroundColor: theme.colors.surface,
            borderColor: answered
              ? answeredCorrect
                ? theme.colors.successBackground
                : theme.colors.errorBackground
              : undefined,
          }}
        />
      </EnhancedScrollView>
    </View>
  );
}
