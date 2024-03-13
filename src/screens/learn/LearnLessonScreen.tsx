/* eslint-disable react-hooks/rules-of-hooks */
import React, { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import { StackActions, useNavigation } from '@react-navigation/native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue, runOnUI, runOnJS } from 'react-native-reanimated';

import { LESSON_DONE_DATA_KEY } from '@/core/constants';
import { rootLog } from '@/core/logger';
import { setItem } from '@/core/storage';
import { LessonActivity, PickAnswerActivityType, TypeAnswerActivityType } from '@/types';
import {
  EnhancedText,
  ContainerWithInsets,
  Wizard,
  Button,
  HeroLoading,
  WizardScreenProps,
} from '@/ui/core';
import { useTheme } from '@/ui/theme';
import { MARGIN_LEFT } from './Layout';
import { Lines } from './Lines';
import { PickAnswerActivity } from './PickAnswer';
import { SortableWord } from './SortableWord';
import { TypeAnswerActivity } from './TypeAnswer';
import { parseRawWizardDataQuestion } from './utils/parseRawWizardDataQuestions';
// import { Word } from './Word';

// const words = [
//   { id: 1, word: 'Er' },
//   { id: 8, word: 'hungrig' },
//   { id: 2, word: 'isst' },
//   { id: 7, word: 'er' },
//   { id: 6, word: 'weil' },
//   { id: 9, word: 'ist' },
//   { id: 5, word: ',' },
//   { id: 3, word: 'einen' },
//   { id: 4, word: 'Apfel' },
// ];

const containerWidth = Dimensions.get('window').width - MARGIN_LEFT * 2;
const wordListStyles = StyleSheet.create({
  container: {
    flex: 1,
    margin: MARGIN_LEFT,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    opacity: 0,
  },
});

interface WordListProps {
  children: ReactElement<{ id: number }>[];
}

export const WordList = ({ children }: WordListProps) => {
  const [ready, setReady] = useState(false);
  const offsets = children.map(() => ({
    order: useSharedValue(0),
    width: useSharedValue(0),
    height: useSharedValue(0),
    x: useSharedValue(0),
    y: useSharedValue(0),
    originalX: useSharedValue(0),
    originalY: useSharedValue(0),
  }));
  if (!ready) {
    return (
      <View style={wordListStyles.row}>
        {children.map((child, index) => {
          return (
            <View
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              onLayout={({
                nativeEvent: {
                  layout: { x, y, width, height },
                },
              }) => {
                const offset = offsets[index]!;
                offset.order.value = -1;
                offset.width.value = width;
                offset.height.value = height;
                offset.originalX.value = x;
                offset.originalY.value = y;
                runOnUI(() => {
                  'worklet';
                  if (offsets.filter(o => o.order.value !== -1).length === 0) {
                    runOnJS(setReady)(true);
                  }
                })();
              }}>
              {child}
            </View>
          );
        })}
      </View>
    );
  }
  return (
    <View style={wordListStyles.container}>
      <Lines />
      {children.map((child, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <SortableWord key={index} offsets={offsets} index={index} containerWidth={containerWidth}>
          {child}
        </SortableWord>
      ))}
    </View>
  );
};

const lessonActivities: LessonActivity[] = [
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
