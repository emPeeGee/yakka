import React from 'react';
import { View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { translate } from '@/core/i18n';
import {
  AppearanceScreen,
  ProfileScreen,
  SettingsScreen,
  AchievementsScreen,
  ProfileEditScreen,
  ProfileChangePasswordScreen,
  ProfileActivityScreen,
} from '@/screens';
import { BackButton } from '@/ui/core';
import { useTheme } from '@/ui/theme';

export type ProfileStackParamList = {
  ProfProfile: undefined;
  ProfProfileEdit: undefined;
  ProfSettings: undefined;
  ProfAppearance: undefined;
  ProfAchievements: undefined;
  ProfActivity: undefined;
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
            headerTitle: translate('profile.myProfile'),
            contentStyle: { paddingHorizontal: null },
          }}
        />
        <Stack.Screen
          options={{ headerTitle: translate('profile.settings') }}
          name="ProfSettings"
          component={SettingsScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: translate('profile.achievements'),
            headerTransparent: false,
          }}
          name="ProfAchievements"
          component={AchievementsScreen}
        />
        <Stack.Screen
          options={{
            headerTransparent: false,
            headerTitle: translate('profile.myActivity'),
          }}
          name="ProfActivity"
          component={ProfileActivityScreen}
        />
        <Stack.Screen
          options={{ headerTitle: translate('profile.appearance') }}
          name="ProfAppearance"
          component={AppearanceScreen}
        />
        <Stack.Screen
          options={{ headerTitle: translate('profile.editProfile') }}
          name="ProfProfileEdit"
          component={ProfileEditScreen}
        />
        <Stack.Screen
          options={{ headerTitle: translate('profile.changePassword') }}
          name="ProfChangePassword"
          component={ProfileChangePasswordScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
