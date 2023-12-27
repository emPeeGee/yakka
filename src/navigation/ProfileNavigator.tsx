import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ProfileScreen, SettingsScreen } from '@/screens';
import { BackButton } from '@/ui/core';

export type ProfileStackParamList = {
  Profile: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerLeft: props => <BackButton {...props} />,
        }}>
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerLeft: undefined }}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
