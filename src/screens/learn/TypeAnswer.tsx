import { useEffect, useCallback } from 'react';
import { View } from 'react-native';

import { TypeAnswerActivityType } from '@/types';
import { useWizard, EnhancedScrollView, WizardScreenProps, TextField } from '@/ui/core';
import { useTheme } from '@/ui/theme';
import { ActivityHeader } from './ActivityHeader';
import { compareAnswers } from './utils/compareAnswers';

type TypeAnswerActivityProps = {
  index: number;
  activity: TypeAnswerActivityType;
} & WizardScreenProps;

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
      txButtonLabel: 'learn.checkAnswer',
      callback: () => {
        setNextButtonProps({
          callback: null,
          answer: activity.answer,
          isCorrect: compareAnswers(data[activity.sentence], activity.answer),
          txButtonLabel: 'common.continue',
        });
      },
    });

    return () => {
      setNextButtonProps({
        answer: null,
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
              : theme.colors.secondary500,
          }}
        />
      </EnhancedScrollView>
    </View>
  );
}
