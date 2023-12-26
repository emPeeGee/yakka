import React from 'react';
import { Pressable } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { HeaderBackButtonProps } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';

import { rootLog } from '@/core/logger';
import { useTheme } from '@/ui/theme';

type BackButtonProps = { noBorder?: boolean } & HeaderBackButtonProps;
export const BackButton = ({ noBorder, ...props }: BackButtonProps) => {
  const { goBack } = useNavigation();
  const { theme, appColorScheme } = useTheme();
  rootLog.debug('BackButton props', JSON.stringify({ ...props, noBorder }));

  const onBackPress = () => {
    rootLog.info('BackButton pressed');
    goBack();
  };

  return (
    <Pressable
      onPress={onBackPress}
      style={{
        backgroundColor: theme.colors.background,
        // when noBorder, border color becomes background color
        borderColor: noBorder
          ? theme.colors.background
          : appColorScheme === 'dark'
            ? theme.colors.border
            : undefined,
        borderWidth: appColorScheme === 'dark' ? 1 : undefined,
        padding: theme.spacing.extraSmall,
        borderRadius: theme.borderRadius.large,
        ...(appColorScheme === 'light' ? { ...theme.shadows.medium } : {}),
      }}>
      <Ionicons name="ios-chevron-back" size={24} color={theme.colors.primary60} />
    </Pressable>
  );
};
