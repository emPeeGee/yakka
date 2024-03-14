import { View } from 'react-native';

import ActionSheet, { SheetManager, SheetProps } from 'react-native-actions-sheet';

import { Button, EnhancedText } from '@/ui/core';
import { useTheme } from '@/ui/theme';

export function StartLessonSheet(props: SheetProps<'confirm-sheet'>) {
  const { theme, appColorScheme } = useTheme();
  const isDark = appColorScheme === 'dark';

  return (
    <ActionSheet
      id={props.sheetId}
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
        <EnhancedText size="xl" weight="medium" text={props.payload?.title} />
        <EnhancedText size="lg" text={props.payload?.description} />
        <Button
          tx="common.start"
          backgroundColor={isDark ? theme.colors.secondary700 : theme.colors.secondary500}
          onPress={() => {
            SheetManager.hide(props.sheetId, {
              payload: true,
            });
          }}
        />
      </View>
    </ActionSheet>
  );
}
