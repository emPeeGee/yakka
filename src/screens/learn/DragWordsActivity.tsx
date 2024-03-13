import { useEffect, useCallback, useRef } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';

import { DragWordsActivityType } from '@/types';
import { useWizard, WizardScreenProps } from '@/ui/core';
import { useTheme } from '@/ui/theme';
import { ActivityHeader } from './ActivityHeader';
import { DragDropWords, DragDropWordsRef } from './drag';
import { compareAnswers } from './utils/compareAnswers';

type DragWordsActivityProps = {
  index: number;
  activity: DragWordsActivityType;
} & WizardScreenProps;

export function DragWordsActivity({ index, activity, answered }: DragWordsActivityProps) {
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

  const onChangeWordsHandler = useCallback((): void => {
    const answer = dragDropWordsRef.current?.getAnsweredWords().join(' ');
    setData(activity.sentence, answer);
    setIsContinueEnabled(!!answer);
  }, []);

  const dragDropWordsRef = useRef<DragDropWordsRef>(null);

  return (
    <View style={[{ width: '100%', flex: 1, flexDirection: 'column', padding: theme.spacing.md }]}>
      <ActivityHeader activity={activity} noSeparator />

      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.dragDropContainer}>
            <DragDropWords
              ref={dragDropWordsRef}
              words={activity.options}
              wordHeight={40}
              lineHeight={49}
              wordGap={4}
              wordBankOffsetY={10}
              wordBankAlignment="center"
              gesturesDisabled={answered}
              onDrop={ev => {
                const { destination, index, position } = ev;
                onChangeWordsHandler();
                console.log(
                  `[onDrop] Dropped word '${activity.options[index]}' on '${destination}'
                   at position ${position}.\n
                   The picked words: ${dragDropWordsRef.current?.getAnsweredWords().join(' ')}`,
                );
              }}
              // renderWord={(_word, index) => (
              //   <Word
              //     containerStyle={
              //       typeof gradeWords?.[index] === 'boolean' && {
              //         backgroundColor: gradeWords?.[index] ? 'green' : 'red',
              //         borderColor: gradeWords?.[index] ? 'green' : 'red',
              //       }
              //     }
              //     textStyle={{
              //       color: typeof gradeWords?.[index] === 'boolean' ? 'white' : 'black',
              //     }}
              //   />
              // )}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dragDropContainer: {
    margin: 20,
    flex: 1,
  },
  debugLogText: {
    fontWeight: '500',
  },
});
