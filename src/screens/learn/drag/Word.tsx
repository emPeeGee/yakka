import { useContext } from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

import { Theme } from '@/types';
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
      <Text style={[styles.text, textStyle]} allowFontScaling={false} numberOfLines={1}>
        {text}
      </Text>
    </View>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginTop: 0,
      backgroundColor: theme.colors.base0,
      borderColor: theme.colors.border,
      borderWidth: 2,
      borderRadius: 8,
      justifyContent: 'center',
      paddingHorizontal: 10,
    },
    text: {
      fontSize: 16,
    },
  });
