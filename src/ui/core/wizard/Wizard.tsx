import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View, useWindowDimensions, FlatList, BackHandler } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { isLast, isZero } from '@/core/utils';
import { Theme } from '@/types';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { Button } from '../Button';
import { EnhancedPressable } from '../EnhancedPressable';
import { EnhancedText } from '../EnhancedText';
import { TextField } from '../TextField';

type WizardProps = {
  screens: (() => React.JSX.Element)[];
  onFinish: () => void;
};

export const Wizard = ({ screens, onFinish }: WizardProps) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const { theme } = useTheme();

  const styles = useMemo(() => getStyles(theme), [theme]);
  const gStyles = useGlobalThemedStyles();

  const flatListIndex = useSharedValue(0);
  const progressBarIndex = useSharedValue(0);
  const flatListRef = useAnimatedRef<FlatList>();
  // TODO: not used
  const x = useSharedValue(0);

  const [isLastScreen, setIsLastScreen] = useState(false);

  const onBackPress = useCallback(() => {
    const current = flatListIndex.value;
    const prev = flatListIndex.value - 1;

    if (!isLast(screens.length, prev)) {
      setIsLastScreen(false);
    }

    if (isZero(current)) {
      return false;
    }

    flatListIndex.value = prev;
    progressBarIndex.value = withTiming(prev);
    flatListRef.current?.scrollToIndex({ index: prev });
    return true;
  }, []);

  const onNextPress = useCallback(() => {
    const current = flatListIndex.value;
    const next = flatListIndex.value + 1;

    if (isLast(screens.length, next)) {
      setIsLastScreen(true);
    }

    if (isLast(screens.length, current)) {
      onFinish();
      return false;
    }

    flatListIndex.value = next;
    progressBarIndex.value = withTiming(next);
    flatListRef.current?.scrollToIndex({ index: next });
  }, []);

  // Custom back button behavior
  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, []),
  );

  const progressIndicatorStyles = useAnimatedStyle(() => {
    const width = interpolate(progressBarIndex.value + 1, [0, screens.length], [0, 100]);

    return {
      width: `${width}%`,
    };
  }, []);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <View style={{ flex: 1, paddingVertical: theme.spacing.medium }}>
      <View style={[gStyles.centerRowBetween, styles.headerContainer]}>
        <EnhancedPressable onPress={onBackPress}>
          <Ionicons name="ios-chevron-back" size={24} color={theme.colors.primary} />
        </EnhancedPressable>
        <View style={[{ width: '50%' }]}>
          <View
            style={[
              {
                borderRadius: theme.borderRadius.large,
                backgroundColor: theme.colors.base40,
                width: '100%',
              },
            ]}>
            <Animated.View
              style={[
                {
                  height: 24,
                  backgroundColor: theme.colors.primary,
                  borderRadius: theme.borderRadius.large,
                },
                progressIndicatorStyles,
              ]}
            />
          </View>
        </View>
        <View style={{ height: 24, width: 1, backgroundColor: theme.colors.background }} />
      </View>

      <Animated.FlatList
        ref={flatListRef as any}
        data={screens}
        renderItem={({ item: Screen, index }) => (
          <View key={index} style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
            <Screen />

            <TextField labelTx="welcomeScreen.letsGo" status="error" />

            <TextField
              helper="1234"
              label="123"
              inputWrapperStyle={{ width: '100%' }}
              // multiline
              LeftAccessory={props => (
                <View style={[props.style]}>
                  <Ionicons color="white" size={26} name="airplane-outline" />
                </View>
              )}
            />

            <EnhancedText tx="common.back" />
            <EnhancedText tx="common.back" preset="bold" />
            <EnhancedText tx="common.back" preset="formHelper" />
            <EnhancedText tx="common.back" preset="formLabel" />
            <EnhancedText tx="common.back" preset="subheading" />
            <EnhancedText tx="common.back" preset="heading" />
          </View>
        )}
        horizontal
        bounces={false}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onScroll}
        scrollEventThrottle={16}
      />

      <View style={styles.footerContainer}>
        <Button
          title={isLastScreen ? 'Finish' : 'Continue'}
          onPress={onNextPress}
          backgroundColor={theme.colors.secondary300}
          radius={theme.borderRadius.large}
        />
      </View>
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    itemContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: theme.spacing.medium,
    },
    headerContainer: {
      paddingHorizontal: theme.spacing.medium,
    },
    footerContainer: {
      margin: 20,
    },
  });
