import React from 'react';
import { View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  AppearanceScreen,
  ProfileScreen,
  SettingsScreen,
  AchievementsScreen,
  ProfileEditScreen,
  ProfileChangePasswordScreen,
} from '@/screens';
import { BackButton } from '@/ui/core';
import { useTheme } from '@/ui/theme';

export type ProfileStackParamList = {
  ProfProfile: undefined;
  ProfProfileEdit: undefined;
  ProfSettings: undefined;
  ProfAppearance: undefined;
  ProfAchievements: undefined;
  ProfChangePassword: undefined;
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
          name="ProfProfile"
          component={ProfileScreen}
          options={{
            headerLeft: undefined,
            headerTitle: 'Profile',
            contentStyle: { paddingHorizontal: null },
          }}
        />
        <Stack.Screen
          options={{ headerTitle: 'Settings' }}
          name="ProfSettings"
          component={SettingsScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Achievements',
            headerTransparent: false,
          }}
          name="ProfAchievements"
          component={AchievementsScreen}
        />
        <Stack.Screen
          options={{ headerTitle: 'Appearance' }}
          name="ProfAppearance"
          component={AppearanceScreen}
        />
        <Stack.Screen
          // options={{ headerTitle: '' }}
          name="ProfProfileEdit"
          component={ProfileEditScreen}
        />
        <Stack.Screen
          // options={{ headerTitle: '' }}
          name="ProfChangePassword"
          component={ProfileChangePasswordScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
