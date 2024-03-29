import { useState } from 'react';
import { View } from 'react-native';

import { Slider } from '@miblanchard/react-native-slider';
import ActionSheet, { SheetManager, SheetProps } from 'react-native-actions-sheet';

import { Button, EnhancedText } from '@/ui/core';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

export function FontSizeSheet(props: SheetProps<'font-size-sheet'>) {
  const { sheetId, payload } = props;
  const { theme, appColorScheme } = useTheme();
  const isDark = appColorScheme === 'dark';
  const gStyles = useGlobalThemedStyles();
  const [fontSize, setFontSize] = useState(payload?.fontSize);

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
        <EnhancedText size="xl" weight="medium" tx="settings.textSize" />
        {/* <EnhancedText size="lg" text={description} /> */}

        <View
          style={[
            gStyles.centerRowBetween,
            { gap: theme.spacing.md, paddingVertical: theme.spacing.lg },
          ]}>
          <EnhancedText text="A" style={{ fontSize: 12 }} />
          <View style={{ flex: 1 }}>
            <Slider
              value={fontSize}
              onSlidingComplete={v => setFontSize(v.at(0) as number)}
              minimumValue={12}
              maximumValue={20}
              step={1}
              trackStyle={{
                height: 12,
                borderRadius: theme.borderRadius.md,
              }}
              thumbStyle={{
                backgroundColor: theme.colors.base0,
                borderColor: theme.colors.border,
                borderWidth: theme.borders.medium,
              }}
              minimumTrackTintColor={theme.colors.secondary}
              maximumTrackTintColor={theme.colors.surface}
            />
          </View>
          <EnhancedText text="A" style={{ fontSize: 20 }} />
        </View>

        <Button
          tx="common.apply"
          backgroundColor={isDark ? theme.colors.secondary700 : theme.colors.secondary500}
          onPress={() => {
            SheetManager.hide(sheetId, { payload: fontSize });
          }}
        />
        <Button
          tx="common.cancel"
          backgroundColor={isDark ? theme.colors.primary700 : theme.colors.primary100}
          onPress={() => {
            SheetManager.hide(sheetId, { payload: null });
          }}
        />
      </View>
    </ActionSheet>
  );
}
