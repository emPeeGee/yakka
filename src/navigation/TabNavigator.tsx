import type { ComponentType } from 'react';
import { View } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { SvgProps } from 'react-native-svg';

import { noop } from '@/core/utils';
import { EnhancedText } from '@/ui/core';
import { BookIcon, PathIcon, PersonIcon, TrophyIcon } from '@/ui/icons';
import { useTheme } from '@/ui/theme';
import { ProfileNavigator } from './ProfileNavigator';

const Learn = () => {
  return (
    <View>
      <EnhancedText>Learn</EnhancedText>
      <FontAwesome.Button name="facebook" backgroundColor="#3b5998" onPress={noop}>
        Login with Facebook
      </FontAwesome.Button>
    </View>
  );
};

const Vocabulary = () => {
  return (
    <View>
      <EnhancedText>Vocabulary</EnhancedText>
      <FontAwesome.Button name="facebook" backgroundColor="#3b5998" onPress={noop}>
        Login with Facebook
      </FontAwesome.Button>
    </View>
  );
};

const Achievements = () => {
  return (
    <View>
      <EnhancedText>Achievements</EnhancedText>
      <FontAwesome.Button name="facebook" backgroundColor="#3b5998" onPress={noop}>
        Login with Facebook
      </FontAwesome.Button>
    </View>
  );
};

type TabParamList = {
  Learn: undefined;
  Vocabulary: undefined;
  Achievements: undefined;
  ProfileTab: undefined;
};

type TabType = {
  name: keyof TabParamList;
  component: ComponentType<unknown>;
  label: string;
};

type TabIconsType = {
  [key in keyof TabParamList]: (props: SvgProps) => JSX.Element;
};

const tabsIcons: TabIconsType = {
  Learn: (props: SvgProps) => <PathIcon {...props} />,
  Vocabulary: (props: SvgProps) => <BookIcon {...props} />,
  Achievements: (props: SvgProps) => <TrophyIcon {...props} />,
  ProfileTab: (props: SvgProps) => <PersonIcon {...props} />,
};

export type TabList<T extends keyof TabParamList> = {
  navigation: NativeStackNavigationProp<TabParamList, T>;
  route: RouteProp<TabParamList, T>;
};

const tabs: TabType[] = [
  {
    name: 'Learn',
    component: Learn,
    label: 'Learn',
  },
  {
    name: 'Vocabulary',
    component: Vocabulary,
    label: 'Vocabulary',
  },
  {
    name: 'Achievements',
    component: Achievements,
    label: 'Achievements',
  },
  {
    name: 'ProfileTab',
    component: ProfileNavigator,
    label: 'ProfileTab',
  },
];

const BarIcon = ({ name }: { name: keyof TabParamList }) => {
  const Icon = tabsIcons[name];
  return <Icon />;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="ProfileTab"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          borderTopWidth: 0,
          borderTopColor: 'transparent',

          elevation: 0,
          shadowColor: '#000',
          shadowOpacity: 0,
          shadowOffset: {
            height: 0,
            width: 0,
          },
          shadowRadius: 0,
        },
        tabBarActiveBackgroundColor: theme.colors.background,
        tabBarInactiveBackgroundColor: theme.colors.background,
        tabBarActiveTintColor: theme.colors.primary60,
        tabBarInactiveTintColor: theme.colors.tabColor,
        tabBarIcon: () => <BarIcon name={route.name} />,
      })}>
      <Tab.Group
        screenOptions={{
          headerShown: false,
        }}>
        {tabs.map(({ name, component, label }) => {
          return (
            <Tab.Screen
              key={name}
              name={name}
              component={component}
              options={{ title: label, tabBarTestID: `${name}-tab` }}
            />
          );
        })}
      </Tab.Group>
    </Tab.Navigator>
  );
};