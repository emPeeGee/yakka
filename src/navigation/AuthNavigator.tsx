import React from 'react';
import { View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
          headerTitle: () => null,
          headerBackVisible: false,
          headerLeft: props => (
            <View style={{ marginLeft: theme.spacing.md }}>
              <BackButton {...props} />
            </View>
          ),
        }}>
        <Stack.Screen name="AuthLogin" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AuthSignUp" component={SignUpScreen} options={{ headerShown: true }} />
        <Stack.Screen
          name="AuthSignUpDone"
          component={SignUpDoneScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AuthResetPasswordRequest"
          component={ResetPasswordRequestScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="AuthResetPassword"
          component={ResetPasswordScreen}
          options={{ headerShown: true }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
