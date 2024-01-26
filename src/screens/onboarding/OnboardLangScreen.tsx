import { useState } from 'react';
import { View } from 'react-native';

import { EnhancedText, HeroWithChat, ChoiceGroup } from '@/ui/core';

export const OnboardLangScreen = () => {
  const [lang, setLang] = useState('en');

  return (
    <View>
      <HeroWithChat tx="onboard.lang" />

      <ChoiceGroup
        options={[
          {
            label: 'English',
            value: 'en',
            Left: () => <EnhancedText size="xl">🇬🇧</EnhancedText>,
          },
          {
            label: 'Romanian',
            value: 'ro',
            Left: () => <EnhancedText size="md">🇷🇴</EnhancedText>,
          },
        ]}
        value={lang}
        onChange={(value: string): void => {
          setLang(value);
        }}
      />
    </View>
  );
};
