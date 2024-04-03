import { useState, useEffect } from 'react';
import { View } from 'react-native';

import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';

import { ONBOARD_DATA_KEY } from '@/core/constants';
import { rootLog } from '@/core/logger';
import { useAuth, useFirstLaunch } from '@/core/providers';
import { getItem } from '@/core/storage';
import { isThemeDark, parseSupabaseUrl } from '@/core/utils';
import { HeroLoading } from '@/ui/core';
import { useTheme } from '@/ui/theme';
import { AuthNavigator } from './AuthNavigator';
import { OnboardNavigator } from './OnboardNavigator';
import { TabNavigator } from './TabNavigator';

const prefix = Linking.createURL('/');
const Stack = createNativeStackNavigator();

// Needs this for token parsing - since we're dealing with global shims, TS is going to be a little weird.
// eslint-disable-next-line
global.Buffer = global.Buffer || require('buffer').Buffer;

export function RootNavigator() {
  const getInitialURL = async () => {
    const url = await Linking.getInitialURL();

    if (url !== null) {
      return parseSupabaseUrl(url);
    }

    return url;
  };

  const { isFirstLaunch } = useFirstLaunch();
  const { theme, appColorScheme } = useTheme();
  const [initialRoute, setInitialRoute] = useState<string | undefined>(undefined);
  const { user, loginWithToken } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getItem(ONBOARD_DATA_KEY).then(onboardData => {
      // TODO: onboardData
      if (isFirstLaunch) {
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

  const subscribe = (listener: (url: string) => void) => {
    const onReceiveURL = ({ url }: { url: string }) => {
      const transformedUrl = parseSupabaseUrl(url);
      const parsedUrl = Linking.parse(transformedUrl);

      const access_token = parsedUrl.queryParams?.access_token;
      const refresh_token = parsedUrl.queryParams?.refresh_token;

      if (typeof access_token === 'string' && typeof refresh_token === 'string') {
        void loginWithToken({ access_token, refresh_token });
      }

      listener(transformedUrl);
    };
    const subscription = Linking.addEventListener('url', onReceiveURL);

    return () => {
      subscription.remove();
    };
  };

  const linking: LinkingOptions<any> = {
    prefixes: [prefix],
    config: {
      screens: {
        Auth: {
          screens: {
            AuthResetPassword: '/ResetPassword',
          },
        },
      },
    },
    getInitialURL,
    subscribe,
  };

  rootLog.info(initialRoute);

  return (
    <NavigationContainer
      linking={linking}
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
        <Stack.Screen name="App" component={TabNavigator} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Onboard" component={OnboardNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
