import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BackButton, EnhancedText, HeaderPlaceholder, Tile } from '@/ui/core';
import { useTheme } from '@/ui/theme';

export type LearnStackParamList = {
  LearnScreen: undefined;
};

const Stack = createNativeStackNavigator<LearnStackParamList>();

export const LearnNavigator = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          contentStyle: { paddingHorizontal: theme.spacing.medium },
          headerLeft: props => <BackButton {...props} />,
        }}>
        <Stack.Screen
          name="LearnScreen"
          component={LearnScreen}
          options={{
            headerLeft: undefined,
            headerTitle: 'Learn',
            contentStyle: { paddingHorizontal: null },
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const LearnScreen = () => {
  const { theme } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <HeaderPlaceholder />
      <View>
        <Text style={{ fontFamily: 'Fredoka_500Medium', fontSize: 40 }}>Inter Black</Text>
        <EnhancedText variant="headlineLarge">Hello, Mate</EnhancedText>
        <EnhancedText
          variant="headlineSmall"
          style={{
            color: theme.colors.textSec,
          }}>
          What would you like to learn today?
        </EnhancedText>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            gap: 16,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            flexDirection: 'column',
          }}>
          <Tile type="globe" />
          <Tile type="countdown" withHero heroPos="left" />
          <Tile type="globe" />
          <Tile completed type="globe" />
          <Tile completed type="countdown" withHero heroPos="right" />
          <Tile completed type="globe" />
          <Tile completed type="globe" withHero heroPos="left" />
          <Tile completed type="start" />
        </View>
      </ScrollView>
    </View>
  );
};
