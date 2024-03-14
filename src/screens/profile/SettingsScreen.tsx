import React, { useMemo } from 'react';
import { View } from 'react-native';

import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';

import { useIsFirstTime } from '@/core/hooks';
import { useHaptics } from '@/core/providers';
import { removeItem } from '@/core/storage';
import { EnhancedText, Button, List, DataListType, HeaderPlaceholder } from '@/ui/core';
import { useLearnStore } from '../learn/learnState';
import { useVocabularyStore } from '../vocabulary/vocabularyState';

export const SettingsScreen = () => {
  const [isFirstTime] = useIsFirstTime();
  const { setHapticsEnabled, isHapticsEnabled } = useHaptics();
  const { reset } = useVocabularyStore();
  const { reset: resetLearn } = useLearnStore();

  const SETTINGS_LIST = useMemo(
    () =>
      [
        {
          label: 'Appearance',
          screen: 'AppearanceScreen',
        },
        {
          label: 'Haptics',
          checked: isHapticsEnabled,
          callback: (value: boolean) => {
            setHapticsEnabled(value, (enabled: boolean) => {
              if (enabled === true) {
                // Calling Haptics directly, because by the time it is called, useHaptics, will have haptics disabled
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              }
            });
          },
        },
      ] as DataListType[],
    [isHapticsEnabled],
  );

  return (
    <View>
      <HeaderPlaceholder />

      <List title="Settings" data={SETTINGS_LIST} />

      <EnhancedText>Is first time {isFirstTime ? 'yes' : 'no'}</EnhancedText>

      <Button
        tx="temp.clear1"
        onPress={() => {
          removeItem('IS_FIRST_TIME');
        }}
      />

      {/*  NOTE: Dev purpose */}
      <Button
        text="Clear vocabulary store"
        onPress={() => {
          reset();
        }}
      />

      {/*  NOTE: Dev purpose */}
      <Button
        text="Clear learn store"
        onPress={() => {
          resetLearn();
        }}
      />
      {/* POC: Speech */}
      <Button
        tx="temp.sound"
        onPress={() => {
          Speech.speak('Red apple', {
            language: 'en',
            // voice: '',
          });
          Speech.getAvailableVoicesAsync().then(val => {
            val
              .filter(voice => voice.language.includes('en'))
              .forEach(v => console.log(v.name, v.identifier));
          });
        }}
      />
    </View>
  );
};
// TODO: voices
[
  'com.apple.voice.compact.en-IE.Moira',
  'com.apple.voice.compact.en-US.Samantha',
  'com.apple.voice.compact.en-GB.Daniel',
  'com.apple.voice.compact.en-ZA.Tessa',
  'com.apple.voice.compact.en-AU.Karen',
  'com.apple.voice.compact.en-IN.Rishi',
];

// TODO: I think it will make sense to move the settings in another folder screen because it can include sub screens
