import * as React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import { BackButton, EnhancedText, HeroWithChat, TextField } from '@/ui/core';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

export function DynamicHeader({ animHeaderValue }: { animHeaderValue: any }) {
  const Header_Max_Height = 200;
  const Header_Min_Height = 70;

  const [searchFieldDimensions, setSearchFieldDimensions] = React.useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();
  const animateHeaderBackgroundColor = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [theme.colors.primary700, theme.colors.primary500],
    extrapolate: 'clamp',
  });

  const animateHeaderHeight = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  });

  const animateHeroScale = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [2, 1],
    extrapolate: 'clamp',
  });

  const animateSearchPosition = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [-26, 16], // TODO: hardcode is not the option
    extrapolate: 'clamp',
  });

  // TODO: better animations
  return (
    <View>
      <Animated.View
        style={[
          styles.header,
          {
            height: animateHeaderHeight,
            backgroundColor: animateHeaderBackgroundColor,
            width: '100%',
          },
        ]}>
        <View
          style={[
            { width: '100%', paddingHorizontal: theme.spacing.md },
            gStyles.centerRowBetween,
          ]}>
          <BackButton />

          <View
            style={[
              gStyles.centerColumnStart,
              gStyles.fullWidthFromStart,
              { marginHorizontal: theme.spacing.md },
            ]}>
            <EnhancedText
              tx="voc.whichCategory"
              style={[
                theme.typography.sizes.xl,
                gStyles.fullWidthFromStart,
                { color: theme.colors.base0 },
              ]}
            />
            <EnhancedText
              tx="voc.wouldLearn"
              style={[
                {
                  fontSize: theme.typography.sizes.sm.fontSize,
                  lineHeight: theme.typography.sizes.sm.fontSize,
                  color: theme.colors.base0,
                },
                gStyles.fullWidthFromStart,
              ]}
            />
          </View>
        </View>

        <Animated.View
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: 65,
            height: 65,
            transform: [{ scale: animateHeroScale }],
          }}>
          {/* TODO: right hero */}
          <HeroWithChat />
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={{
          height: searchFieldDimensions.height,
          zIndex: 992,
          transform: [{ translateY: animateSearchPosition }],
        }}>
        <TextField
          onLayout={event => {
            const { width, height } = event.nativeEvent.layout;
            setSearchFieldDimensions({ width, height });
          }}
          placeholderTx="voc.searchCategory"
        />
      </Animated.View>
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
