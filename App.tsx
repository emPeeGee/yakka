import { Alert, StyleSheet, Text, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { Button } from '@/components/';

// eslint-disable-next-line import/no-default-export
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button
        title="Press the Yakka"
        onPress={() => {
          Alert.alert('Pressed');
        }}
      />
      <Button
        title="Press the Yakka"
        backgroundColor="#54a432"
        onPress={() => {
          Alert.alert('Pressed');
        }}
      />
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
