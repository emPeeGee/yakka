import { Fragment } from 'react';
import { View } from 'react-native';

import * as Speech from 'expo-speech';

import { TxKeyPath } from '@/core/i18n';
import { ActivityUnion } from '@/types';
import { EnhancedText, EnhancedPressable, Separator, Emoji } from '@/ui/core';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

type ActivityHeaderProps = {
  activity: ActivityUnion;
  txTitle?: TxKeyPath;
  noSeparator?: boolean;
  noSpeaker?: boolean;
  withSlowSpeaker?: boolean;
  noSentence?: boolean;
};

export function ActivityHeader({
  activity,
  txTitle,
  noSeparator = false,
  noSpeaker = false,
  noSentence = false,
  withSlowSpeaker = false,
}: ActivityHeaderProps) {
  const { theme } = useTheme();
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
              backgroundColor: theme.colors.surface,
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
                Speech.speak(activity.sentence, { language: 'en', rate: 1 });
              }}
              style={{
                backgroundColor: theme.colors.secondary500,
                padding: theme.spacing.sm,
                borderRadius: theme.borderRadius.lg,
                marginRight: theme.spacing.sm,
              }}>
              {/* <SpeakerIcon color={theme.colors.base0} /> */}
              <Emoji emoji="🔊" emojiStyle={{ fontSize: 26 }} />
            </EnhancedPressable>
          )}
          {withSlowSpeaker && (
            <EnhancedPressable
              onPress={() => {
                Speech.speak(activity.sentence, { language: 'en', rate: 0.1 });
              }}
              style={{
                backgroundColor: theme.colors.secondary500,
                padding: theme.spacing.sm,
                borderRadius: theme.borderRadius.lg,
                marginRight: theme.spacing.sm,
              }}>
              <Emoji emoji="🐌" emojiStyle={{ fontSize: 26 }} />
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
