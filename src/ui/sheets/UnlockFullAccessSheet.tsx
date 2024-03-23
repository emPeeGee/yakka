import { View } from 'react-native';

import ActionSheet, { SheetManager, SheetProps } from 'react-native-actions-sheet';

import { noop } from '@/core/utils';
import { Button, EnhancedText } from '@/ui/core';
import { useTheme } from '@/ui/theme';

export function UnlockFullAccessSheet(props: SheetProps<'unlock-full-access-sheet'>) {
  const { sheetId, payload } = props;
  const { onCreateProfile } = payload || {
    onCreateProfile: noop,
  };
  const { theme } = useTheme();

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
        <EnhancedText size="xl" weight="medium" tx="auth.unlockAccessTitle" />
        <EnhancedText size="lg" tx="auth.unlockAccessDetails" />

        <Button
          tx="common.createProfile"
          backgroundColor={theme.colors.secondary500}
          onPress={() => {
            SheetManager.hide(sheetId);
            onCreateProfile();
          }}
        />
      </View>
    </ActionSheet>
  );
}
