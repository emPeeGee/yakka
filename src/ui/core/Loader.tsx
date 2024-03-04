import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated';

import { Theme } from '@/types';
import { useGlobalThemedStyles, useTheme } from '../theme';

export const Loader = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const gStyles = useGlobalThemedStyles();
  const rotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  }, [rotation.value]);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      200,
    );
    return () => cancelAnimation(rotation);
  }, []);

  return (
    <View style={gStyles.centerColumn}>
      <Animated.View style={[styles.spinner, animatedStyles]} />
    </View>
  );
};
const getStyles = (theme: Theme) =>
  StyleSheet.create({
    spinner: {
      height: 60,
      width: 60,
      borderRadius: 30,
      borderWidth: 7,
      borderTopColor: theme.colors.secondary100,
      borderRightColor: theme.colors.secondary100,
      borderBottomColor: theme.colors.secondary100,
      borderLeftColor: theme.colors.secondary500,
    },
  });
