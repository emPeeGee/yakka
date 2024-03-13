import { View } from 'react-native';

import * as Speech from 'expo-speech';

import { ActivityUnion } from '@/types';
import { EnhancedText, EnhancedPressable, Separator } from '@/ui/core';
import { SpeakerIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

export function ActivityHeader({
  activity,
  noSeparator = false,
}: {
  activity: ActivityUnion;
  noSeparator?: boolean;
}) {
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();

  return (
    <>
      <View
        style={{
          width: '100%',
          paddingHorizontal: theme.spacing.md,
          marginBottom: theme.spacing.md,
          gap: theme.spacing.lg,
        }}>
        <View style={{ alignItems: 'center' }}>
          <EnhancedText tx="learn.whatDoesSentence" size="xl" />
        </View>

        <View style={gStyles.centerRow}>
          <EnhancedPressable
            onPress={() => {
              Speech.speak(activity.sentence, { language: 'en' });
            }}
            style={{
              backgroundColor: theme.colors.secondary500,
              padding: theme.spacing.sm,
              borderRadius: theme.borderRadius.lg,
              marginRight: theme.spacing.sm,
            }}>
            <SpeakerIcon color={theme.colors.base0} />
          </EnhancedPressable>
          <EnhancedText text={activity.sentence} size="lg" />
        </View>
      </View>

      {noSeparator === false && <Separator height={theme.borders.medium} />}
    </>
  );
}
