import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Theme } from '@/types';
import { Button } from '@/ui/core';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

import { ConfidenceSvg } from './components/ConfidenceSvg';

export const ConfidenceScreen = () => {
  const { theme } = useTheme();
  const globalStyles = useGlobalThemedStyles();

  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <ConfidenceSvg />

      <Text style={globalStyles.text}>Confidence in your words</Text>
      <Text style={globalStyles.text}>
        With conversation-based learning, you&#39;ll be talking from lesson one
      </Text>

      <View style={{ flexDirection: 'row' }}>
        <Button title="Choose a language" backgroundColor="#5B7BFE" />
      </View>

      <Text style={globalStyles.text}>Already a yakka user? Log in</Text>
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 12,
      backgroundColor: theme.colors.background,
    },
  });
