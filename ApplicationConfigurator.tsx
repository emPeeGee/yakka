import { useState } from 'react';
import { View, SafeAreaView, ActivityIndicator } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { useIsFirstTime } from '@/core/hooks';
import { removeItem } from '@/core/storage';
import { ConfidenceScreen } from '@/screens/onboarding/ConfidenceScreen';
import { ColorSchemeType } from '@/types';
import { Button, EnhancedText, RadioGroup, RadioGroupOption } from '@/ui/core';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { consoleTransport, createLogger } from '@/core/logger/console';

// TODO: move
const options: RadioGroupOption<ColorSchemeType>[] = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'System', value: 'system' },
];

const defaultConfig = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: 'debug',
  transport: consoleTransport,
  transportOptions: {
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
    },
  },
  async: true,
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
  enabled: true,
};

const log = createLogger(defaultConfig);

export function ApplicationConfigurator() {
  const { notchSafeArea } = useGlobalThemedStyles();
  const { setColorScheme, userColorScheme, statusBarScheme } = useTheme();

  const [selected, setSelected] = useState(userColorScheme);
  const [isFirstTime, , isLoading] = useIsFirstTime();

  // kinda, create own function, like info, info2 with different preset
  log.info('hello there');
  log.warn('hello there', setColorScheme);

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
          removeItem('IS_FIRST_TIME');
        }}
      />
    </SafeAreaView>
  );
}
