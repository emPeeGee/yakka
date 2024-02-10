import React, { useCallback, useMemo, useState } from 'react';
import {
  StyleSheet,
  View,
  useWindowDimensions,
  FlatList,
  BackHandler,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { TxKeyPath } from '@/core/i18n';
import { isLast, isZero } from '@/core/utils';
import { Theme } from '@/types';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { WizardData, WizardProvider, useWizard } from './WizardProvider';
import { BackButton } from '../BackButton';
import { Button } from '../Button';

type WizardProps = {
  // TODO: better type
  fallbackRoute: string;
  screens: (() => React.JSX.Element)[];
  screensContainerStyle?: StyleProp<ViewStyle>;
  onFinish: (data: WizardData) => void;
  txButtonLabel?: TxKeyPath;
  txLastScreenButtonLabel?: TxKeyPath;
};

// TODO: name
const Wizardd = ({
  screens,
  fallbackRoute,
  screensContainerStyle,
  onFinish,
  txButtonLabel,
  txLastScreenButtonLabel,
}: WizardProps) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  const { data, isContinueEnabled, onNextScreen } = useWizard();

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
      // fallbackRoute && navigate(fallbackRoute as never);
      if (fallbackRoute) {
        navigate(fallbackRoute as never);
        return true;
      }

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
      onFinish(data);
      return false;
    }

    flatListIndex.value = next;
    progressBarIndex.value = withTiming(next);
    flatListRef.current?.scrollToIndex({ index: next });
    onNextScreen[next]?.();
  }, [data]);

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
    <View style={{ flex: 1, paddingTop: theme.spacing.md }}>
      <View style={[gStyles.centerRowBetween, styles.headerContainer]}>
        <BackButton onPress={onBackPress} />
        {/* <EnhancedPressable onPress={onBackPress}>
          <Ionicons name="ios-chevron-back" size={24} color={theme.colors.primary} />
        </EnhancedPressable> */}
        <View style={[{ width: '50%' }]}>
          <View
            style={[
              {
                borderRadius: theme.borderRadius.lg,
                backgroundColor: theme.colors.base40,
                width: '100%',
              },
            ]}>
            <Animated.View
              style={[
                {
                  height: 24,
                  backgroundColor: theme.colors.primary,
                  borderRadius: theme.borderRadius.lg,
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
        // NOTE: web workaround for the scroll work
        getItemLayout={(data, index) => ({
          length: SCREEN_WIDTH,
          index,
          offset: SCREEN_WIDTH * index,
        })}
        data={screens}
        renderItem={({ item: Screen, index }) => (
          <View
            key={index}
            style={[styles.itemContainer, screensContainerStyle, { width: SCREEN_WIDTH }]}>
            <Screen />
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
          tx={
            isLastScreen
              ? txLastScreenButtonLabel || 'common.finish'
              : txButtonLabel || 'common.continue'
          }
          onPress={onNextPress}
          backgroundColor={theme.colors.secondary300}
          disabled={!isContinueEnabled}
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
      paddingHorizontal: theme.spacing.md,
    },
    headerContainer: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xxxs,
    },
    footerContainer: {
      borderTopWidth: 2,
      borderTopColor: theme.colors.border,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.sm,
    },
  });

export const Wizard = ({
  enableContinueOnFirstScreen,
  ...props
}: WizardProps & { enableContinueOnFirstScreen?: boolean }) => (
  <WizardProvider enableContinueOnFirstScreen={enableContinueOnFirstScreen}>
    <Wizardd {...props} />
  </WizardProvider>
);
