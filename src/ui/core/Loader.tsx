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

type LoaderSize = 's' | 'm' | 'lg';

type LoaderProps = {
  size?: LoaderSize;
};

export const Loader = ({ size = 'm' }: LoaderProps) => {
  const { theme } = useTheme();
  const styles = getStyles(theme, size);
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
const getStyles = (theme: Theme, size: LoaderSize) =>
  StyleSheet.create({
    spinner: {
      height: size === 's' ? 20 : size === 'm' ? 60 : 100,
      width: size === 's' ? 20 : size === 'm' ? 60 : 100,
      borderRadius: 30,
      borderWidth: size === 's' ? 4 : 7,
      borderTopColor: theme.colors.secondary100,
      borderRightColor: theme.colors.secondary100,
      borderBottomColor: theme.colors.secondary100,
      borderLeftColor: theme.colors.secondary500,
    },
  });
