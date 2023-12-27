import React, { useMemo } from 'react';
import { View, Text } from 'react-native';

import { useHeaderHeight } from '@react-navigation/elements';

import { useIsFirstTime } from '@/core/hooks';
import { removeItem } from '@/core/storage';
import { EnhancedText, Button, List, DataListType } from '@/ui/core';

export const SettingsScreen = () => {
  const [isFirstTime] = useIsFirstTime();
  const headerHeight = useHeaderHeight();

  const SETTINGS_LIST = useMemo(
    () =>
      [
        {
          label: 'Appearance',
          screen: 'AppearanceScreen',
        },
        {
          label: 'Haptics',
          checked: false,
        },
      ] as DataListType[],
    [],
  );

  return (
    <View>
      <View style={{ height: headerHeight }} />
      <Text>Sandbox</Text>

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
