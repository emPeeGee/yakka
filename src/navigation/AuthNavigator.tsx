import React from 'react';
import { View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { translate } from '@/core/i18n';
import {
  LoginScreen,
  ResetPasswordRequestScreen,
  ResetPasswordScreen,
  SignUpDoneScreen,
  SignUpScreen,
} from '@/screens';
import { BackButton } from '@/ui/core';
import { useTheme } from '@/ui/theme';

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator initialRouteName="AuthLogin">
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerLeft: props => (
            <View style={{ marginLeft: theme.spacing.md }}>
              <BackButton {...props} />
            </View>
          ),
        }}>
        <Stack.Screen
          name="AuthLogin"
          component={LoginScreen}
          options={{ headerLeft: () => null, headerShown: false }}
        />
        <Stack.Screen
          name="AuthSignUp"
          component={SignUpScreen}
          options={{ headerTitle: translate('auth.signUp') }}
        />
        <Stack.Screen
          name="AuthSignUpDone"
          component={SignUpDoneScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AuthResetPasswordRequest"
          component={ResetPasswordRequestScreen}
          options={{ headerTitle: translate('auth.resetPassword') }}
        />
        <Stack.Screen
          name="AuthResetPassword"
          component={ResetPasswordScreen}
          options={{ headerTitle: translate('auth.resetPassword') }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
