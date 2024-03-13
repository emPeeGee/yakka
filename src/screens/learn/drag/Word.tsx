import { useContext } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

import { Theme } from '@/types';
import { EnhancedText } from '@/ui/core';
import { useTheme } from '@/ui/theme';
import { WordContext } from './WordContext';

export interface WordProps {
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function Word({ containerStyle, textStyle }: WordProps) {
  const { wordHeight, text, wordGap } = useContext(WordContext);
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View
      style={[
        { height: wordHeight, marginHorizontal: wordGap, marginBottom: wordGap * 2, marginTop: 0 },
        styles.container,
        containerStyle,
      ]}>
      <EnhancedText
        style={[styles.text, textStyle]}
        size="md"
        text={text}
        allowFontScaling={false}
        numberOfLines={1}
      />
    </View>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginTop: 0,
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.border,
      borderWidth: theme.borders.medium,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.md,
    },
    text: {
      textAlign: 'center',
    },
  });
