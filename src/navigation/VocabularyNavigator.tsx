import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { VocStartScreen } from '@/screens';
import { BackButton } from '@/ui/core';

const Stack = createNativeStackNavigator();

export const VocabularyNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="VocStart">
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: () => null,
          headerBackVisible: false,
          headerLeft: props => <BackButton {...props} />,
        }}>
        <Stack.Screen name="VocStart" component={VocStartScreen} options={{ headerShown: false }} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
