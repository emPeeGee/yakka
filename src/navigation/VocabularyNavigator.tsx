import React from 'react';
import { View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { translate } from '@/core/i18n';
import { VocStartScreen, VocWordOfTheDayScreen } from '@/screens';
import { BackButton } from '@/ui/core';
import { useTheme } from '@/ui/theme';

const Stack = createNativeStackNavigator();

export const VocabularyNavigator = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator initialRouteName="VocStart">
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerLeft: props => (
            // TODO: at least for web. Check ios and android
            <View style={{ marginLeft: theme.spacing.md }}>
              <BackButton {...props} />
            </View>
          ),
        }}>
        <Stack.Screen name="VocStart" component={VocStartScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="VocWordOfTheDay"
          component={VocWordOfTheDayScreen}
          options={{
            title: translate('voc.wordOfTheDay'),
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
