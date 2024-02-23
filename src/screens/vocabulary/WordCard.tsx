import { useMemo } from 'react';
import { View } from 'react-native';

import { Word } from '@/types';
import { FlipCard, Card, EnhancedText, Separator, HeroWithChat } from '@/ui/core';
import { BookIcon, SpeakerIcon, HeartIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

interface WordCardProps {
  word: Word;
}

export const WordCard = ({ word }: WordCardProps) => {
  return (
    <FlipCard flipHorizontal flipVertical={false}>
      <FlipCardWrapper side="front" item={word} />
      <FlipCardWrapper side="back" item={word} />
    </FlipCard>
  );
};

interface FlipCardWrapperProps {
  item: Word;
  side: 'front' | 'back';
}

const FlipCardWrapper = ({ item, side }: FlipCardWrapperProps) => {
  const { theme, appColorScheme } = useTheme();
  const isDark = useMemo(() => appColorScheme === 'dark', [appColorScheme]);
  const gStyles = useGlobalThemedStyles();

  return (
    <Card>
      <View style={[gStyles.centerColumn, { gap: theme.spacing.lg, height: '100%' }]}>
        <View
          style={[
            gStyles.centerRow,
            {
              backgroundColor: isDark ? theme.colors.base80 : theme.colors.base40,
              borderRadius: theme.borderRadius.xl,
              padding: theme.spacing.sm,
              gap: theme.spacing.xs,
            },
          ]}>
          <BookIcon width={24} height={24} />
          <EnhancedText
            text={item.category}
            weight="bold"
            style={{ ...theme.typography.sizes.sm }}
          />
        </View>

        {side === 'front' ? (
          <View
            style={[
              gStyles.centerColumn,
              {
                position: 'relative',
                width: '100%',
                height: 240 * Math.sqrt(2),
                gap: theme.spacing.md,
              },
            ]}>
            <View
              style={[
                {
                  width: 240,
                  height: 240,
                  backgroundColor: isDark ? theme.colors.primary800 : theme.colors.primary100,
                  borderRadius: theme.borderRadius.xl,
                  transform: [{ rotate: '45deg' }],
                },
                gStyles.centerColumn,
              ]}>
              <View style={[gStyles.centerColumn, { transform: [{ rotate: '-45deg' }] }]}>
                <EnhancedText preset="heading">{item.word}</EnhancedText>
                <EnhancedText preset="formHelper" weight="light" style={{ fontStyle: 'italic' }}>
                  {item.meanings[0].speech_part}
                </EnhancedText>
              </View>
            </View>
          </View>
        ) : (
          <View style={[gStyles.fullWidthFromStart]}>
            <View style={[gStyles.centerColumn, { gap: theme.spacing.md }]}>
              <EnhancedText preset="heading">{item.word}</EnhancedText>
              <View
                style={[
                  gStyles.centerRow,
                  {
                    paddingHorizontal: theme.spacing.sm,
                    paddingVertical: theme.spacing.xs,
                    backgroundColor: isDark ? theme.colors.primary800 : theme.colors.primary100,
                    borderRadius: theme.borderRadius.lg,
                    gap: theme.spacing.xs,
                  },
                ]}>
                <EnhancedText style={{ ...theme.typography.sizes.md }}>
                  {item.pronunciation}
                </EnhancedText>
                <SpeakerIcon width={28} height={28} />
              </View>
              <EnhancedText
                weight="light"
                style={{
                  ...theme.typography.sizes.sm,
                  fontStyle: 'italic',
                  paddingRight: theme.spacing.xxs,
                }}>
                {item.meanings[0].speech_part}
                <EnhancedText>. </EnhancedText>
                <EnhancedText style={{ ...theme.typography.sizes.sm, fontStyle: 'normal' }}>
                  {item.meanings[0].def}
                </EnhancedText>
              </EnhancedText>

              <View style={{ width: '100%' }}>
                <Separator height={2} />
              </View>

              <EnhancedText
                style={{
                  ...theme.typography.sizes.sm,
                  fontStyle: 'normal',
                  color: isDark ? theme.colors.primary100 : theme.colors.primary900,
                }}>
                {item.meanings[0].example}
              </EnhancedText>
            </View>
          </View>
        )}

        {side === 'front' ? (
          <View style={[gStyles.centerRow, { width: '100%', marginBottom: theme.spacing.md }]}>
            <View style={{ width: 160 }}>
              <EnhancedText
                text="Powered by Open Source Dictionary"
                preset="formHelper"
                weight="bold"
                numberOfLines={2}
                style={{ color: theme.colors.textSec, textAlign: 'center' }}
              />
            </View>
            <View style={{ position: 'absolute', right: 0 }}>
              <HeroWithChat hero="discovery" direction="right" />
            </View>
          </View>
        ) : (
          <View>
            <HeartIcon />
          </View>
        )}
      </View>
    </Card>
  );
};
