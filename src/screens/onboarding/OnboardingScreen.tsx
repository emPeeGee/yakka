import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { onboardLog } from '@/core/logger';
import { useFirstLaunch } from '@/core/providers';
import { Theme } from '@/types';
import { SwiperDataItem, Swiper } from '@/ui/core';
import { useTheme } from '@/ui/theme';

export const onboardingItems: SwiperDataItem[] = [
  {
    id: 1,
    image: require('../../assets/onboarding1.png'),
    title: 'Confidence in your words',
    text: "With conversation-based learning, you'll be talking from lesson one.",
  },
  {
    id: 2,
    image: require('../../assets/onboarding2.png'),
    title: 'Take your time to learn',
    text: 'Develop a habit of learning and make it a part of your daily routine',
  },
  {
    id: 3,
    image: require('../../assets/onboarding3.png'),
    title: 'The lessons you need to learn',
    text: 'Using a variety of learning styles to learn and retain',
  },
];

export const ConfidenceScreen = () => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { setIsFirstLaunch } = useFirstLaunch();

  const onFinish = () => {
    setIsFirstLaunch(false);
    onboardLog.info('Onboarding finished');
  };

  // TODO: Log in button in onboarding

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      <Swiper items={onboardingItems} onFinish={onFinish} />

      {/* <ConfidenceSvg />
      <EnhancedText></EnhancedText>
      <EnhancedText></EnhancedText>
      <View style={{ flexDirection: 'row' }}>
        <Button title="Choose a language" backgroundColor="#5B7BFE" />
      </View>
      <EnhancedText></EnhancedText> */}
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    itemContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    itemTitle: {
      color: theme.colors.textPri,
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    itemText: {
      color: theme.colors.textPri,
      textAlign: 'center',
      lineHeight: 20,
      marginHorizontal: 30,
    },
    footerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: 20,
    },
  });
