import React from 'react';
import { View } from 'react-native';

import { Dimensions } from '@/types';
import { useTheme } from '@/ui/theme';

type SeparatorProps = {
  height?: number;
  isVertical?: boolean;
  paddingVertical?: Dimensions[keyof Dimensions] | 0;
};

export function Separator({ height = 1, isVertical = false, paddingVertical = 0 }: SeparatorProps) {
  const { theme } = useTheme();

  return (
    <View style={{ flexDirection: 'row', paddingVertical }}>
      {isVertical ? (
        <View style={{ width: 1, height, backgroundColor: theme.colors.border }} />
      ) : (
        // TODO: new color for border as per mocks ? <View style={{ width: 1, height, backgroundColor: '#F5F5F5' }}></View>
        <View style={{ flex: 1, height, backgroundColor: theme.colors.border }} />
      )}
    </View>
  );
}
