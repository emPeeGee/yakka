import { View } from 'react-native';

import ActionSheet, { SheetManager, SheetProps } from 'react-native-actions-sheet';

import { Button, EnhancedText } from '@/ui/core';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { InfoIcon } from '../icons';

export function StartLessonSheet(props: SheetProps<'start-lesson-sheet'>) {
  const { sheetId, payload } = props;
  const { title, description, isCompleted, lives } = payload || {
    description: '',
    isCompleted: false,
    title: '',
    lives: 0,
  };
  const { theme, appColorScheme } = useTheme();
  const isDark = appColorScheme === 'dark';
  const gStyles = useGlobalThemedStyles();
  const areEnoughLives = lives > 0;

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
        {areEnoughLives ? (
          <Button
            tx={isCompleted ? 'common.doAgain' : 'common.start'}
            backgroundColor={isDark ? theme.colors.secondary700 : theme.colors.secondary500}
            onPress={() => {
              SheetManager.hide(sheetId, {
                payload: true,
              });
            }}
          />
        ) : (
          <>
            <View style={[gStyles.startRowStart, { gap: theme.spacing.xs }]}>
              <View>
                <InfoIcon color={theme.colors.warning} />
              </View>
              <EnhancedText
                size="md"
                weight="medium"
                style={{ color: theme.colors.warning }}
                tx="learn.noLivesLeftSheet"
              />
            </View>
            <Button
              tx="learn.waitLives"
              backgroundColor={isDark ? theme.colors.primary700 : theme.colors.primary100}
              onPress={() => {
                SheetManager.hide(sheetId, {
                  payload: false,
                });
              }}
            />
            <Button
              tx="learn.buyLives"
              backgroundColor={isDark ? theme.colors.secondary700 : theme.colors.secondary500}
              onPress={() => {
                // TODO: BUY MORE LIVES
                SheetManager.hide(sheetId, {
                  payload: false,
                });
              }}
            />
          </>
        )}
      </View>
    </ActionSheet>
  );
}
