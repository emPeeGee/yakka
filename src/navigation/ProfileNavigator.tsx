import React from 'react';
import { Pressable } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { HeaderBackButtonProps } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { rootLog } from '@/core/logger';
import { ProfileScreen, SettingsScreen } from '@/screens';
import { useTheme } from '@/ui/theme';

export type ProfileStackParamList = {
  Profile: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerLeft: props => <CustomBackButton {...props} />,
        }}>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

// TODO: extract it in reusable, because it will be used across the app
// TODO: Based on location show border ...
const CustomBackButton = ({
  noBorder = false,
  ...props
}: { noBorder?: boolean } & HeaderBackButtonProps) => {
  rootLog.debug(props);
  const { goBack } = useNavigation();
  const { theme, appColorScheme } = useTheme();

  const onBackPress = () => {
    rootLog.info('CustomBackButton pressed');
    goBack();
  };

  return (
    <Pressable
      onPress={onBackPress}
      style={{
        backgroundColor: theme.colors.background,
        borderColor:
          noBorder === false && appColorScheme === 'dark' ? theme.colors.border : undefined,
        borderWidth: noBorder === false && appColorScheme === 'dark' ? 1 : undefined,
        padding: theme.spacing.extraSmall,
        borderRadius: theme.borderRadius.large,
        elevation: theme.elevation.large,
      }}>
      <Ionicons name="ios-chevron-back" size={24} color={theme.colors.primary60} />
    </Pressable>
  );
};
