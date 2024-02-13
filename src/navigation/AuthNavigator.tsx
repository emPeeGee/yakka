import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '@/screens';
import { BackButton } from '@/ui/core';

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="AuthLogin">
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: () => null,
          headerBackVisible: false,
          headerLeft: props => <BackButton {...props} />,
        }}>
        <Stack.Screen name="AuthLogin" component={LoginScreen} options={{ headerShown: false }} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
