import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useFirstLaunch } from '@/core/providers';
import { ConfidenceScreen } from '@/screens/onboarding/ConfidenceScreen';
import { useTheme } from '@/ui/theme';
import { TabNavigator } from './TabNavigator';

const userStatus = 'signOut';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  const { isFirstLaunch } = useFirstLaunch();
  const { theme, appColorScheme } = useTheme();

  return (
    <NavigationContainer
      // TODO: better theme here and where it will be used?
      theme={{
        dark: appColorScheme === 'dark',
        colors: {
          background: theme.colors.background,
          primary: theme.colors.primary100,
          card: theme.colors.surface,
          text: theme.colors.textPri,
          border: theme.colors.border,
          notification: theme.colors.focus, // TODO: Do I need it?
        },
      }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'none',
        }}>
        {isFirstLaunch ? (
          <Stack.Screen name="Onboarding" component={ConfidenceScreen} />
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
