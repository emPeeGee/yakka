import { useState } from 'react';
import { View, SafeAreaView, Text } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { ConfidenceScreen } from '@/screens/onboarding/confidence-screen';
import { RadioGroup } from '@/ui/core';
// TODO: @ui/theme or @ui ???
import { useGlobalStyles, useTheme } from '@/ui/theme';

// TODO: move
const options = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'System', value: 'system' },
];

export function ApplicationConfigurator() {
  const { container } = useGlobalStyles();
  const { setColorScheme, userColorScheme } = useTheme();

  const [selected, setSelected] = useState(userColorScheme);

  return (
    <SafeAreaView style={container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <ConfidenceScreen />

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
      <Text>You have selected: {selected}</Text>
    </SafeAreaView>
  );
}
