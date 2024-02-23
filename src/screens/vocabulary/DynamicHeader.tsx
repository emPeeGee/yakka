import * as React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import { BackButton, EnhancedText, HeroWithChat, TextField } from '@/ui/core';
import { MagnifyingGlassIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 90;

export function DynamicHeader({ animHeaderValue }: { animHeaderValue: any }) {
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();
  const animateHeaderBackgroundColor = animHeaderValue.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [theme.colors.primary700, theme.colors.primary500],
    extrapolate: 'clamp',
  });

  const animateHeaderHeight = animHeaderValue.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  // TODO: better animations
  return (
    <View>
      <Animated.View
        style={[
          styles.header,
          {
            zIndex: 1,
            height: animateHeaderHeight,
            backgroundColor: animateHeaderBackgroundColor,
            width: '100%',
          },
        ]}>
        <View
          style={[
            { width: '100%', flex: 1, paddingHorizontal: theme.spacing.md },
            gStyles.centerRowBetween,
          ]}>
          <BackButton />

          <View
            style={[
              gStyles.centerColumnStart,
              gStyles.fullWidthFromStart,
              {
                flex: 1,
                marginHorizontal: theme.spacing.md,
              },
            ]}>
            <EnhancedText
              tx="voc.whichCategory"
              style={[theme.typography.sizes.xl, { color: theme.colors.base0 }]}
            />
            <EnhancedText
              tx="voc.wouldLearn"
              style={[
                {
                  fontSize: theme.typography.sizes.sm.fontSize,
                  lineHeight: theme.typography.sizes.sm.fontSize,
                  color: theme.colors.base0,
                },
              ]}
            />
          </View>

          <HeroWithChat hero="question" width={40} height={HEADER_MIN_HEIGHT - 16} />
        </View>
      </Animated.View>
      <View
        style={{
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.md,
        }}>
        <TextField
          placeholderTx="voc.searchCategory"
          RightAccessory={props => (
            <View style={[props.style]}>
              <MagnifyingGlassIcon />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
  },
});
