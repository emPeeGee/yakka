import { useEffect, useState } from 'react';
import { View, SafeAreaView, ActivityIndicator } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { useIsFirstTime } from '@/core/hooks';
import { ConfigLoggerType, consoleTransport, createLogger } from '@/core/logger/console';
import { removeItem } from '@/core/storage';
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

type ApplicationLogs = 'cus' | 'info' | 'error' | 'debug' | 'warn' | 'trace';

const defaultConfig: ConfigLoggerType = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
    cus: 4,
  },
  severity: 'debug',
  transport: consoleTransport,
  transportOptions: {
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
      debug: 'greenBright',
      cus: 'magenta',
    },
    extensionColors: {
      root: 'green',
    },
  },
  async: true,
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
  enabled: true,
};

const log = createLogger<ApplicationLogs>(defaultConfig);
const rootLog = log.extend('root');

export function ApplicationConfigurator() {
  const { notchSafeArea } = useGlobalThemedStyles();
  const { setColorScheme, userColorScheme, statusBarScheme } = useTheme();

  const [selected, setSelected] = useState(userColorScheme);
  const [isFirstTime, , isLoading] = useIsFirstTime();

  // kinda, create own function, like info, info2 with different preset
  useEffect(() => {
    log.info('hello there', log.getSeverity());
    log.warn('hello there', setColorScheme, log.getSeverity());
    log.debug('hello there', setColorScheme, log.getSeverity());
    log.cus('hello there', setColorScheme);
    rootLog.warn('showing');
    // log.patchConsole();
  }, []);

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
