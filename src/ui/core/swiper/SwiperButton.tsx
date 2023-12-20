import React, { RefObject } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';

import { Feather } from '@expo/vector-icons';
import Animated, { SharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { ConfigLoggerType, consoleTransport, createLogger } from '@/core/logger/console';
import { isLast } from '@/core/utils';
import { Theme } from '@/types';
import { useTheme } from '@/ui/theme';
import { EnhancedText } from '../EnhancedText';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedText = Animated.createAnimatedComponent(EnhancedText);

type SwiperButtonProps = {
  flatListRef: RefObject<FlatList>;
  flatListIndex: SharedValue<number>;
  dataLength: number;
  onFinish: () => void;
};

const defaultConfig: ConfigLoggerType = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
    cus: 4,
  },
  severity: 'debug',
  transport: consoleTransport,
  transportOptions: {
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
      debug: 'greenBright',
      cus: 'magenta',
    },
    extensionColors: {
      root: 'green',
    },
  },
  async: true,
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
  enabled: true,
};

type ApplicationLogs = 'cus' | 'info' | 'error' | 'debug' | 'warn' | 'trace';
const log = createLogger<ApplicationLogs>(defaultConfig);
const onboardingLog = log.extend('onboarding');

export function SwiperButton({
  dataLength,
  flatListIndex,
  flatListRef,
  onFinish,
}: SwiperButtonProps) {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const buttonAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = isLast(dataLength, flatListIndex.value);
    return {
      width: isLastScreen ? withTiming(150) : withTiming(60),
      height: 60,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = isLast(dataLength, flatListIndex.value);
    return {
      opacity: isLastScreen ? withTiming(0) : withTiming(1),
      transform: [{ translateX: isLastScreen ? withTiming(100) : withTiming(0) }],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = isLast(dataLength, flatListIndex.value);
    return {
      opacity: isLastScreen ? withTiming(1) : withTiming(0),
      transform: [{ translateX: isLastScreen ? withTiming(0) : withTiming(-100) }],
    };
  });

  const handleNextScreen = () => {
    const isLastScreen = isLast(dataLength, flatListIndex.value);
    if (!isLastScreen) {
      flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1 });
    }

    if (isLastScreen) {
      onboardingLog.info('Onboarding finished');
      onFinish();
    }
  };

  return (
    <AnimatedPressable onPress={handleNextScreen} style={[styles.container, buttonAnimationStyle]}>
      <AnimatedText numberOfLines={1} style={[styles.text, textAnimationStyle]}>
        Get Started
      </AnimatedText>

      {/* I've wrapped the icon in an animated view, otherwise animation won't work https://github.com/software-mansion/react-native-reanimated/issues/2869*/}
      <Animated.View style={arrowAnimationStyle}>
        <Feather name="arrow-right" size={30} color={theme.colors.base0} />
      </Animated.View>
    </AnimatedPressable>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary80,
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
      color: theme.colors.base0,
    },
  });
