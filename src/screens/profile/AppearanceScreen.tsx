import React, { useState } from 'react';
import { View } from 'react-native';

import { COLOR_SCHEME_OPTIONS } from '@/core/constants';
import { RadioGroup, EnhancedText, HeaderPlaceholder } from '@/ui/core';
import { useTheme } from '@/ui/theme';

export const AppearanceScreen = () => {
  const { setColorScheme, userColorScheme } = useTheme();
  const [selected, setSelected] = useState(userColorScheme);

  return (
    <View>
      <HeaderPlaceholder />

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
