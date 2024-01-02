import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LearnScreen } from '@/screens';
import { BackButton } from '@/ui/core';
import { useTheme } from '@/ui/theme';

export type LearnStackParamList = {
  LearnScreen: undefined;
};

const Stack = createNativeStackNavigator<LearnStackParamList>();

export const LearnNavigator = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          contentStyle: { paddingHorizontal: theme.spacing.medium },
          headerLeft: props => <BackButton {...props} />,
        }}>
        <Stack.Screen
          name="LearnScreen"
          component={LearnScreen}
          options={{
            headerLeft: undefined,
            headerTitle: 'Learn',
            contentStyle: { paddingHorizontal: null },
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
