import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/ui/core';

import { ConfidenceSvg } from './components/ConfidenceSvg';

export const ConfidenceScreen = () => {
  return (
    <View style={styles.container}>
      <ConfidenceSvg />

      <Text>Confidence in your words</Text>
      <Text>With conversation-based learning, you&#39;ll be talking from lesson one</Text>

      <View style={{ flexDirection: 'row' }}>
        <Button title="Choose a language" backgroundColor="#5B7BFE" />
      </View>

      <Text>Already a yakka user? Log in</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
});
