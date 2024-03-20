import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { HeaderBackButtonProps } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';

import { rootLog } from '@/core/logger';
import { useTheme } from '@/ui/theme';
import { EnhancedPressable } from './EnhancedPressable';

type BackButtonProps = { noBorder?: boolean; onPress?: () => void } & HeaderBackButtonProps;

export const BackButton = ({ noBorder, onPress, ...props }: BackButtonProps) => {
  const { goBack } = useNavigation();
  const { theme } = useTheme();

  const onBackPress = () => {
    rootLog.info('BackButton pressed', JSON.stringify(props));
    onPress ? onPress() : goBack();
  };

  return (
    <EnhancedPressable
      onPress={onBackPress}
      style={{
        backgroundColor: theme.colors.background,
        // when noBorder, border color becomes background color
        borderColor: noBorder ? theme.colors.background : theme.colors.border,
        borderWidth: 1,
        padding: theme.spacing.xxs,
        borderRadius: theme.borderRadius.lg,
      }}>
      <Ionicons name="chevron-back" size={24} color={theme.colors.primary} />
    </EnhancedPressable>
  );
};
