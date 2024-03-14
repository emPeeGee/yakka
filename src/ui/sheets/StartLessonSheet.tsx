import { View } from 'react-native';

import ActionSheet, { SheetManager, SheetProps } from 'react-native-actions-sheet';

import { Button, EnhancedText } from '@/ui/core';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { InfoIcon } from '../icons';

export function StartLessonSheet(props: SheetProps<'confirm-sheet'>) {
  const { sheetId, payload } = props;
  const { title, description, isCompleted } = payload || {
    description: '',
    isCompleted: false,
    title: '',
  };
  const { theme, appColorScheme } = useTheme();
  const isDark = appColorScheme === 'dark';
  const gStyles = useGlobalThemedStyles();

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
        {isCompleted && (
          <View style={[gStyles.centerRowStart, { gap: theme.spacing.xs }]}>
            <InfoIcon color={theme.colors.primary500} />
            <EnhancedText
              size="xl"
              weight="medium"
              style={{ color: theme.colors.primary500 }}
              tx="learn.lessonHasBeenCompleted"
            />
          </View>
        )}
        <EnhancedText size="xl" weight="medium" text={title} />
        <EnhancedText size="lg" text={description} />
        <Button
          tx="common.start"
          backgroundColor={isDark ? theme.colors.secondary700 : theme.colors.secondary500}
          onPress={() => {
            SheetManager.hide(sheetId, {
              payload: true,
            });
          }}
        />
      </View>
    </ActionSheet>
  );
}
