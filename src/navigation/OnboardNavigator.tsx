import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ONBOARD_DATA_KEY } from '@/core/constants';
import { useFirstLaunch } from '@/core/providers';
import { getItem } from '@/core/storage';
import { BackButton, ContainerWithInsets } from '@/ui/core';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { OnboardGetStartedScreen } from '../screens/onboarding/OnboardGetStartedScreen';
import { OnboardIntroScreen } from '../screens/onboarding/OnboardIntroScreen';
import { OnboardQuestionsDoneScreen } from '../screens/onboarding/OnboardQuestionsDoneScreen';
import { OnboardQuestionsScreen } from '../screens/onboarding/OnboardQuestionsScreen';

const Stack = createNativeStackNavigator();

export const OnboardNavigator = () => {
  const { isFirstLaunch } = useFirstLaunch();
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getItem(ONBOARD_DATA_KEY).then(onboardData => {
      if (isFirstLaunch) {
        setInitialRoute('OnboardIntro');
      } else if (!onboardData) {
        setInitialRoute('OnboardGetStarted');
      } else {
        setInitialRoute('AuthLogin');
      }

      // TODO: remove timeout
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    });
  });

  if (isLoading && initialRoute) {
    return (
      <ContainerWithInsets>
        <ActivityIndicator size="large"></ActivityIndicator>
      </ContainerWithInsets>
    );
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute as string}>
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: () => null,
          headerBackVisible: false,
          headerLeft: props => <BackButton {...props} />,
        }}>
        <Stack.Screen
          name="OnboardIntro"
          component={OnboardIntroScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardGetStarted"
          component={OnboardGetStartedScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardQuestions"
          component={OnboardQuestionsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardQuestionsDone"
          component={OnboardQuestionsDoneScreen}
          options={{ headerShown: false }}
        />
        {/* TODO: Auth doesn't fit well here  */}
        <Stack.Screen name="AuthLogin" component={LoginScreen} options={{ headerShown: false }} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
