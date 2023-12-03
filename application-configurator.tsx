import { SafeAreaView, Text } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { ConfidenceScreen } from '@/screens/onboarding/confidence-screen';
// TODO: @ui/theme or @ui ???
import { useGlobalStyles } from '@/ui/theme';

export function ApplicationConfigurator() {
  const { container } = useGlobalStyles();

  return (
    <SafeAreaView style={container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />

      <ConfidenceScreen />
    </SafeAreaView>
  );
}
