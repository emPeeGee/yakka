import React, { useMemo, useState } from 'react';
import { View } from 'react-native';

import * as Haptics from 'expo-haptics';

import { useIsFirstTime } from '@/core/hooks';
import { removeItem } from '@/core/storage';
import { EnhancedText, Button, List, DataListType, HeaderPlaceholder } from '@/ui/core';

export const SettingsScreen = () => {
  const [isFirstTime] = useIsFirstTime();

  const [enabledHaptic, setEnabledHaptic] = useState(true);

  const SETTINGS_LIST = useMemo(
    () =>
      [
        {
          label: 'Appearance',
          screen: 'AppearanceScreen',
        },
        {
          label: 'Haptics',
          checked: enabledHaptic,
          callback: () => {
            setEnabledHaptic(prev => {
              if (prev === false) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              }
              return !prev;
            });
          },
        },
      ] as DataListType[],
    [enabledHaptic],
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
