import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { onboardLog } from '@/core/logger';
import { useFirstLaunch } from '@/core/providers';
import { SwiperDataItem, Swiper, ContainerWithInsets } from '@/ui/core';
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

export const OnboardIntroScreen = () => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  const { setIsFirstLaunch } = useFirstLaunch();

  const onFinish = () => {
    onboardLog.info('Onboarding finished');
    setIsFirstLaunch(false);
    navigate('OnboardGetStarted' as never);
  };

  return (
    <ContainerWithInsets backgroundColor={theme.colors.background}>
      <Swiper items={onboardingItems} onFinish={onFinish} />
    </ContainerWithInsets>
  );
};
