import React, { useMemo } from 'react';
import { View } from 'react-native';

import * as Haptics from 'expo-haptics';

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
        title="Clear the storage"
        onPress={() => {
          removeItem('IS_FIRST_TIME');
        }}
      />
    </View>
  );
};
