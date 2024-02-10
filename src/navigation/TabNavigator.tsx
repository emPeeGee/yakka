import { useState, type ComponentType } from 'react';
import { View } from 'react-native';

import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { SvgProps } from 'react-native-svg';

import { noop } from '@/core/utils';
import { ChoiceGroup, EnhancedText, HeroWithChat, TextField, Toggle } from '@/ui/core';
import { BookIcon, PathIcon, PersonIcon, TrophyIcon } from '@/ui/icons';
import { useTheme } from '@/ui/theme';
import { LearnNavigator } from './LearnNavigator';
import { ProfileNavigator } from './ProfileNavigator';

const Vocabulary = () => {
  const [on, setOn] = useState(false);
  const [lang, setLang] = useState('en');

  return (
    <View>
      {/* <HeaderPlaceholder /> */}
      <EnhancedText>Vocabulary</EnhancedText>
      <FontAwesome.Button name="facebook" backgroundColor="#3b5998" onPress={noop}>
        Login with Facebook
      </FontAwesome.Button>

      <HeroWithChat tx="onboard.lang" chatPosition="top" />

      <Toggle
        labelTx="common.logOut"
        labelPosition="right"
        labelStyle={{ paddingLeft: 10 }}
        variant="checkbox"
        value={on}
        onPress={() => setOn(o => !o)}
      />
      <Toggle variant="radio" value={on} onPress={() => setOn(o => !o)} />
      <Toggle variant="switch" value={on} onPress={() => setOn(o => !o)} />

      <ChoiceGroup
        options={[
          {
            label: 'English',
            value: 'en',
            Left: () => <EnhancedText size="xl">🇬🇧</EnhancedText>,
          },
          {
            label: 'Romanian',
            value: 'ro',
            Left: () => <EnhancedText size="md">🇷🇴</EnhancedText>,
          },
        ]}
        value={lang}
        onChange={(value: string): void => {
          setLang(value);
        }}
      />
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

      <TextField labelTx="welcomeScreen.letsGo" status="error" />

      <TextField
        label="123"
        inputWrapperStyle={{ width: '100%' }}
        // multiline
        LeftAccessory={props => (
          <View style={[props.style]}>
            <Ionicons color="white" size={26} name="airplane-outline" />
          </View>
        )}
      />

      <TextField
        label="123"
        inputWrapperStyle={{ width: '100%' }}
        // multiline
        LeftAccessory={props => (
          <View style={[props.style]}>
            <Ionicons color="white" size={26} name="airplane-outline" />
          </View>
        )}
      />

      <EnhancedText tx="common.back" />
      <EnhancedText tx="common.back" preset="bold" />
      <EnhancedText tx="common.back" preset="formHelper" />
      <EnhancedText tx="common.back" preset="formLabel" />
      <EnhancedText tx="common.back" preset="subheading" />
      <EnhancedText tx="common.back" preset="heading" />
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
    component: LearnNavigator,
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
