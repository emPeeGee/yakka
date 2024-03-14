/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';

import { StackActions, useNavigation } from '@react-navigation/native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { LESSON_DONE_DATA_KEY } from '@/core/constants';
import { rootLog } from '@/core/logger';
import { setItem } from '@/core/storage';
import {
  DragWordsActivityType,
  LessonActivity,
  ListeningActivityType,
  MatchingPairsActivityType,
  MissingWordActivityType,
  PickAnswerActivityType,
  TypeAnswerActivityType,
} from '@/types';
import {
  EnhancedText,
  ContainerWithInsets,
  Wizard,
  Button,
  HeroLoading,
  WizardScreenProps,
} from '@/ui/core';
import { useTheme } from '@/ui/theme';
import { DragWordsActivity } from './DragWordsActivity';
import { ListeningActivity } from './ListeningActivity';
import { MatchingPairsActivity } from './MatchingPairsActivity';
import { MissingWordActivity } from './MissingWordActivity';
import { PickAnswerActivity } from './PickAnswer';
import { TypeAnswerActivity } from './TypeAnswer';
import { parseRawWizardDataQuestion } from './utils/parseRawWizardDataQuestions';

const lessonActivities: LessonActivity[] = [
  {
    type: 'listening',
    activity: {
      sentence: 'His name is Andrew',
      answer: 'Numele lui este Andrew',
      options: ['Numele lui este Andrew', 'Numele meu este Andrew', 'Numele tau este Andre'],
    } as ListeningActivityType,
  },
  {
    type: 'matchingPairs',
    activity: {
      sentence: 'People',
      answers: [
        ['Barbat', 'Man'],
        // ['Barbati', 'Men'],
        // ['Baiat', 'Boy'],
        // ['Fata', 'Girl'],
        ['Femeie', 'Woman'],
      ],
    } as MatchingPairsActivityType,
  },
  {
    type: 'missingWord',
    activity: {
      sentence: 'My name @@@ Ken',
      answer: 'is',
      options: [
        { label: 'are', value: 'are' },
        { label: 'as', value: 'as' },
        { label: 'is', value: 'is' },
      ],
    } as MissingWordActivityType,
  },
  {
    type: 'dragWords',
    activity: {
      sentence: 'Ma numesc Ken',
      answer: 'My name is Ken',
      options: ['Ken', 'my', 'hello', 'is', 'hello', 'name', 'an', 'a'],
    } as DragWordsActivityType,
  },
  {
    type: 'pickAnswer',
    activity: {
      sentence: 'The boy is reading',
      answer: 'Baiatul citeste acum',
      options: [
        { label: 'Baiatul mananca acum', value: 'Baiatul mananca acum', isCorrect: false },
        { label: 'Baiatul scrie acum', value: 'Baiatul scrie acum', isCorrect: false },
        { label: 'Baiatul citeste acum', value: 'Baiatul citeste acum', isCorrect: true },
      ],
    } as PickAnswerActivityType,
  },
  {
    type: 'typeAnswer',
    activity: {
      sentence: 'My name is Ken',
      answer: 'Numele meu este Ken',
    } as TypeAnswerActivityType,
  },
  {
    type: 'pickAnswer',
    activity: {
      sentence: 'An apple',
      answer: 'Un măr',
      options: [
        { label: 'Un măr', value: 'Un măr', isCorrect: true },
        { label: 'Un băiat', value: 'Un băiat', isCorrect: false },
        { label: 'O coacăză', value: 'O coacăză', isCorrect: false },
      ],
    } as PickAnswerActivityType,
  },
];

export const LearnLessonScreen = () => {
  const { appColorScheme, theme } = useTheme();
  const { navigate, dispatch } = useNavigation();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [isLessonReady, setIsLessonReady] = useState(false);
  const isDark = useMemo(() => appColorScheme === 'dark', [appColorScheme]);

  useEffect(() => {
    setTimeout(() => {
      setIsLessonReady(true);
    }, 2000);
  }, []);

  const onExitHandler = () => {
    actionSheetRef.current?.show();
  };

  return (
    <ContainerWithInsets>
      {isLessonReady ? (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Wizard
              txButtonLabel="learn.checkAnswer"
              txLastScreenButtonLabel="common.finish"
              fallbackRoute="LearnTree"
              screensContainerStyle={{ paddingHorizontal: 0 }}
              screens={lessonActivities.map(
                (activity, index) => (wizardProps: WizardScreenProps) => {
                  switch (activity.type) {
                    case 'dragWords':
                      return DragWordsActivity({
                        activity: activity.activity as DragWordsActivityType,
                        index,
                        ...wizardProps,
                      });
                    case 'pickAnswer':
                      return PickAnswerActivity({
                        activity: activity.activity as PickAnswerActivityType,
                        index,
                        ...wizardProps,
                      });
                    case 'typeAnswer':
                      return TypeAnswerActivity({
                        activity: activity.activity as TypeAnswerActivityType,
                        index,
                        ...wizardProps,
                      });
                    case 'missingWord':
                      return MissingWordActivity({
                        activity: activity.activity as MissingWordActivityType,
                        index,
                        ...wizardProps,
                      });
                    case 'matchingPairs':
                      return MatchingPairsActivity({
                        activity: activity.activity as MatchingPairsActivityType,
                        index,
                        ...wizardProps,
                      });
                    case 'listening':
                      return ListeningActivity({
                        activity: activity.activity as ListeningActivityType,
                        index,
                        ...wizardProps,
                      });
                  }
                },
              )}
              onFinish={wizardData => {
                const answers = parseRawWizardDataQuestion(wizardData, lessonActivities);
                setItem(LESSON_DONE_DATA_KEY, answers);
                rootLog.info(`OnboardingQuestions onFinish ${JSON.stringify(answers)}`);
                navigate('LearnLessonComplete' as never);
              }}
              withExit
              onExit={onExitHandler}
            />

            <ActionSheet ref={actionSheetRef} snapPoints={[100]}>
              <View
                style={{
                  padding: theme.spacing.md,
                  gap: theme.spacing.md,
                  backgroundColor: theme.colors.background,
                }}>
                <EnhancedText preset="subheading" tx="common.leaveSure" />
                <Button
                  tx="common.leave"
                  backgroundColor={isDark ? theme.colors.errorBackground : theme.colors.error}
                  color={theme.colors.base0}
                  onPress={() => {
                    const popAction = StackActions.pop(1);
                    dispatch(popAction);
                  }}
                />
                <Button
                  tx="common.stay"
                  backgroundColor={isDark ? theme.colors.primary800 : theme.colors.primary100}
                  onPress={() => {
                    actionSheetRef.current?.hide();
                  }}
                />
              </View>
            </ActionSheet>

            {/* <WordList>
              {words.map(word => (
                <Word key={word.id} {...word} />
              ))}
            </WordList> */}
          </View>
        </GestureHandlerRootView>
      ) : (
        <HeroLoading suggestion="learn.benefit" />
      )}
    </ContainerWithInsets>
  );
};
