import { StyleSheet, Text, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { ConfidenceScreen } from '@/screens/onboarding/confidence-screen';

// eslint-disable-next-line import/no-default-export
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />

      <ConfidenceScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
