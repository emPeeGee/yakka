import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BackButton } from '@/ui/core';
import { useTheme } from '@/ui/theme';
import { OnboardGetStartedScreen } from '../screens/onboarding/OnboardGetStartedScreen';
import { OnboardIntroScreen } from '../screens/onboarding/OnboardIntroScreen';
import { OnboardLangScreen } from '../screens/onboarding/OnboardLangScreen';

const Stack = createNativeStackNavigator();

export const OnboardNavigator = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: () => null,
          headerBackVisible: false,
          contentStyle: { paddingHorizontal: theme.spacing.lg },
          headerLeft: props => <BackButton {...props} />,
        }}>
        <Stack.Screen name="Introduction" component={OnboardIntroScreen} />
        <Stack.Screen
          name="OnboardGetStarted"
          component={OnboardGetStartedScreen}
          options={{ headerLeft: () => null }}
        />
        <Stack.Screen name="OnboardLanguage" component={OnboardLangScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
