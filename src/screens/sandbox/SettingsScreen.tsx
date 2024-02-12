import React, { useMemo } from 'react';
import { View } from 'react-native';

import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';

import { useIsFirstTime } from '@/core/hooks';
import { useHaptics } from '@/core/providers';
import { removeItem } from '@/core/storage';
import { EnhancedText, Button, List, DataListType, HeaderPlaceholder } from '@/ui/core';

export const SettingsScreen = () => {
  const [isFirstTime] = useIsFirstTime();
  const { setHapticsEnabled, isHapticsEnabled } = useHaptics();

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
