import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useFirstLaunch } from '@/core/providers';
import { ConfidenceScreen } from '@/screens/onboarding/ConfidenceScreen';
import { Sandbox } from '@/screens/sandbox/Sandbox';

const userStatus = 'signOut';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  const { isFirstLaunch } = useFirstLaunch();

  return (
    <NavigationContainer>
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
              // <Stack.Screen name="Auth" component={AuthNavigator} />
              <Stack.Screen name="Home" component={Sandbox} />
            ) : (
              // TODO:
              // <Stack.Screen name="Home" component={TabNavigator} />
              <Stack.Screen name="Home" component={Sandbox} />
            )}
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
