import { View, StyleSheet } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useShallow } from 'zustand/react/shallow';

import { TxKeyPath } from '@/core/i18n';
import { Word } from '@/types';
import {
  FlipCard,
  Card,
  EnhancedText,
  Separator,
  HeroWithChat,
  EnhancedPressable,
} from '@/ui/core';
import { BookIcon, SpeakerIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { CARD_HEIGHT, CARD_WIDTH } from './constants';
import { useVocabularyStore } from './vocabularyState';

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

export const FlipCardWrapper = ({ item, side }: FlipCardWrapperProps) => {
  const { theme, isDark } = useTheme();
  const favorite = useVocabularyStore(
    useShallow(state => state.favorites.find(f => f.word_id === item.word_id)),
  );
  const gStyles = useGlobalThemedStyles();
  const isFavorite = useSharedValue(favorite?.liked ? 1 : 0);

  const { setFavorites } = useVocabularyStore();

  const outlineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(isFavorite.value, [0, 1], [1, 0], Extrapolate.CLAMP),
        },
      ],
    };
  });

  const fillStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: isFavorite.value }],
      opacity: isFavorite.value,
    };
  });

  return (
    <Card>
      <View
        style={[
          gStyles.centerColumn,
          { gap: theme.spacing.lg, width: CARD_WIDTH, height: CARD_HEIGHT },
        ]}>
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
            tx={item.word_categories?.category_name as TxKeyPath}
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
                  {item.part_of_speech}
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
                <EnhancedPressable
                  onPress={() => {
                    Speech.speak(item.word, {
                      language: 'en',
                      // TODO: chose voice in the settings
                      // voice: '',
                    });
                  }}>
                  <SpeakerIcon width={28} height={28} />
                </EnhancedPressable>
              </View>
              <EnhancedText
                weight="light"
                style={{
                  ...theme.typography.sizes.sm,
                  fontStyle: 'italic',
                  paddingRight: theme.spacing.xxs,
                }}>
                {item.part_of_speech}
                <EnhancedText>. </EnhancedText>
                <EnhancedText style={{ ...theme.typography.sizes.sm, fontStyle: 'normal' }}>
                  {item.definition}
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
                {item.example}
              </EnhancedText>
            </View>
          </View>
        )}

        {side === 'front' ? (
          <View style={[gStyles.centerRow, { width: '100%', marginBottom: theme.spacing.md }]}>
            {/* <View style={{ width: 160 }}>
              <EnhancedText
                text="Powered by Open Source Dictionary"
                preset="formHelper"
                weight="bold"
                numberOfLines={2}
                style={{ color: theme.colors.textSec, textAlign: 'center' }}
              />
            </View> */}
            {/* <View style={{ position: 'absolute', right: 0 }}> */}
            <HeroWithChat hero="discovery" direction="right" />
            {/* </View> */}
          </View>
        ) : (
          <EnhancedPressable
            onPress={() => {
              isFavorite.value = withSpring(isFavorite.value ? 0 : 1);
              setFavorites(isFavorite.value ? 'delete' : 'add', {
                ...item,
                id: favorite?.id || item.favorite_id,
              });
            }}>
            <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>
              <MaterialCommunityIcons name="heart-outline" size={32} color={theme.colors.chilly} />
            </Animated.View>

            <Animated.View style={fillStyle}>
              <MaterialCommunityIcons name="heart" size={32} color={theme.colors.chilly} />
            </Animated.View>
          </EnhancedPressable>
        )}
      </View>
    </Card>
  );
};
