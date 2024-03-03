/* eslint-disable react-hooks/rules-of-hooks */
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue, runOnUI, runOnJS } from 'react-native-reanimated';

import { ONBOARD_DATA_KEY } from '@/core/constants';
import { rootLog } from '@/core/logger';
import { setItem } from '@/core/storage';
import {
  EnhancedText,
  ContainerWithInsets,
  Wizard,
  ChoiceGroup,
  Separator,
  useWizard,
  EnhancedScrollView,
  EnhancedPressable,
} from '@/ui/core';
import { SpeakerIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { MARGIN_LEFT } from './Layout';
import { Lines } from './Lines';
import { SortableWord } from './SortableWord';
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
const styles = StyleSheet.create({
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
      <View style={styles.row}>
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
    <View style={styles.container}>
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

type ActivityType = 'pickAnswer';
type PickAnswerActivityType = {
  type: ActivityType;
  sentence: string;
  answer: string;
  options: { label: string; value: string; isCorrect: boolean }[];
};

const lessonActivities: PickAnswerActivityType[] = [
  {
    type: 'pickAnswer',
    sentence: 'The boy is reading',
    answer: 'Baiatul citeste acum',
    options: [
      { label: 'Baiatul mananca acum', value: 'Baiatul mananca acum', isCorrect: false },
      { label: 'Baiatul scrie acum', value: 'Baiatul scrie acum', isCorrect: false },
      { label: 'Baiatul citeste acum', value: 'Baiatul citeste acum', isCorrect: true },
    ],
  },
  {
    type: 'pickAnswer',
    sentence: 'An apple',
    answer: 'Un măr',
    options: [
      { label: 'Un măr', value: 'Un măr', isCorrect: true },
      { label: 'Un băiat', value: 'Un băiat', isCorrect: false },
      { label: 'O coacăză', value: 'O coacăză', isCorrect: false },
    ],
  },
];

type PickAnswerActivityProps = {
  index: number;
  activity: PickAnswerActivityType;
};

function PickAnswerActivity({ index, activity }: PickAnswerActivityProps) {
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();
  const { data, setData, setIsContinueEnabled, setOnNextScreen, setNextButtonProps } = useWizard();

  useEffect(() => {
    setOnNextScreen(index, () => {
      console.log(index, 'hello');
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

      {/* <BottomSheet ref={bottomSheetRef} onChange={handleSheetChanges} index={-1} snapPoints={[300]}>
        <BottomSheetView style={{ flex: 1 }}>
          <EnhancedText>Awesome 🎉</EnhancedText>
          {test && (
            <View style={{}}>
              <SuccessEffect isSuccess={false} />
            </View>
          )}
        </BottomSheetView>
      </BottomSheet> */}
    </View>
  );
}

export const LessonScreen = () => {
  // const { theme } = useTheme();
  const { navigate } = useNavigation();

  return (
    <ContainerWithInsets>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Wizard
            txButtonLabel="learn.checkAnswer"
            txLastScreenButtonLabel="common.finish"
            fallbackRoute="LearnTree"
            screensContainerStyle={{ paddingHorizontal: 0 }}
            screens={
              lessonActivities.map(
                (activity, index) => () => PickAnswerActivity({ activity, index }),
              )
              //   [
              //   () => PickAnswerActivity({ index: 0 }),
              //   () => (
              //     <View>
              //       <EnhancedText>Hello</EnhancedText>
              //     </View>
              //   ),
              // ]}
            }
            onFinish={wizardData => {
              navigate('LearnTree' as never);
              rootLog.info(`OnboardingQuestions onFinish ${JSON.stringify(wizardData)}`);
              setItem(ONBOARD_DATA_KEY, wizardData);
            }}
          />
          {/* <WordList>
              {words.map(word => (
                <Word key={word.id} {...word} />
              ))}
            </WordList> */}
        </View>
      </GestureHandlerRootView>
    </ContainerWithInsets>
  );
};
