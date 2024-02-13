import React from 'react';
import { StyleSheet, View } from 'react-native';

import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { Theme } from '@/types';
import { useTheme } from '@/ui/theme';

type PaginationIndicatorProps = {
  index: number;
  x: SharedValue<number>;
  screenWidth: number;
};

const PaginationIndicator = ({ index, x, screenWidth }: PaginationIndicatorProps) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [(index - 1) * screenWidth, index * screenWidth, (index + 1) * screenWidth],
      [10, 20, 10],
      Extrapolate.CLAMP,
    );

    const opacityAnimation = interpolate(
      x.value,
      [(index - 1) * screenWidth, index * screenWidth, (index + 1) * screenWidth],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP,
    );

    return {
      width: widthAnimation,
      opacity: opacityAnimation,
    };
  });

  return <Animated.View style={[styles.dots, animatedDotStyle]} />;
};

type PaginationProps<T> = {
  data: T[];
  x: SharedValue<number>;
  screenWidth: number;
};

export function Pagination<T>({ data, screenWidth, x }: PaginationProps<T>) {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <PaginationIndicator key={index} index={index} x={x} screenWidth={screenWidth} />
      ))}
    </View>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    dots: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.colors.primary800,
      marginHorizontal: 10,
    },
  });
