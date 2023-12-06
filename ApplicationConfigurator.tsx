import { useState } from 'react';
import { View, SafeAreaView, ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

import { useIsFirstTime } from '@/core/hooks';
import { ConfidenceScreen } from '@/screens/onboarding/ConfidenceScreen';
import { ColorSchemeType } from '@/types';
import { Button, EnhancedText, RadioGroup, RadioGroupOption } from '@/ui/core';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

// TODO: move
const options: RadioGroupOption<ColorSchemeType>[] = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'System', value: 'system' },
];

export function ApplicationConfigurator() {
  const { notchSafeArea } = useGlobalThemedStyles();
  const { setColorScheme, userColorScheme, statusBarScheme } = useTheme();

  const [selected, setSelected] = useState(userColorScheme);
  const [isFirstTime, , isLoading] = useIsFirstTime();

  return (
    <SafeAreaView style={notchSafeArea}>
      <StatusBar style={statusBarScheme} />
      <ConfidenceScreen />

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
          AsyncStorage.removeItem('IS_FIRST_TIME');
        }}
      />
    </SafeAreaView>
  );
}
