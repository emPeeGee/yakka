import React from 'react';
import { Image, View } from 'react-native';

import { Svg, Ellipse, G } from 'react-native-svg';

import { TileCountdownIcon, TileGlobeIcon, TileStarIcon } from '@/ui/icons';
import { useTheme } from '@/ui/theme';
import { EnhancedPressable } from './EnhancedPressable';

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
};

export function Tile({ completed, type, withHero, heroPos }: TileProps) {
  const { theme } = useTheme();

  const mainEllipseColor = completed ? theme.colors.primary : theme.colors.secondary;
  const shadowEllipseColor = completed ? theme.colors.primary800 : theme.colors.secondary800;

  const tileWidth = 104;
  const tileHeight = 97;

  const innerSvgWidth = 40;
  const innerSvgHeight = 40;

  const innerSvgX = -innerSvgWidth / 2;
  const innerSvgY = -innerSvgHeight / 2;

  return (
    <View
      style={{
        position: 'relative',
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
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
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            ...(heroPos === 'left' ? { left: 0 } : {}),
            ...(heroPos === 'right' ? { right: 0 } : {}),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={heroPos === 'right' ? heroToL : heroToR}
            style={{ width: 140, height: 140 }}
          />
        </View>
      )}
    </View>
  );
}
