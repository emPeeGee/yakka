import { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { Theme } from '@/types';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { EnhancedText } from '../EnhancedText';

export const HeroWithChat = () => {
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();
  const styles = getStyles(theme);

  const [currentIndicatorLayout, setCurrentIndicatorLayout] = useState<{
    width: number;
    height: number;
  } | null>(null);

  return (
    <View>
      <View style={[gStyles.centerRow]}>
        <View style={[gStyles.centerRow]}>
          <Image
            source={require('../../../assets/hero/heroWithChat.png')}
            style={{ width: 170, height: 170, transform: [{ scale: 1.3 }, { translateY: 16 }] }}
          />
        </View>
        <View
          onLayout={e => {
            setCurrentIndicatorLayout({
              height: e.nativeEvent.layout.height,
              width: e.nativeEvent.layout.width,
            });
          }}
          style={styles.chatShape}>
          <View
            style={[
              styles.triangle,
              styles.outerShape,
              {
                top: currentIndicatorLayout
                  ? currentIndicatorLayout?.height / 2 - OUTER_TRIANGLE.width / 2
                  : 0,
              },
            ]}
          />
          <View
            style={[
              styles.triangle,
              styles.innerShape,
              {
                top: currentIndicatorLayout
                  ? currentIndicatorLayout?.height / 2 - INNER_TRIANGLE.width / 2
                  : 0,
              },
            ]}
          />
          <EnhancedText size="lg" weight="medium" style={{ textAlign: 'center' }}>
            What language do you want to use for Yakka?
          </EnhancedText>
        </View>
      </View>
    </View>
  );
};

const OUTER_TRIANGLE = {
  width: 22,
  height: 12,
};

const INNER_TRIANGLE = {
  width: 18,
  height: 9,
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    chatShape: {
      width: 180,
      borderWidth: theme.borders.medium,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.xs,
    },
    triangle: {
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      backgroundColor: 'transparent',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
    },
    outerShape: {
      left: -24,
      top: '50%',
      right: 0,
      borderLeftWidth: OUTER_TRIANGLE.height,
      borderRightWidth: OUTER_TRIANGLE.height,
      borderBottomWidth: OUTER_TRIANGLE.width,
      borderBottomColor: theme.colors.border,
      transform: [{ rotate: '-90deg' }],
    },

    innerShape: {
      left: -18,
      borderLeftWidth: INNER_TRIANGLE.height,
      borderRightWidth: INNER_TRIANGLE.height,
      borderBottomWidth: INNER_TRIANGLE.width,
      borderBottomColor: theme.colors.background,
      transform: [{ rotate: '-90deg' }],
      zIndex: 2,
    },
  });
