import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useFirstLaunch } from '@/core/providers';
import { BackButton } from '@/ui/core';
import { OnboardGetStartedScreen } from '../screens/onboarding/OnboardGetStartedScreen';
import { OnboardIntroScreen } from '../screens/onboarding/OnboardIntroScreen';
import { OnboardQuestionsDoneScreen } from '../screens/onboarding/OnboardQuestionsDoneScreen';
import { OnboardQuestionsScreen } from '../screens/onboarding/OnboardQuestionsScreen';

const Stack = createNativeStackNavigator();

export const OnboardNavigator = () => {
  const { isFirstLaunch } = useFirstLaunch();

  return (
    <Stack.Navigator initialRouteName={isFirstLaunch ? 'OnboardIntro' : 'OnboardGetStarted'}>
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
      </Stack.Group>
    </Stack.Navigator>
  );
};
