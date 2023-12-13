import React, { RefObject } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';

import { Feather } from '@expo/vector-icons';
import Animated, { SharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { Theme } from '@/types';
import { useTheme } from '@/ui/theme';
import { EnhancedText } from '../EnhancedText';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedFeather = Animated.createAnimatedComponent(Feather);
const AnimatedText = Animated.createAnimatedComponent(EnhancedText);

type SwiperButtonProps = {
  flatListRef: RefObject<FlatList>;
  flatListIndex: SharedValue<number>;
  dataLength: number;
};

export function SwiperButton({ dataLength, flatListIndex, flatListRef }: SwiperButtonProps) {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const buttonAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex.value === dataLength - 1;
    return {
      width: isLastScreen ? withTiming(150) : withTiming(60),
      height: 60,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex.value === dataLength - 1;
    return {
      opacity: isLastScreen ? withTiming(0) : withTiming(1),
      transform: [{ translateX: isLastScreen ? withTiming(100) : withTiming(0) }],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex.value === dataLength - 1;
    return {
      opacity: isLastScreen ? withTiming(1) : withTiming(0),
      transform: [{ translateX: isLastScreen ? withTiming(0) : withTiming(-100) }],
    };
  });

  const handleNextScreen = () => {
    const isLastScreen = flatListIndex.value === dataLength - 1;
    if (!isLastScreen) {
      flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1 });
    }
  };

  return (
    <AnimatedPressable onPress={handleNextScreen} style={[styles.container, buttonAnimationStyle]}>
      <AnimatedText numberOfLines={1} style={[styles.text, textAnimationStyle]}>
        Get Started
      </AnimatedText>

      <AnimatedFeather
        name="arrow-right"
        size={30}
        color={theme.colors.accent}
        style={[styles.arrow, arrowAnimationStyle]}
      />
    </AnimatedPressable>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.secondary,
      padding: 10,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    arrow: {
      position: 'absolute',
    },
    text: {
      position: 'absolute',
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
  });
