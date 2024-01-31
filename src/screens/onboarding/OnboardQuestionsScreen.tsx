import { useState } from 'react';
import { Platform, ScrollView, ScrollViewProps, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

// const OnboardHowMuchEngScreen = () => {
//   const [lang, setLang] = useState('en');
//   const { theme } = useTheme();

//   return (
//     <View style={[{ width: '100%', flex: 1, flexDirection: 'column', gap: theme.spacing.lg }]}>
//       <View
//         style={{
//           width: '100%',
//           paddingHorizontal: theme.spacing.xs,
//         }}>
//         <HeroWithChat tx="onboard.engYouKnow" />
//       </View>

//       <Separator height={theme.borders.medium} />

//       <EnhancedScrollView>
//         <ChoiceGroup
//           options={[
//             {
//               label: '',
//               value: 'en',
//               Left: () => <EnhancedText size="md">🇬🇧</EnhancedText>,
//             },
//             {
//               label: 'Romanian',
//               value: 'ro',
//               Left: () => <EnhancedText size="md">🇷🇴</EnhancedText>,
//             },
//           ]}
//           value={lang}
//           onChange={(value: string): void => {
//             setLang(value);
//           }}
//         />
//       </EnhancedScrollView>
//     </View>
//   );
// };

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
        screens={[OnboardLangScreen, OnboardKnowAboutScreen]}
        onFinish={() => {
          rootLog.info('Wizard on finish');
        }}
      />
    </View>
  );
};
