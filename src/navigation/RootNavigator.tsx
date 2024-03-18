import { useState, useEffect } from 'react';
import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ONBOARD_DATA_KEY } from '@/core/constants';
import { rootLog } from '@/core/logger';
import { useAuth, useFirstLaunch } from '@/core/providers';
import { getItem } from '@/core/storage';
import { isThemeDark } from '@/core/utils';
import { HeroLoading } from '@/ui/core';
import { useTheme } from '@/ui/theme';
import { AuthNavigator } from './AuthNavigator';
import { OnboardNavigator } from './OnboardNavigator';
import { TabNavigator } from './TabNavigator';

const Stack = createNativeStackNavigator();
const userStatus: 'signOut' | 'onboarding' | 'signIn' = 'signOut';

export function RootNavigator() {
  const { isFirstLaunch } = useFirstLaunch();
  const { theme, appColorScheme } = useTheme();
  const [initialRoute, setInitialRoute] = useState<string | undefined>(undefined);
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getItem(ONBOARD_DATA_KEY).then(onboardData => {
      // TODO: dev purpose
      // setInitialRoute('App');
      // setInitialRoute('Auth');
      // setTimeout(() => {
      //   setIsLoading(false);
      // }, 2000);
      // return;

      if (isFirstLaunch || !onboardData) {
        setInitialRoute('Onboard');
      } else if (user) {
        setInitialRoute('App');
      } else {
        setInitialRoute('Auth');
      }
      // TODO: remove timeout
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    });
  }, []);

  if (isLoading && !initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <HeroLoading />
      </View>
    );
  }

  rootLog.info(initialRoute);

  return (
    <NavigationContainer
      theme={{
        dark: isThemeDark(appColorScheme),
        colors: {
          background: theme.colors.background,
          card: theme.colors.background,
          primary: theme.colors.primary500,
          text: theme.colors.textPri,
          border: theme.colors.border,
          notification: theme.colors.secondary,
        },
      }}>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'none',
        }}>
        {/* eslint-disable-next-line no-constant-condition */}
        {true || isFirstLaunch ? (
          <>
            <Stack.Screen name="Onboard" component={OnboardNavigator} />
            <Stack.Screen name="Auth" component={AuthNavigator} />
            <Stack.Screen name="App" component={TabNavigator} />
          </>
        ) : (
          <Stack.Group>
            {userStatus === 'signOut' ? (
              // TODO:
              <Stack.Screen name="App" component={TabNavigator} />
            ) : (
              // TODO:
              <Stack.Screen name="App" component={TabNavigator} />
            )}
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
