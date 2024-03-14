import React, { useMemo, useState } from 'react';
import {
  View,
  ScrollView,
  Animated,
  StyleSheet,
  LayoutChangeEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
  ScrollViewProps,
} from 'react-native';

import { Theme } from '@/types';
import { EnhancedText, Fade } from '@/ui/core';
import { BalloonIcon, LightningIcon, HeartIcon } from '@/ui/icons';
import { useTheme } from '@/ui/theme';

const HEADER_HEIGHT = 64;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent' },
    headerContainer: {
      height: HEADER_HEIGHT,
      backgroundColor: theme.colors.primary500,
    },
    headerComponentContainer: {
      height: HEADER_HEIGHT,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.background,
      borderBottomWidth: theme.borders.medium,
      borderBottomColor: theme.colors.border,
    },
    headline: {
      fontWeight: '500',
      letterSpacing: 0.019,
    },
    statContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
  });

type LearnHeaderProps = {
  headlineStyle: StyleProp<TextStyle>;
  children: React.ReactNode;
  containerStyle: StyleProp<ViewStyle>;
  headerContainerStyle: StyleProp<ViewStyle>;
  headerComponentContainerStyle: StyleProp<ViewStyle>;
  scrollContainerStyle: StyleProp<ViewStyle>;
  fadeDirection: string;
  scrollViewProps: ScrollViewProps;
  stats: { balloons: number; xp: number; lives: number };
};

export function LearnHeader({
  headlineStyle,
  children,
  containerStyle,
  headerContainerStyle,
  headerComponentContainerStyle,
  scrollContainerStyle,
  fadeDirection,
  scrollViewProps = {},
  stats,
}: LearnHeaderProps) {
  const { theme } = useTheme();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [headerY, setHeaderY] = useState(0);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const styles = getStyles(theme);

  const onLayout = (event: LayoutChangeEvent) => {
    setHeaderHeight(event.nativeEvent.layout.height);
    setHeaderY(event.nativeEvent.layout.y);
  };

  const scrollAnimatedValue = new Animated.Value(0);

  const handleScroll = (event: any) => {
    const offset = event.nativeEvent.contentOffset.y;
    const scrollHeaderOffset = headerHeight + headerY - 8;
    const isHeaderScrolled2 = scrollHeaderOffset < offset;

    if (!isHeaderScrolled && isHeaderScrolled2) {
      setIsHeaderScrolled(isHeaderScrolled2);
    }

    if (isHeaderScrolled && !isHeaderScrolled2) {
      setIsHeaderScrolled(isHeaderScrolled2);
    }
  };

  const username = 'Mihail';

  const statsComponent = useMemo(
    () => (
      <>
        <View style={styles.statContainer}>
          <BalloonIcon />
          <EnhancedText weight="medium" size="md" style={[styles.headline, headlineStyle]}>
            {stats.balloons}
          </EnhancedText>
        </View>
        <View style={styles.statContainer}>
          <LightningIcon />
          <EnhancedText weight="medium" size="md" style={[styles.headline, headlineStyle]}>
            {stats.xp}
          </EnhancedText>
        </View>
        <View style={styles.statContainer}>
          <HeartIcon fill={theme.colors.chilly} />
          <EnhancedText weight="medium" size="md" style={[styles.headline, headlineStyle]}>
            {stats.lives}
          </EnhancedText>
        </View>
      </>
    ),
    [stats],
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.headerContainer, headerContainerStyle]}>
        <Fade visible={isHeaderScrolled} direction={fadeDirection}>
          <View style={[styles.headerComponentContainer, headerComponentContainerStyle]}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {statsComponent}
            </View>
          </View>
        </Fade>
      </View>
      <ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollAnimatedValue } } }], {
          listener: handleScroll,
          useNativeDriver: false,
        })}
        scrollEventThrottle={16}
        contentContainerStyle={[scrollContainerStyle]}
        {...scrollViewProps}>
        <View
          onLayout={onLayout}
          style={{
            backgroundColor: theme.colors.primary500,
            gap: theme.spacing.md,
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}>
          <View style={{ paddingHorizontal: theme.spacing.md }}>
            <EnhancedText
              size="xl"
              tx="learn.greeting"
              weight="medium"
              txOptions={{ name: username || 'Mate' }}
              style={{ color: theme.colors.base0 }}
            />
            <EnhancedText size="lg" tx="learn.wouldLearn" style={{ color: theme.colors.base0 }} />
          </View>

          <View
            style={{
              width: '100%',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: theme.colors.background,
              padding: theme.spacing.md,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              borderBottomWidth: theme.borders.medium,
              borderBottomColor: theme.colors.border,
            }}>
            {statsComponent}
          </View>
        </View>
        {children}
      </ScrollView>
    </View>
  );
}
