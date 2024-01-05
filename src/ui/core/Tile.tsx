import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { Svg, Ellipse, G } from 'react-native-svg';

import { Theme } from '@/types';
import { TileCountdownIcon, TileGlobeIcon, TileStarIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { EnhancedPressable } from './EnhancedPressable';
import { EnhancedText } from './EnhancedText';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const heroToL = require('../../assets/hero/heroToL.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const heroToR = require('../../assets/hero/heroToR.png');

// TODO: Conditional types
type TileProps = {
  type: 'globe' | 'countdown' | 'start';
  completed?: boolean;
  withHero?: boolean;
  heroPos?: 'left' | 'right';
  current?: boolean;
};

export function Tile({ completed, type, withHero, heroPos, current = false }: TileProps) {
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();
  const styles = getStyles(theme);
  const [currentIndicatorLayout, setCurrentIndicatorLayout] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const mainEllipseColor = completed ? theme.colors.primary400 : theme.colors.secondary;
  const shadowEllipseColor = completed ? theme.colors.primary700 : theme.colors.secondary800;

  const tileWidth = 104;
  const tileHeight = 97;

  const innerSvgWidth = 40;
  const innerSvgHeight = 40;

  const innerSvgX = -innerSvgWidth / 2;
  const innerSvgY = -innerSvgHeight / 2;

  return (
    <View style={[styles.container, gStyles.centerRow]}>
      {current && (
        <View
          onLayout={e => {
            setCurrentIndicatorLayout({
              height: e.nativeEvent.layout.height,
              width: e.nativeEvent.layout.width,
            });
          }}
          style={[
            {
              position: 'absolute',
              // 10 is the triangle height
              top: currentIndicatorLayout
                ? -currentIndicatorLayout.height - (10 - theme.borders.thick)
                : 0,
            },
            styles.tooltip,
          ]}>
          <EnhancedText weight="700" style={{ color: theme.colors.primary400 }}>
            START
          </EnhancedText>
          <View style={styles.triangle} />
        </View>
      )}
      <EnhancedPressable withoutBackground>
        <Svg width="104" height="97" viewBox="0 0 104 97" fill="none">
          <Ellipse cx="51.7919" cy="52.0112" rx="51.7919" ry="44.9887" fill={shadowEllipseColor} />
          <Ellipse cx="51.7919" cy="44.9887" rx="51.7919" ry="44.9887" fill={mainEllipseColor} />

          <G
            transform={`translate(${tileWidth / 2}, ${tileHeight / 2})`}
            x={innerSvgX}
            y={innerSvgY}>
            {type === 'countdown' && <TileCountdownIcon />}
            {type === 'globe' && <TileGlobeIcon />}
            {type === 'start' && <TileStarIcon />}
          </G>
        </Svg>
      </EnhancedPressable>

      {withHero && (
        <View
          style={[
            gStyles.centerRow,
            styles.hero,
            {
              ...(heroPos === 'left' ? { left: 0 } : {}),
              ...(heroPos === 'right' ? { right: 0 } : {}),
            },
          ]}>
          <Image
            source={heroPos === 'right' ? heroToL : heroToR}
            style={{ width: 140, height: 140 }}
          />
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
    tooltip: {
      alignItems: 'center',
      paddingVertical: 2,
      paddingHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.background,
      borderWidth: theme.borders.thick,
      borderColor: theme.colors.primary400,
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
      borderBottomColor: theme.colors.primary,
      transform: [{ rotate: '180deg' }],
    },

    hero: {
      position: 'absolute',
      top: 0,
      bottom: 0,
    },
  });
