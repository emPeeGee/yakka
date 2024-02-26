import React from 'react';
import { View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppearanceScreen, ProfileScreen, SettingsScreen, AchievementsScreen } from '@/screens';
import { BackButton } from '@/ui/core';
import { useTheme } from '@/ui/theme';

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  SettingsScreen: undefined;
  AppearanceScreen: undefined;
  AchievementsScreen: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileNavigator = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
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
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerLeft: undefined,
            headerTitle: 'Profile',
            contentStyle: { paddingHorizontal: null },
          }}
        />
        <Stack.Screen
          options={{ headerTitle: 'Settings' }}
          name="SettingsScreen"
          component={SettingsScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Achievements',
            headerTransparent: false,
          }}
          name="AchievementsScreen"
          component={AchievementsScreen}
        />
        <Stack.Screen
          options={{ headerTitle: 'Appearance' }}
          name="AppearanceScreen"
          component={AppearanceScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
