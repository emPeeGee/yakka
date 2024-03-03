import { useEffect, useCallback } from 'react';
import { View } from 'react-native';

import * as Speech from 'expo-speech';

import { PickAnswerActivityType } from '@/types';
import {
  useWizard,
  EnhancedText,
  EnhancedPressable,
  Separator,
  EnhancedScrollView,
  ChoiceGroup,
} from '@/ui/core';
import { SpeakerIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

type PickAnswerActivityProps = {
  index: number;
  activity: PickAnswerActivityType;
};

export function PickAnswerActivity({ index, activity }: PickAnswerActivityProps) {
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();
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
          isCorrect: data[activity.sentence] === activity.answer,
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

  useEffect(() => {
    return () => {
      console.log('bye bye ');
    };
  }, []);

  const onChangeHandler = useCallback((value: string | null): void => {
    setData(activity.sentence, value);
    setIsContinueEnabled(!!value);
  }, []);

  return (
    <View style={[{ width: '100%', flex: 1, flexDirection: 'column', padding: theme.spacing.md }]}>
      <View
        style={{
          width: '100%',
          paddingHorizontal: theme.spacing.md,
          marginBottom: theme.spacing.md,
          gap: theme.spacing.lg,
        }}>
        <View style={{ alignItems: 'center' }}>
          <EnhancedText tx="learn.whatDoesSentence" size="xl" />
        </View>

        <View style={gStyles.centerRow}>
          <EnhancedPressable
            onPress={() => {
              Speech.speak(activity.sentence, { language: 'en' });
            }}
            style={{
              backgroundColor: theme.colors.secondary500,
              padding: theme.spacing.sm,
              borderRadius: theme.borderRadius.lg,
              marginRight: theme.spacing.sm,
            }}>
            <SpeakerIcon color={theme.colors.base0} />
          </EnhancedPressable>
          <EnhancedText text={activity.sentence} size="lg" />
        </View>
      </View>

      <Separator height={theme.borders.medium} />

      <EnhancedScrollView>
        <ChoiceGroup
          options={activity.options}
          value={data[activity.sentence]}
          onChange={onChangeHandler}
        />
      </EnhancedScrollView>
    </View>
  );
}
