import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import { useHeaderHeight } from '@react-navigation/elements';

import { COLOR_SCHEME_OPTIONS } from '@/core/constants';
import { useIsFirstTime } from '@/core/hooks';
import { removeItem } from '@/core/storage';
import { EnhancedText, RadioGroup, Button } from '@/ui/core';
import { useTheme } from '@/ui/theme';

export const SettingsScreen = () => {
  const { setColorScheme, userColorScheme } = useTheme();
  const [selected, setSelected] = useState(userColorScheme);
  const [isFirstTime, , isLoading] = useIsFirstTime();
  const headerHeight = useHeaderHeight();

  return (
    <View>
      <View style={{ height: headerHeight }} />
      <Text>Sandbox</Text>

      {isLoading && <ActivityIndicator size="large" />}
      <EnhancedText>Is first time {isFirstTime ? 'yes' : 'no'}</EnhancedText>
      <View>
        <RadioGroup
          label="Favorite avatar"
          options={COLOR_SCHEME_OPTIONS}
          value={selected}
          onChange={selected => {
            setColorScheme(selected);
            setSelected(selected);
          }}
        />
      </View>
      <EnhancedText>You have selected: {selected}</EnhancedText>

      <Button
        title="Clear the storage"
        onPress={() => {
          removeItem('IS_FIRST_TIME');
        }}
      />
    </View>
  );
};
