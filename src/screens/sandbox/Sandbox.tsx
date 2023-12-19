import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';

import { useIsFirstTime } from '@/core/hooks';
import { removeItem } from '@/core/storage';
import { UserColorSchemeType } from '@/types';
import { EnhancedText, RadioGroup, RadioGroupOption } from '@/ui/core';
import { useTheme } from '@/ui/theme';

// TODO: move
const options: RadioGroupOption<UserColorSchemeType>[] = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'System', value: 'system' },
];

export const Sandbox = () => {
  const { setColorScheme, userColorScheme } = useTheme();
  const [selected, setSelected] = useState(userColorScheme);
  const [isFirstTime, , isLoading] = useIsFirstTime();

  return (
    <View>
      <Text>Sandbox</Text>

      {isLoading && <ActivityIndicator size="large" />}
      <EnhancedText>Is first time {isFirstTime ? 'yes' : 'no'}</EnhancedText>
      <View>
        <RadioGroup
          label="Favorite avatar"
          options={options}
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
