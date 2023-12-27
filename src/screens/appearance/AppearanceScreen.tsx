import React, { useState } from 'react';
import { View } from 'react-native';

import { useHeaderHeight } from '@react-navigation/elements';

import { COLOR_SCHEME_OPTIONS } from '@/core/constants';
import { RadioGroup, EnhancedText } from '@/ui/core';
import { useTheme } from '@/ui/theme';

export const AppearanceScreen = () => {
  const { setColorScheme, userColorScheme } = useTheme();
  const [selected, setSelected] = useState(userColorScheme);
  const headerHeight = useHeaderHeight();

  return (
    <View>
      <View style={{ height: headerHeight }} />

      <View>
        <RadioGroup
          label="Favorite avatar"
          options={COLOR_SCHEME_OPTIONS}
          value={selected}
          onChange={selected => {
            setColorScheme(selected);
            setSelected(selected);
          }}
        />
      </View>
      <EnhancedText>You have selected: {selected}</EnhancedText>
    </View>
  );
};
