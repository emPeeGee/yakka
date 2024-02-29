import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { TxKeyPath, translate } from '@/core/i18n';
import { Choice, ChoiceGroup, ContainerWithInsets, Emoji } from '@/ui/core';
import { HeaderScrollView } from './Header';

export const TENSES: Choice<{ content: string; title: TxKeyPath }>[] = [
  {
    value: { content: 'test.md', title: 'exp.presentSimple' },
    tx: 'exp.presentSimple',
    Left: () => <Emoji emoji="🙂" />,
  },
  {
    value: { content: './presentSimple.md', title: 'exp.presentContinuous' },
    tx: 'exp.presentContinuous',
    Left: () => <Emoji emoji="🏃‍♂️" />,
  },
  {
    value: { content: './presentSimple.md', title: 'exp.presentPerfect' },
    tx: 'exp.presentPerfect',
    Left: () => <Emoji emoji="🎁" />,
  },
  {
    value: { content: './presentSimple.md', title: 'exp.presentPerfectContinuous' },
    tx: 'exp.presentPerfectContinuous',
    Left: () => <Emoji emoji="🌱" />,
  },

  {
    value: { content: './presentSimple.md', title: 'exp.pastSimple' },
    tx: 'exp.pastSimple',
    Left: () => <Emoji emoji="🕰️" />,
  },
  {
    value: { content: './presentSimple.md', title: 'exp.pastContinuous' },
    tx: 'exp.pastContinuous',
    Left: () => <Emoji emoji="🚶‍♀️" />,
  },
  {
    value: { content: './presentSimple.md', title: 'exp.pastPerfect' },
    tx: 'exp.pastPerfect',
    Left: () => <Emoji emoji="🚪" />,
  },
  {
    value: { content: './presentSimple.md', title: 'exp.pastPerfectContinuous' },
    tx: 'exp.pastPerfectContinuous',
    Left: () => <Emoji emoji="🛣️" />,
  },

  {
    value: { content: './presentSimple.md', title: 'exp.futureSimple' },
    tx: 'exp.futureSimple',
    Left: () => <Emoji emoji="🎯" />,
  },
  {
    value: { content: './presentSimple.md', title: 'exp.futureContinuous' },
    tx: 'exp.futureContinuous',
    Left: () => <Emoji emoji="🌧️" />,
  },
  {
    value: { content: './presentSimple.md', title: 'exp.futurePerfect' },
    tx: 'exp.futurePerfect',
    Left: () => <Emoji emoji="🌅" />,
  },
  {
    value: { content: './presentSimple.md', title: 'exp.futurePerfectContinuous' },
    tx: 'exp.futurePerfectContinuous',
    Left: () => <Emoji emoji="🏖️" />,
  },
];

export const ExpBasicTensesScreen = () => {
  const { navigate } = useNavigation();

  return (
    <ContainerWithInsets withoutBottom>
      <HeaderScrollView title={translate('exp.12basicTenses')}>
        <ChoiceGroup
          options={TENSES}
          onChange={({ content, title }) => {
            setTimeout(() => {
              navigate('ExpContent' as never, { content, title } as never);
            });
          }}
        />
      </HeaderScrollView>
    </ContainerWithInsets>
  );
};
