import { useState } from 'react';
import { Platform, ScrollView, ScrollViewProps, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TxKeyPath } from '@/core/i18n';
import { rootLog } from '@/core/logger';
import {
  EnhancedText,
  HeroWithChat,
  ChoiceGroup,
  HeaderPlaceholder,
  Wizard,
  Separator,
} from '@/ui/core';
import { useTheme } from '@/ui/theme';

type EnhancedScrollViewProps = {
  children?: React.ReactNode;
} & ScrollViewProps;

const EnhancedScrollView = ({ children, ...props }: EnhancedScrollViewProps) => {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={{ height: '100%', paddingHorizontal: theme.spacing.xs }}
      contentContainerStyle={{ paddingVertical: theme.spacing.sm }}
      {...props}>
      {children}
    </ScrollView>
  );
};

function Question<T>({ options, txTitle }: { options: any; txTitle: TxKeyPath }) {
  const [answer, setAnswer] = useState<T | null>(null);
  const { theme } = useTheme();

  return (
    <View style={[{ width: '100%', flex: 1, flexDirection: 'column' }]}>
      <View
        style={{
          width: '100%',
          paddingHorizontal: theme.spacing.xs,
        }}>
        <HeroWithChat tx={txTitle} />
      </View>

      <Separator height={theme.borders.medium} />

      <EnhancedScrollView>
        <ChoiceGroup
          options={options}
          value={answer}
          onChange={(value): void => {
            setAnswer(value);
          }}
        />
      </EnhancedScrollView>
    </View>
  );
}

const OnboardKnowAboutScreen = () => {
  const [knowAbout, setKnowAbout] = useState('en');
  const { theme } = useTheme();

  return (
    <View style={[{ width: '100%', flex: 1, flexDirection: 'column' }]}>
      <View
        style={{
          width: '100%',
          paddingHorizontal: theme.spacing.xs,
        }}>
        <HeroWithChat tx="onboard.knowAbout" />
      </View>

      <Separator height={theme.borders.medium} />

      <EnhancedScrollView>
        <ChoiceGroup
          options={[
            {
              tx: 'universal.tiktok',
              value: 'tiktok',
              Left: () => <EnhancedText size="md">🦁</EnhancedText>,
            },
            {
              tx: 'universal.google',
              value: 'google',
              Left: () => <EnhancedText size="md">🐯</EnhancedText>,
            },
            {
              tx: 'universal.facebook',
              value: 'facebook',
              Left: () => <EnhancedText size="md">🐧</EnhancedText>,
            },
            {
              tx:
                Platform.OS === 'ios'
                  ? 'universal.appStore'
                  : Platform.OS === 'android'
                    ? 'universal.playMarket'
                    : 'universal.web',
              value: 'store',
              Left: () => <EnhancedText size="md">🐺</EnhancedText>,
            },
            {
              tx: 'universal.recommendation',
              value: 'recommendation',
              Left: () => <EnhancedText size="md">🦝</EnhancedText>,
            },
            {
              tx: 'universal.other',
              value: 'other',
              Left: () => <EnhancedText size="md">🦊</EnhancedText>,
            },
          ]}
          value={knowAbout}
          onChange={(value: string): void => {
            setKnowAbout(value);
          }}
        />
      </EnhancedScrollView>
    </View>
  );
};

const OnboardLangScreen = () => {
  const [lang, setLang] = useState('en');
  const { theme } = useTheme();

  return (
    <View style={[{ width: '100%', flex: 1, flexDirection: 'column', gap: theme.spacing.lg }]}>
      <View
        style={{
          width: '100%',
          paddingHorizontal: theme.spacing.xs,
        }}>
        <HeroWithChat tx="onboard.lang" />
      </View>

      <Separator height={theme.borders.medium} />

      <EnhancedScrollView>
        <ChoiceGroup
          options={[
            {
              tx: 'common.english',
              value: 'en',
              Left: () => <EnhancedText size="md">🇬🇧</EnhancedText>,
            },
            {
              tx: 'common.romanian',
              value: 'ro',
              Left: () => <EnhancedText size="md">🇷🇴</EnhancedText>,
            },
          ]}
          value={lang}
          onChange={(value: string): void => {
            setLang(value);
          }}
        />
      </EnhancedScrollView>
    </View>
  );
};

const OnboardHowMuchEngScreen = () => {
  const [level, setLevel] = useState(1);
  const { theme } = useTheme();

  return (
    <View style={[{ width: '100%', flex: 1, flexDirection: 'column', gap: theme.spacing.lg }]}>
      <View
        style={{
          width: '100%',
          paddingHorizontal: theme.spacing.xs,
        }}>
        <HeroWithChat tx="onboard.engYouKnow" />
      </View>

      <Separator height={theme.borders.medium} />

      <EnhancedScrollView>
        <ChoiceGroup
          options={[
            {
              tx: 'onboard.engYouKnow1',
              value: 1,
              Left: () => <EnhancedText size="md">🪫</EnhancedText>,
            },
            {
              tx: 'onboard.engYouKnow2',
              value: 2,
              Left: () => <EnhancedText size="md">🪫</EnhancedText>,
            },
            {
              tx: 'onboard.engYouKnow3',
              value: 3,
              Left: () => <EnhancedText size="md">🔋</EnhancedText>,
            },
            {
              tx: 'onboard.engYouKnow4',
              value: 4,
              Left: () => <EnhancedText size="md">🔋</EnhancedText>,
            },
          ]}
          value={level}
          onChange={(value: number): void => {
            setLevel(value);
          }}
        />
      </EnhancedScrollView>
    </View>
  );
};

export const OnboardQuestionsScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      <HeaderPlaceholder />

      <Wizard
        fallbackRoute="OnboardGetStarted"
        screensContainerStyle={{ paddingHorizontal: 0 }}
        screens={[
          OnboardLangScreen,
          OnboardKnowAboutScreen,
          OnboardHowMuchEngScreen,
          () => (
            <Question
              options={[
                {
                  tx: 'common.english',
                  value: 5,
                  Left: () => <EnhancedText size="md">🇬🇧</EnhancedText>,
                },
                {
                  tx: 'common.romanian',
                  value: 10,
                  Left: () => <EnhancedText size="md">🇷🇴</EnhancedText>,
                },
              ]}
              txTitle="onboard.time1"
            />
          ),
        ]}
        onFinish={() => {
          rootLog.info('Wizard on finish');
        }}
      />
    </View>
  );
};
