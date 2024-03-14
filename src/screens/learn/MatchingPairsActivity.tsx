import { useEffect, useCallback, useState, useMemo } from 'react';
import { View } from 'react-native';

import { areArraysEqual } from '@/core/utils';
import { MatchingPairsActivityType } from '@/types';
import { useWizard, WizardScreenProps, EnhancedPressable, EnhancedText } from '@/ui/core';
import { useTheme } from '@/ui/theme';
import { ActivityHeader } from './ActivityHeader';

type MatchingPairsActivityProps = {
  index: number;
  activity: MatchingPairsActivityType;
} & WizardScreenProps;

export function MatchingPairsActivity({ index, activity, answered }: MatchingPairsActivityProps) {
  const { theme } = useTheme();
  const { data, setData, setIsContinueEnabled, setOnNextScreen, setNextButtonProps } = useWizard();
  const [pairs, setPairs] = useState<Record<number, [string, string]>>({});
  const totalTiles = useMemo(() => Object.values(activity.answers).flat().length, [activity]);

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
          answer: 'It should be different',
          isCorrect: activity.answers.every(correctPair =>
            Object.values(data[activity.sentence]).some(pair => areArraysEqual(pair, correctPair)),
          ),
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

  const tilePressHandler = useCallback(
    (answer: string) => {
      setPairs(prev => {
        const newPairsState = getNewPairState(prev, answer);
        const selectedTiles = Object.values(newPairsState).flat();

        setData(activity.sentence, newPairsState);
        setIsContinueEnabled(selectedTiles.length === totalTiles);
        return newPairsState;
      });
    },
    [setPairs, totalTiles, setData, setIsContinueEnabled, activity.sentence],
  );

  const pairColors = useMemo<Record<string, string>>(
    () => ({
      '0': theme.colors.secondary300,
      '1': theme.colors.coral,
      '2': theme.colors.mint,
      '3': theme.colors.info,
      '4': theme.colors.lilac,
    }),
    [theme],
  );

  /**
   * Gets the background color for a tile based on the provided answer.
   * @param {string} answer - The answer to determine the background color for.
   * @returns {string|undefined} The background color corresponding to the provided answer, or undefined if not found.
   */
  const getBackgroundColorTile = useCallback(
    (answer: string) => {
      // Find the tile index containing the provided answer and return its corresponding color
      const tileIndex = Object.entries(pairs).find(([, pair]) => pair.includes(answer))?.[0];
      return tileIndex ? pairColors[tileIndex] : undefined;
    },
    [pairs, pairColors],
  );

  return (
    <View style={[{ width: '100%', flex: 1, flexDirection: 'column', padding: theme.spacing.md }]}>
      <ActivityHeader activity={activity} txTitle="learn.matchPairs" noSentence noSpeaker />

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: theme.spacing.sm,
        }}>
        {activity.answers.flat().map(answer => (
          <EnhancedPressable
            disabled={answered}
            key={answer}
            style={{
              flexBasis: '45%',
              flexShrink: 2,
              flexGrow: 2,
              justifyContent: 'center',
              alignItems: 'center',
              padding: theme.spacing.sm,
              borderWidth: theme.borders.medium,
              borderRadius: theme.borderRadius.xl,
              borderColor: theme.colors.border,
              backgroundColor: getBackgroundColorTile(answer),
            }}
            onPress={() => tilePressHandler(answer)}>
            <EnhancedText text={answer} weight="medium" size="sm" />
          </EnhancedPressable>
        ))}

        <EnhancedText tx="learn.matchingPairsInfo" />
      </View>
    </View>
  );
}

/**
 * Determines the new state of the pairs based on the previous state and the selected answer.
 * @param {Record<number, [string, string]>} prev - The previous state of the pairs.
 * @param {string} answer - The selected answer.
 * @returns {Record<number, [string, string]>} The new state of the pairs.
 */
function getNewPairState(
  prev: Record<number, [string, string]>,
  answer: string,
): Record<number, [string, string]> {
  // Get the keys of the previous state and flatten the values into a single array
  const keys = Object.keys(prev);
  const selectedValues = Object.values(prev).flat();

  // Determine the index of the current pair
  const currentIndex = Math.max(keys.length - 1, 0);

  // When one word is already selected
  if (prev[currentIndex] && prev[currentIndex].length === 1) {
    // When one word is already selected and it is already selected, deselect it
    if (selectedValues.includes(answer)) {
      // Remove the selected answer from the current pair
      const newRow = prev[currentIndex].filter(el => el !== answer);
      return { ...prev, [currentIndex]: newRow };
    }
    // Add the selected answer to the current pair
    return { ...prev, [currentIndex]: [prev[currentIndex][0], answer] };
  } else if (selectedValues.includes(answer)) {
    // If the selected answer is already selected, return the previous state
    return prev;
  } else if (prev[currentIndex] && prev[currentIndex].length === 2) {
    // When the current pair is done (both words are selected), move to the next pair
    return { ...prev, [currentIndex + 1]: [answer] };
  } else {
    // When no words are selected in the current pair, select the current answer
    return { ...prev, [currentIndex]: [answer] };
  }
}
