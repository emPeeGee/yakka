import { type ComponentType } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { SvgProps } from 'react-native-svg';

import { BookIcon, CompassIcon, PathIcon, PersonIcon } from '@/ui/icons';
import { useTheme } from '@/ui/theme';
import { ExploreNavigator } from './ExploreNavigator';
import { LearnNavigator } from './LearnNavigator';
import { ProfileNavigator } from './ProfileNavigator';
import { VocabularyNavigator } from './VocabularyNavigator';

type TabParamList = {
  Learn: undefined;
  Vocabulary: undefined;
  Explore: undefined;
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
  Explore: (props: SvgProps) => <CompassIcon {...props} />,
  ProfileTab: (props: SvgProps) => <PersonIcon {...props} />,
};

export type TabList<T extends keyof TabParamList> = {
  navigation: NativeStackNavigationProp<TabParamList, T>;
  route: RouteProp<TabParamList, T>;
};

const tabs: TabType[] = [
  {
    name: 'Learn',
    component: LearnNavigator,
    label: 'Learn',
  },
  {
    name: 'Vocabulary',
    component: VocabularyNavigator,
    label: 'Vocabulary',
  },
  {
    name: 'Explore',
    component: ExploreNavigator,
    label: 'Explore',
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
      // NOTE: route name for dev purpose
      initialRouteName="Explore"
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
        tabBarActiveTintColor: theme.colors.primary500,
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
