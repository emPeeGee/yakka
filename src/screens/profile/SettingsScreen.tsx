import React, { useMemo } from 'react';

import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';

import { rootLog } from '@/core/logger';
import { useHaptics, useSound } from '@/core/providers';
import { removeItem } from '@/core/storage';
import { Button, List, DataListType, HeaderPlaceholder, ContainerWithInsets } from '@/ui/core';
import { useLearnStore } from '../learn/learnState';
import { useVocabularyStore } from '../vocabulary/vocabularyState';

export const SettingsScreen = () => {
  const { setHapticsEnabled, isHapticsEnabled } = useHaptics();
  const { setIsSoundEnabled, isSoundEnabled } = useSound();
  const { reset } = useVocabularyStore();
  const { reset: resetLearn } = useLearnStore();

  const SETTINGS_LIST = useMemo(
    () =>
      [
        {
          tx: 'profile.appearance',
          screen: 'ProfAppearance',
          withChevron: true,
        },
        {
          tx: 'profile.soundEffects',
          checked: isSoundEnabled,
          callback: (value: boolean) => {
            setIsSoundEnabled(value, (enabled: boolean) => {
              rootLog.info('Sound is', enabled);
            });
          },
        },
        {
          tx: 'profile.haptics',
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
    [isHapticsEnabled, isSoundEnabled],
  );

  return (
    <ContainerWithInsets>
      <HeaderPlaceholder />

      <List txTitle="profile.settings" data={SETTINGS_LIST} />

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
    </ContainerWithInsets>
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
