import { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { rootLog } from '@/core/logger';
import { isThemeDark } from '@/core/utils';
import { Theme } from '@/types';
import { EnhancedText, Wizard } from '@/ui/core';
import { useTheme } from '@/ui/theme';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  // const { isFirstLaunch } = useFirstLaunch();
  const { theme, appColorScheme } = useTheme();

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
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'none',
        }}>
        <Stack.Screen name="Onboarding" component={LanguageInterrogationScreen} />
        {/* {isFirstLaunch ? (
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
          </Stack.Group> */}
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const View1 = () => {
  return (
    <View>
      <EnhancedText>1</EnhancedText>
    </View>
  );
};

const View2 = () => {
  return (
    <View>
      <EnhancedText>2</EnhancedText>
    </View>
  );
};

const View3 = () => {
  return (
    <View>
      <EnhancedText>3</EnhancedText>
    </View>
  );
};

export const LanguageInterrogationScreen = () => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  // const { setIsFirstLaunch } = useFirstLaunch();

  // TODO: Log in button in onboarding

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      <Wizard
        screens={[View1, View2, View3]}
        onFinish={() => {
          rootLog.info('Wizard on finish');
        }}
      />
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });

// TODO: translations and
