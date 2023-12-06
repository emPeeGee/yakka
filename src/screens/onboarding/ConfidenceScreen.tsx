import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { Theme } from '@/types';
import { Button, EnhancedText } from '@/ui/core';
import { useTheme } from '@/ui/theme';
import { ConfidenceSvg } from './components/ConfidenceSvg';

export const ConfidenceScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <ConfidenceSvg />

      <EnhancedText>Confidence in your words</EnhancedText>
      <EnhancedText>
        With conversation-based learning, you&#39;ll be talking from lesson one
      </EnhancedText>

      <View style={{ flexDirection: 'row' }}>
        <Button title="Choose a language" backgroundColor="#5B7BFE" />
      </View>

      <EnhancedText>Already a yakka user? Log in</EnhancedText>
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
