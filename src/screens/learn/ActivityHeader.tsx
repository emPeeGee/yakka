import { Fragment } from 'react';
import { View } from 'react-native';

import * as Speech from 'expo-speech';

import { TxKeyPath } from '@/core/i18n';
import { ActivityUnion } from '@/types';
import { EnhancedText, EnhancedPressable, Separator } from '@/ui/core';
import { SpeakerIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

type ActivityHeaderProps = {
  activity: ActivityUnion;
  txTitle?: TxKeyPath;
  noSeparator?: boolean;
  noSpeaker?: boolean;
  noSentence?: boolean;
};

export function ActivityHeader({
  activity,
  txTitle,
  noSeparator = false,
  noSpeaker = false,
  noSentence = false,
}: ActivityHeaderProps) {
  const { theme, appColorScheme } = useTheme();
  const gStyles = useGlobalThemedStyles();

  const sentenceParts = activity.sentence.split('@@@');

  // Map through the parts and replace '@@@' with the CustomComponent
  const sentenceWithPlaceholders = sentenceParts.map((part, index) => {
    if (index === sentenceParts.length - 1) {
      // Last part, return as is
      return <EnhancedText key={index} text={part} size="lg" />;
    } else {
      return (
        <Fragment key={index}>
          <EnhancedText text={part} size="lg" />
          <View
            style={{
              borderRadius: theme.borderRadius.md,
              width: 40,
              height: 40,
              backgroundColor:
                appColorScheme === 'dark' ? theme.colors.surface : theme.colors.base40,
            }}
          />
        </Fragment>
      );
    }
  });

  return (
    <View style={{ marginBottom: theme.spacing.md }}>
      <View
        style={{
          width: '100%',
          paddingHorizontal: theme.spacing.md,
          marginBottom: theme.spacing.md,
          gap: theme.spacing.lg,
        }}>
        <View style={{ alignItems: 'center' }}>
          <EnhancedText tx={txTitle || 'learn.whatDoesSentence'} size="xl" />
        </View>

        <View style={gStyles.centerRow}>
          {noSpeaker === false && (
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
          )}

          {noSentence === false && (
            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              {sentenceWithPlaceholders}
            </View>
          )}
        </View>
      </View>

      {noSeparator === false && <Separator height={theme.borders.medium} />}
    </View>
  );
}
