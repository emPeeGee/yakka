import React from 'react';
import { View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ExpTopicsScreen, ExpBasicTensesScreen } from '@/screens';
import { BackButton } from '@/ui/core';
import { useTheme } from '@/ui/theme';

export type ExploreStackParamList = {
  ExpTopics: undefined;
  ExpBasicTenses: undefined;
};

const Stack = createNativeStackNavigator<ExploreStackParamList>();

export const ExploreNavigator = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator initialRouteName="ExpTopics">
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          contentStyle: { paddingHorizontal: theme.spacing.md },
          headerLeft: props => (
            <View style={{ marginLeft: theme.spacing.md }}>
              <BackButton {...props} />
            </View>
          ),
        }}>
        <Stack.Screen
          name="ExpTopics"
          component={ExpTopicsScreen}
          options={{
            headerShown: false,
            contentStyle: { paddingHorizontal: null },
          }}
        />
        <Stack.Screen
          name="ExpBasicTenses"
          component={ExpBasicTensesScreen}
          options={{
            headerShown: false,
            contentStyle: { paddingHorizontal: null },
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
