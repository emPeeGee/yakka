import { areArraysEqual } from '@/core/utils';
import { LessonActivity, MatchingPairsActivityType, ParsedLessonAnswers } from '@/types';
import { WizardData } from '@/ui/core';
import { compareAnswers } from './compareAnswers';

/**
 * Parse answers and elapsed seconds
 * @param wizardData
 * @param lessonActivities
 * @returns Returns question in the sentence: true format, meaning if the answer was right or not
 */
export const parseRawWizardDataQuestion = (
  wizardData: WizardData,
  lessonActivities: LessonActivity[],
): ParsedLessonAnswers => {
  const finishDate = new Date();
  const answers = Object.entries(wizardData).reduce<ParsedLessonAnswers>(
    (acc, [sentence, answer]) => {
      if (sentence === 'time') {
        const startDate = answer as unknown as Date;
        const timeDiff = (finishDate.valueOf() - startDate.valueOf()) / 1000; //in ms

        // get seconds
        const elapsedSeconds = Math.round(timeDiff);
        acc.elapsedSeconds = elapsedSeconds;
        return acc;
      }

      const originalLesson = lessonActivities.find(
        l => l.activity.sentence === sentence,
      ) as LessonActivity;
      // as MatchingPairsActivityType
      if (originalLesson.type === 'matchingPairs') {
        const isMatchingPairsActivityCorrect = (
          originalLesson.activity as MatchingPairsActivityType
        ).answers.every(correctPair =>
          Object.values(answer).some(pair => areArraysEqual(pair as string[], correctPair)),
        );
        // todo: extract function and duplication

        acc.answers[sentence] = isMatchingPairsActivityCorrect;
      } else {
        acc.answers[sentence] = compareAnswers(originalLesson.activity.answer, answer);
      }

      return acc;
    },
    { answers: {}, elapsedSeconds: -1 },
  );

  return answers;
};
