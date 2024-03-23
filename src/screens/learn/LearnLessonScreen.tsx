/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

import { StackActions, useNavigation } from '@react-navigation/native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useShallow } from 'zustand/react/shallow';

import { LESSON_DONE_DATA_KEY } from '@/core/constants';
import { rootLog } from '@/core/logger';
import { setItem } from '@/core/storage';
import {
  DragWordsActivityType,
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
import { useLearnStore } from './learnState';
import { ListeningActivity } from './ListeningActivity';
import { MatchingPairsActivity } from './MatchingPairsActivity';
import { MissingWordActivity } from './MissingWordActivity';
import { PickAnswerActivity } from './PickAnswerActivity';
import { TypeAnswerActivity } from './TypeAnswerActivity';
import { parseRawWizardDataQuestion } from './utils/parseRawWizardDataQuestions';

export const LearnLessonScreen = ({ route }: any) => {
  const { isDark, theme } = useTheme();
  const { navigate, dispatch } = useNavigation();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [isLessonReady, setIsLessonReady] = useState(false);

  // TODO: this selector is repeated in LearnLessonComplete
  const lesson = useLearnStore(
    useShallow(state => state.lessons.find(l => l.id === route?.params?.lessonId)),
  );

  // TODO: not really needed
  useEffect(() => {
    setTimeout(() => {
      setIsLessonReady(true);
    }, 500);
  }, []);

  const onExitHandler = () => {
    actionSheetRef.current?.show();
  };

  if (!lesson) {
    return <EnhancedText>ERRRROOORR</EnhancedText>;
  }

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
              screens={lesson.activities.map(
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
                const answers = parseRawWizardDataQuestion(wizardData, lesson.activities);
                setItem(LESSON_DONE_DATA_KEY, answers);
                rootLog.info(`OnboardingQuestions onFinish ${JSON.stringify(answers)}`);

                setTimeout(() => {
                  navigate('LearnLessonComplete' as never, { lessonId: lesson.id });
                }, 0);
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
          </View>
        </GestureHandlerRootView>
      ) : (
        <HeroLoading suggestion="learn.benefit" />
      )}
    </ContainerWithInsets>
  );
};
