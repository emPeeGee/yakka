import { useEffect, useState } from 'react';
import { Platform, ScrollView, ScrollViewProps, View, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { TxKeyPath } from '@/core/i18n';
import { rootLog } from '@/core/logger';
import { noop } from '@/core/utils';
import { Theme } from '@/types';
import {
  EnhancedText,
  HeroWithChat,
  ChoiceGroup,
  HeaderPlaceholder,
  Wizard,
  Separator,
  Choice,
  ContainerWithInsets,
  useWizard,
} from '@/ui/core';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

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

function Question<T>({ options, txTitle }: { options: Choice<T>[]; txTitle: TxKeyPath }) {
  const [answer, setAnswer] = useState<T | null>(null);
  const { theme } = useTheme();
  const { setIsContinueEnabled, setOnNextScreen } = useWizard();

  useEffect(() => {
    rootLog.debug('setOnScreen CALLLLL');
    setOnNextScreen(() => {
      rootLog.error('callled');
      setIsContinueEnabled(false, noop);
    });

    // setOnNextScreen(() => {
    //   return () => {
    //     rootLog.error('callled');
    //     setIsContinueEnabled(false, noop);
    //   };
    // });

    return () => {
      rootLog.error('DONE. question X answered with: ', answer);
    };
  }, []);

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
            setIsContinueEnabled(!!value, noop);
          }}
        />
      </EnhancedScrollView>
    </View>
  );
}

const OnboardKnowAboutScreen = () => (
  <Question
    txTitle="onboard.knowAbout"
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
  />
);

const OnboardLangScreen = () => (
  <Question
    txTitle="onboard.lang"
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
  />
);

const OnboardHowMuchEngScreen = () => (
  <Question
    txTitle="onboard.engYouKnow"
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
  />
);

const OnboardAchieveScreen = () => {
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();
  const { setIsContinueEnabled, setOnNextScreen } = useWizard();

  useEffect(() => {
    rootLog.debug('setOnScreen CALLLLL');
    setOnNextScreen(() => {
      rootLog.error('TRUUUUUUUUUUUUUUUUUUUUUe');
      setIsContinueEnabled(true, noop);
    });
  }, []);

  return (
    <View style={[{ width: '100%', flex: 1, flexDirection: 'column' }]}>
      <View
        style={{
          width: '100%',
          paddingHorizontal: theme.spacing.xs,
        }}>
        <HeroWithChat tx="onboard.engYouKnow" />
      </View>

      <Separator height={theme.borders.medium} />

      <EnhancedScrollView>
        <View
          style={[
            gStyles.centerColumn,
            {
              marginHorizontal: theme.spacing.sm,
              marginVertical: theme.spacing.xs,
              paddingVertical: theme.spacing.lg,
              paddingHorizontal: theme.spacing.xs,
              gap: theme.spacing.md,
              borderWidth: theme.borders.medium,
              borderColor: theme.colors.border,
              borderRadius: theme.borderRadius.xl,
            },
          ]}>
          <View style={gStyles.centerRow}>
            <Image
              source={require('../../assets/hero/heroToR.png')}
              style={{
                width: 100,
                height: 100,
              }}
            />
            <View style={[gStyles.fullWidthFromStart]}>
              <EnhancedText tx="onboard.thisIsSpeak1" size="md" />
              <EnhancedText tx="onboard.thisIsSpeak2" style={{ color: theme.colors.textSec }} />
            </View>
          </View>

          <View style={gStyles.centerRow}>
            <Image
              source={require('../../assets/hero/heroToR.png')}
              style={{
                width: 100,
                height: 100,
              }}
            />
            <View style={[gStyles.fullWidthFromStart]}>
              <EnhancedText tx="onboard.thisIsVoc1" size="md" />
              <EnhancedText tx="onboard.thisIsVoc2" style={{ color: theme.colors.textSec }} />
            </View>
          </View>

          <View style={gStyles.centerRow}>
            <Image
              source={require('../../assets/hero/heroToR.png')}
              style={{
                width: 100,
                height: 100,
              }}
            />
            <View style={[gStyles.fullWidthFromStart]}>
              <EnhancedText tx="onboard.thisIsCul1" size="md" />
              <EnhancedText tx="onboard.thisIsCul2" style={{ color: theme.colors.textSec }} />
            </View>
          </View>
        </View>
      </EnhancedScrollView>
    </View>
  );
};

const OnboardReasonScreen = () => (
  <Question
    txTitle="onboard.why"
    options={[
      {
        tx: 'onboard.why1',
        value: 'fun',
        Left: () => <EnhancedText size="md">🤪</EnhancedText>,
      },
      {
        tx: 'onboard.why2',
        value: 'career',
        Left: () => <EnhancedText size="md">💼</EnhancedText>,
      },
      {
        tx: 'onboard.why3',
        value: 'education',
        Left: () => <EnhancedText size="md">🎓</EnhancedText>,
      },
      {
        tx: 'onboard.why4',
        value: 'vacation',
        Left: () => <EnhancedText size="md">🗺</EnhancedText>,
      },
      {
        tx: 'onboard.why5',
        value: 'other',
        Left: () => <EnhancedText size="md">🧩</EnhancedText>,
      },
    ]}
  />
);

const OnboardTimeScreen = (theme: Theme) => (
  <Question
    txTitle="onboard.time"
    options={[
      {
        tx: 'onboard.time1',
        value: 5,
        Right: () => (
          <EnhancedText size="md" tx="onboard.time1Att" style={{ color: theme.colors.textSec }} />
        ),
      },
      {
        tx: 'onboard.time2',
        value: 10,
        Right: () => (
          <EnhancedText size="md" tx="onboard.time2Att" style={{ color: theme.colors.textSec }} />
        ),
      },
      {
        tx: 'onboard.time3',
        value: 15,
        Right: () => (
          <EnhancedText size="md" tx="onboard.time3Att" style={{ color: theme.colors.textSec }} />
        ),
      },
      {
        tx: 'onboard.time4',
        value: 30,
        Right: () => (
          <EnhancedText size="md" tx="onboard.time4Att" style={{ color: theme.colors.textSec }} />
        ),
      },
      {
        tx: 'onboard.time5',
        value: 60,
        Right: () => (
          <EnhancedText size="md" tx="onboard.time5Att" style={{ color: theme.colors.textSec }} />
        ),
      },
    ]}
  />
);

export const OnboardQuestionsScreen = () => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();

  return (
    <ContainerWithInsets>
      <HeaderPlaceholder />
      <Wizard
        fallbackRoute="OnboardGetStarted"
        screensContainerStyle={{ paddingHorizontal: 0 }}
        screens={[
          OnboardLangScreen,
          OnboardKnowAboutScreen,
          OnboardHowMuchEngScreen,
          OnboardReasonScreen,
          OnboardAchieveScreen,
          () => OnboardTimeScreen(theme),
        ]}
        onFinish={() => {
          navigate('OnboardQuestionsDone' as never);
          rootLog.info('OnboardingQuestions onFinish pressed');
        }}
      />
    </ContainerWithInsets>
  );
};
