import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BackButton } from '@/ui/core';
import { OnboardGetStartedScreen } from '../screens/onboarding/OnboardGetStartedScreen';
import { OnboardIntroScreen } from '../screens/onboarding/OnboardIntroScreen';
import { OnboardQuestionsScreen } from '../screens/onboarding/OnboardQuestionsScreen';

const Stack = createNativeStackNavigator();

export const OnboardNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="OnboardQuestions">
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: () => null,
          headerBackVisible: false,
          // contentStyle: { paddingHorizontal: theme.spacing.lg },
          headerLeft: props => <BackButton {...props} />,
        }}>
        {/* TODO: route name consistency */}
        <Stack.Screen name="OnboardIntro" component={OnboardIntroScreen} />
        <Stack.Screen
          name="OnboardGetStarted"
          component={OnboardGetStartedScreen}
          options={{ headerLeft: () => null }}
        />
        <Stack.Screen
          name="OnboardQuestions"
          component={OnboardQuestionsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
