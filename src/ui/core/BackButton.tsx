import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { HeaderBackButtonProps } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';

import { rootLog } from '@/core/logger';
import { isThemeDark } from '@/core/utils';
import { useTheme } from '@/ui/theme';
import { EnhancedPressable } from './EnhancedPressable';

type BackButtonProps = { noBorder?: boolean } & HeaderBackButtonProps;
export const BackButton = ({ noBorder, ...props }: BackButtonProps) => {
  const { goBack } = useNavigation();
  const { theme, appColorScheme } = useTheme();
  const isDark = isThemeDark(appColorScheme);

  rootLog.debug('BackButton props', JSON.stringify({ ...props, noBorder }));

  const onBackPress = () => {
    rootLog.info('BackButton pressed');
    goBack();
  };

  return (
    <EnhancedPressable
      onPress={onBackPress}
      noHaptic
      style={{
        backgroundColor: theme.colors.background,
        // when noBorder, border color becomes background color
        borderColor: noBorder ? theme.colors.background : isDark ? theme.colors.border : undefined,
        borderWidth: isDark ? 1 : undefined,
        padding: theme.spacing.tiny,
        borderRadius: theme.borderRadius.large,
        ...(isDark ? {} : { ...theme.shadows.medium }),
      }}>
      <Ionicons name="ios-chevron-back" size={24} color={theme.colors.primary60} />
    </EnhancedPressable>
  );
};
