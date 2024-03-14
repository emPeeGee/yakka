import { areArraysEqual } from '@/core/utils';
import { MatchingPairsActivityType } from '@/types';

/**
 * Checks if the user's selected pairs match the correct pairs in the activity.
 * @param {MatchingPairsActivityType} activity - The matching pairs activity containing correct pairs.
 * @param {string[][]} userAnswer - The user's selected pairs.
 * @returns {boolean} True if all user-selected pairs match correct pairs, false otherwise.
 */
export function checkMatchingPairs(activity: MatchingPairsActivityType, userAnswer: string[][]) {
  return activity.answers.every(correctPair =>
    Object.values(userAnswer).some(pair => areArraysEqual(pair as string[], correctPair)),
  );
}
