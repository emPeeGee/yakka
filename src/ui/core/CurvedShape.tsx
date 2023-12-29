import React from 'react';
import { View } from 'react-native';

import { Path, Svg } from 'react-native-svg';

import { useTheme } from '@/ui/theme';

export function CurvedShape() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}>
      <Svg
        width="100%"
        height="276"
        viewBox="0 0 375 276"
        preserveAspectRatio="xMinYMin slice"
        fill="none">
        <Path
          d="M199.81 125.92C321.578 132.028 389.543 78.392 408.304 50.8105L464.252 -71.1497C418.522 -66.6995 305.335 -65.9644 218.428 -98.6253C109.793 -139.451 45.3276 -145.631 -120.477 -111.942C-253.121 -84.9906 -244.976 132.779 -224.324 238.295L-9.88153 275.653C9.27883 223.197 78.0416 119.812 199.81 125.92Z"
          fill={theme.colors.primary600}
        />
      </Svg>
    </View>
  );
}
