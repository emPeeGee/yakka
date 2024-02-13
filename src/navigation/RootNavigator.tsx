import { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ONBOARD_DATA_KEY } from '@/core/constants';
import { rootLog } from '@/core/logger';
import { useFirstLaunch } from '@/core/providers';
import { getItem } from '@/core/storage';
import { isThemeDark } from '@/core/utils';
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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getItem(ONBOARD_DATA_KEY).then(onboardData => {
      // TODO: dev purpose
      setInitialRoute('App');
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return;

      if (isFirstLaunch || !onboardData) {
        setInitialRoute('Onboard');
      } else {
        setInitialRoute('Auth');
      }
      // TODO: remove timeout
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    });
  });

  if (isLoading && initialRoute) {
    return (
      // <ContainerWithInsets>
      <ActivityIndicator size="large" />
      // </ContainerWithInsets>
    );
  }

  // no {''} -> ""
  // Always

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

// const View1 = () => {
//   return (
//     <View>
//       <EnhancedText>1</EnhancedText>
//     </View>
//   );
// };

// const View2 = () => {
//   return (
//     <View>
//       <EnhancedText>2</EnhancedText>
//     </View>
//   );
// };

// const View3 = () => {
//   return (
//     <View>
//       <EnhancedText>3</EnhancedText>
//     </View>
//   );
// };

// export const LanguageInterrogationScreen = () => {
//   const insets = useSafeAreaInsets();
//   const { theme } = useTheme();
//   const styles = useMemo(() => getStyles(theme), [theme]);
//   // const { setIsFirstLaunch } = useFirstLaunch();

//   // TODO: Log in button in onboarding

//   return (
//     <View
//       style={[
//         styles.container,
//         {
//           paddingTop: insets.top,
//           paddingBottom: insets.bottom,
//           paddingLeft: insets.left,
//           paddingRight: insets.right,
//         },
//       ]}>
//       <Wizard
//         fallbackRoute="Achievements"
//         screens={[View1, View2, View3]}
//         onFinish={() => {
//           rootLog.info('Wizard on finish');
//         }}
//       />
//     </View>
//   );
// };

// const getStyles = (theme: Theme) =>
//   StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: theme.colors.background,
//     },
//   });

// TODO: translations and
