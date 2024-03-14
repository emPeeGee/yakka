import { useEffect, useCallback } from 'react';
import { View } from 'react-native';

import { ListeningActivityType } from '@/types';
import { useWizard, EnhancedScrollView, ChoiceGroup, WizardScreenProps } from '@/ui/core';
import { useTheme } from '@/ui/theme';
import { ActivityHeader } from './ActivityHeader';

type ListeningActivityProps = {
  index: number;
  activity: ListeningActivityType;
} & WizardScreenProps;

export function ListeningActivity({ index, activity, answered }: ListeningActivityProps) {
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
          isCorrect: data[activity.sentence] === activity.answer,
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

  const onChangeHandler = useCallback((value: string | null): void => {
    setData(activity.sentence, value);
    setIsContinueEnabled(!!value);
  }, []);

  return (
    <View style={[{ width: '100%', flex: 1, flexDirection: 'column', padding: theme.spacing.md }]}>
      <ActivityHeader activity={activity} noSentence withSlowSpeaker />

      <EnhancedScrollView>
        <ChoiceGroup
          disabled={answered}
          options={activity.options.map(option => ({ label: option, value: option }))}
          value={data[activity.sentence]}
          onChange={onChangeHandler}
        />
      </EnhancedScrollView>
    </View>
  );
}
