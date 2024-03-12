import React, { useLayoutEffect } from 'react';

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import { rootLog } from '@/core/logger';
import { LearnTreeScreen, LearnLessonScreen, LearnLessonCompleteScreen } from '@/screens';
import { BackButton } from '@/ui/core';
import { useTheme } from '@/ui/theme';

export type LearnStackParamList = {
  LearnTree: undefined;
  LearnLesson: undefined;
  LearnLessonComplete: undefined;
};

export type LearnStackNavigatorProps = NativeStackScreenProps<LearnStackParamList>;

const Stack = createNativeStackNavigator<LearnStackParamList>();

const tabHiddenRoutes = ['LearnLesson'];

export const LearnNavigator = ({ navigation, route }: LearnStackNavigatorProps) => {
  const { theme } = useTheme();

  // https://stackoverflow.com/questions/51352081/react-navigation-how-to-hide-tabbar-from-inside-stack-navigation
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) as string;
    rootLog.info(`NEW ROUTE NAME ${routeName}`);

    if (tabHiddenRoutes.includes(routeName)) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } } as any);
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } } as any);
    }
  }, [navigation, route]);

  return (
    // TODO: replace with LearnTree
    // <Stack.Navigator initialRouteName="LearnLesson">
    <Stack.Navigator initialRouteName="LearnLessonComplete">
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          contentStyle: { paddingHorizontal: theme.spacing.md },
          headerLeft: props => <BackButton {...props} />,
        }}>
        <Stack.Screen
          name="LearnTree"
          component={LearnTreeScreen}
          options={{
            headerShown: false,
            contentStyle: { paddingHorizontal: null },
          }}
        />
        <Stack.Screen
          name="LearnLesson"
          component={LearnLessonScreen}
          options={{
            headerShown: false,
            contentStyle: { paddingHorizontal: null },
          }}
        />
        <Stack.Screen
          name="LearnLessonComplete"
          component={LearnLessonCompleteScreen}
          options={{
            headerShown: false,
            contentStyle: { paddingHorizontal: null },
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
