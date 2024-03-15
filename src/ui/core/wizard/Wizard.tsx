import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  View,
  useWindowDimensions,
  FlatList,
  BackHandler,
  StyleProp,
  ViewStyle,
  Platform,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
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
import { useSound } from '@/core/providers';
import { isLast, isZero } from '@/core/utils';
import { Theme } from '@/types';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { WizardData, WizardProvider, useWizard } from './WizardProvider';
import { BackButton } from '../BackButton';
import { Button } from '../Button';
import { EnhancedPressable } from '../EnhancedPressable';
import { EnhancedText } from '../EnhancedText';
import { SuccessEffect } from '../SuccessEffect';

export type WizardScreenProps = {
  answered: boolean;
  answeredCorrect: boolean;
};

type WizardProps = {
  // TODO: better type
  fallbackRoute: string;
  screens: ((props: WizardScreenProps) => React.JSX.Element)[];
  screensContainerStyle?: StyleProp<ViewStyle>;
  onFinish: (data: WizardData) => void;
  txButtonLabel?: TxKeyPath;
  txLastScreenButtonLabel?: TxKeyPath;
  onExit?: () => void;
  withExit?: boolean;
};

// TODO: name
const Wizardd = ({
  screens,
  fallbackRoute,
  screensContainerStyle,
  txButtonLabel,
  txLastScreenButtonLabel,
  onFinish,
  onExit,
  withExit = false,
}: WizardProps) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  const {
    data,
    resetData,
    isContinueEnabled,
    onNextScreen,
    nextButtonProps: nextButtonProps,
    setNextButtonProps: updateButtonProps,
  } = useWizard();
  const { playSound } = useSound();

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

  const onExitHandler = useCallback(() => {
    resetData();
    onExit?.();
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
    updateButtonProps({});
  }, [data]);

  // Custom back button behavior
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS === 'web') {
        return;
      }

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

  const isAnswer = nextButtonProps.answer;
  const isCorrect = nextButtonProps.isCorrect;

  useEffect(() => {
    if (isCorrect === true) {
      playSound('correct');
    } else if (isCorrect === false) {
      playSound('incorrect');
    }
  }, [isCorrect]);

  return (
    <View style={{ flex: 1, paddingTop: theme.spacing.md }}>
      <View style={[gStyles.centerRowBetween, styles.headerContainer]}>
        {withExit ? (
          <EnhancedPressable
            disabled={!!isAnswer}
            onPress={onExitHandler}
            style={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.border,
              borderWidth: 1,
              padding: theme.spacing.xxs,
              borderRadius: theme.borderRadius.lg,
            }}>
            <Ionicons name="ios-close-outline" size={24} color={theme.colors.primary} />
          </EnhancedPressable>
        ) : (
          <BackButton onPress={onBackPress} />
        )}
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
            <Screen answered={!!isAnswer} answeredCorrect={!!isCorrect} />
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

      {isAnswer && typeof isCorrect === 'boolean' && (
        <View
          style={{
            position: 'absolute',
            top: '50%',
            alignSelf: 'center',
          }}>
          <SuccessEffect isSuccess={isCorrect} duration={700} />
        </View>
      )}

      <View style={styles.footerContainer}>
        <View
          style={{
            borderRadius: theme.borderRadius.lg,
            gap: theme.spacing.sm,
            padding: isAnswer ? theme.spacing.sm : 0,
            backgroundColor: isAnswer
              ? isCorrect
                ? theme.colors.successBackground
                : theme.colors.errorBackground
              : undefined,
          }}>
          {isAnswer && (
            <>
              <EnhancedText
                preset="subheading"
                tx={isCorrect ? 'learn.amazing' : 'learn.oopsWrong'}
              />
              {!isCorrect && (
                <View style={gStyles.centerRowStart}>
                  <EnhancedText tx="learn.answer" style={theme.typography.sizes.md} />
                  <EnhancedText
                    text=":"
                    style={[theme.typography.sizes.md, { paddingRight: theme.spacing.xxs }]}
                  />
                  <EnhancedText text={nextButtonProps.answer} style={theme.typography.sizes.md} />
                </View>
              )}
            </>
          )}
          <Button
            tx={
              isLastScreen
                ? nextButtonProps.txButtonLabel || txLastScreenButtonLabel || 'common.finish'
                : nextButtonProps.txButtonLabel || txButtonLabel || 'common.continue'
            }
            onPress={
              nextButtonProps.callback ? () => nextButtonProps.callback() : () => onNextPress()
            }
            backgroundColor={
              isAnswer
                ? isCorrect
                  ? theme.colors.success
                  : theme.colors.error
                : theme.colors.secondary300
            }
            disabled={!isContinueEnabled}
          />
        </View>
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
