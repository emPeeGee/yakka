import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Svg, Ellipse, G } from 'react-native-svg';

import { Theme } from '@/types';
import { TileCountdownIcon, TileGlobeIcon, TileStarIcon, CheckIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { EnhancedPressable } from './EnhancedPressable';
import { EnhancedText } from './EnhancedText';
import { HeroWithChat } from './hero/HeroWithChat';

// TODO: Conditional types
type TileProps = {
  type: 'globe' | 'countdown' | 'start';
  completed?: boolean;
  withHero?: boolean;
  heroPos?: 'left' | 'right';
  current?: boolean;
  onPress?: () => void;
};

export function Tile({ completed, type, withHero, heroPos, current = false, onPress }: TileProps) {
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();
  const styles = getStyles(theme);

  const mainEllipseColor = current
    ? theme.colors.secondary500
    : completed
      ? theme.colors.primary400
      : theme.colors.base40;
  const shadowEllipseColor = current
    ? theme.colors.secondary500
    : completed
      ? theme.colors.primary700
      : theme.colors.base40;

  const tileWidth = 104;
  const tileHeight = 97;

  const innerSvgWidth = 40;
  const innerSvgHeight = 40;

  const innerSvgX = -innerSvgWidth / 2;
  const innerSvgY = -innerSvgHeight / 2;

  return (
    <View style={[styles.container, gStyles.centerRow, { flexGrow: current ? 1.5 : 1 }]}>
      <View style={[gStyles.centerColumn]}>
        {current && (
          <View style={[styles.tooltip2]}>
            <EnhancedText
              tx="common.start"
              weight="bold"
              style={{ color: theme.colors.secondary400, textTransform: 'uppercase' }}
            />
            <View style={styles.triangle} />
          </View>
        )}
        <View
          style={{
            position: 'relative',
            borderWidth: 6,
            borderRadius: 100,
            padding: 6,
            borderColor: current
              ? theme.colors.secondary700
              : completed
                ? theme.colors.primary700
                : theme.colors.border,
          }}>
          <EnhancedPressable withoutBackground onPress={current || completed ? onPress : undefined}>
            {/* TODO: type pressed should not be wrote explicitly */}
            {({ pressed }: { pressed: boolean }) => (
              <>
                {current && (
                  <View
                    style={{
                      zIndex: -1,
                      position: 'absolute',
                      width: 104,
                      height: 97,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <AnimatedRing />
                  </View>
                )}
                <Svg width="104" height="97" viewBox="0 0 104 97" fill="none">
                  <Ellipse
                    cx="51.7919"
                    cy="52.0112"
                    rx="51.7919"
                    ry="44.9887"
                    fill={shadowEllipseColor}
                  />
                  <Ellipse
                    cx="51.7919"
                    cy={(current || completed) && pressed ? '52.0112' : '44.9887'}
                    rx="51.7919"
                    ry="44.9887"
                    fill={mainEllipseColor}
                  />

                  <G
                    transform={`translate(${tileWidth / 2}, ${tileHeight / 2})`}
                    x={innerSvgX}
                    y={innerSvgY}>
                    {completed ? (
                      <CheckIcon />
                    ) : (
                      <>
                        {type === 'countdown' && <TileCountdownIcon />}
                        {type === 'globe' && <TileGlobeIcon />}
                        {type === 'start' && <TileStarIcon />}
                      </>
                    )}
                  </G>
                </Svg>
              </>
            )}
          </EnhancedPressable>
        </View>
      </View>

      {withHero && (
        <View
          style={[
            gStyles.centerRow,
            styles.hero,
            {
              ...(heroPos === 'left' ? { left: theme.spacing.md } : {}),
              ...(heroPos === 'right' ? { right: theme.spacing.md } : {}),
            },
          ]}>
          <HeroWithChat width={62} height={75} direction={heroPos === 'right' ? 'left' : 'right'} />
        </View>
      )}
    </View>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
    },

    tooltip2: {
      flex: 1,
      marginBottom: theme.spacing.sm,
      alignItems: 'center',
      paddingVertical: theme.spacing.xxxs,
      paddingHorizontal: theme.spacing.xs,
      backgroundColor: theme.colors.background,
      borderWidth: theme.borders.thick,
      borderColor: theme.colors.secondary700,
      borderRadius: theme.borderRadius.lg,
      zIndex: 2,
    },
    triangle: {
      position: 'absolute',
      bottom: -10,
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderLeftWidth: 10,
      borderRightWidth: 10,
      borderBottomWidth: 10,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: theme.colors.secondary700,
      transform: [{ rotate: '180deg' }],
    },

    hero: {
      position: 'absolute',
      top: 0,
      bottom: 0,
    },
  });

const Ring = ({ delay }: { delay: number }) => {
  const { theme } = useTheme();
  const styles = getRingStyles(theme);
  const ring = useSharedValue(0);
  const style = useAnimatedStyle(() => {
    return {
      opacity: 0.8 - ring.value,
      transform: [{ scale: interpolate(ring.value, [0, 1], [0, 4]) }],
    };
  });

  useEffect(() => {
    ring.value = withDelay(delay, withRepeat(withTiming(1, { duration: 6000 }), -1));
  }, []);

  return <Animated.View style={[styles.ring, style]} />;
};

function AnimatedRing() {
  const gStyles = useGlobalThemedStyles();

  return (
    <View style={gStyles.centerRow}>
      <Ring delay={0} />
      <Ring delay={2000} />
      <Ring delay={4000} />
    </View>
  );
}

const getRingStyles = (theme: Theme) =>
  StyleSheet.create({
    ring: {
      position: 'absolute',
      width: 104,
      height: 97,
      borderRadius: 50,
      borderWidth: 10,
      borderColor: theme.colors.secondary700,
    },
  });
