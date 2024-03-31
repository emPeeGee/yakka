import React, { useState } from 'react';
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

import { TxKeyPath } from '@/core/i18n';
import { Theme } from '@/types';
import { BackButton, EnhancedText } from '@/ui/core';
import { useTheme } from '@/ui/theme';

const HEADER_HEIGHT = 64;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent' },
    headerContainer: {
      height: HEADER_HEIGHT,
    },
    title: {
      letterSpacing: 0.011,
      fontWeight: '700',
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

type ExploreHeaderProps = {
  title: TxKeyPath;
  titleStyle?: StyleProp<any>;
  headlineStyle?: StyleProp<TextStyle>;
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  headerContainerStyle?: StyleProp<ViewStyle>;
  headerComponentContainerStyle?: StyleProp<ViewStyle>;
  scrollContainerStyle?: StyleProp<ViewStyle>;
  scrollViewProps?: ScrollViewProps;
  withBackButton?: boolean;
};

export function ExploreHeader({
  title,
  titleStyle,
  headlineStyle,
  children,
  containerStyle,
  headerContainerStyle,
  headerComponentContainerStyle,
  scrollContainerStyle,
  scrollViewProps = {},
  withBackButton = false,
}: ExploreHeaderProps) {
  const { theme } = useTheme();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [headerY, setHeaderY] = useState(0);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const styles = getStyles(theme);

  const fontSize = titleStyle?.fontSize || 34;
  const titleStyles = {
    fontSize,
    lineHeight: fontSize * 1.2,
  };

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

  const opacityHeaderAnimation = scrollAnimatedValue.interpolate({
    inputRange: [0, headerHeight / 2, headerHeight / 1.5, headerHeight],
    outputRange: [0, 0.05, 0.1, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View style={[styles.headerContainer, headerContainerStyle]}>
        <Animated.View style={{ opacity: opacityHeaderAnimation }}>
          <View style={[styles.headerComponentContainer, headerComponentContainerStyle]}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {withBackButton && <BackButton />}
              <View style={{ flex: 1, alignItems: 'center' }}>
                <EnhancedText
                  preset="subheading"
                  style={[styles.headline, headlineStyle]}
                  tx={title}
                />
              </View>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
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
            gap: theme.spacing.md,
            paddingHorizontal: theme.spacing.md,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {withBackButton && <BackButton />}
          <EnhancedText tx={title} style={[styles.title, titleStyle, titleStyles]} />
        </View>
        {children}
      </ScrollView>
    </View>
  );
}
