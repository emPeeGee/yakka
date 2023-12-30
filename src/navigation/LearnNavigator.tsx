import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppearanceScreen, SettingsScreen } from '@/screens';
import { BackButton } from '@/ui/core';
import { useTheme } from '@/ui/theme';
import { ScrollView, View } from 'react-native';
import { Tile } from '@/ui/icons';

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

const LearnScreen = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ gap: 16, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile completed />
        <Tile completed />
        <Tile completed />
        <Tile completed />
        <Tile completed />
      </View>
    </ScrollView>
  );
};
