import { View } from 'react-native';

import ActionSheet, { SheetManager, SheetProps } from 'react-native-actions-sheet';

import { Button, EnhancedText } from '@/ui/core';
import { useTheme } from '@/ui/theme';

export function ConfirmationSheet(props: SheetProps<'confirmation-sheet'>) {
  const { sheetId, payload } = props;
  const { title = 'common.confirm', description = 'common.areYouSure' } = payload || {
    title: undefined,
    description: undefined,
  };
  const { theme, isDark } = useTheme();

  return (
    <ActionSheet
      id={sheetId}
      gestureEnabled
      headerAlwaysVisible
      indicatorStyle={{ backgroundColor: theme.colors.surface }}
      containerStyle={{ backgroundColor: theme.colors.background }}
      closeOnTouchBackdrop
      closeOnPressBack
      statusBarTranslucent
      drawUnderStatusBar
      defaultOverlayOpacity={0.5}>
      <View
        style={{
          padding: theme.spacing.md,
          gap: theme.spacing.md,
          backgroundColor: theme.colors.background,
        }}>
        <EnhancedText size="xl" weight="medium" tx={title} />
        <EnhancedText size="lg" tx={description} />
        <Button
          tx="common.yes"
          backgroundColor={theme.colors.chilly}
          color={theme.colors.base0}
          onPress={() => {
            SheetManager.hide(sheetId, {
              payload: true,
            });
          }}
        />
        <Button
          tx="common.no"
          backgroundColor={isDark ? theme.colors.primary900 : theme.colors.primary100}
          onPress={() => {
            SheetManager.hide(sheetId, {
              payload: false,
            });
          }}
        />
      </View>
    </ActionSheet>
  );
}
