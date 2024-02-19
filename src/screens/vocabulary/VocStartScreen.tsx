import { useRef } from 'react';
import { Animated, View } from 'react-native';

import { Word } from '@/types';
import {
  Button,
  ContainerWithInsets,
  EnhancedText,
  Card,
  HeroWithChat,
  Separator,
} from '@/ui/core';
import { UserCircleIcon, PasswordIcon, BookIcon, HeartIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { FlipCard } from './FlipCard';
import vocabulary from '../../mocks/vocabulary.json';

export const VocStartScreen = () => {
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();
  const cardRef = useRef<any>();

  return (
    <ContainerWithInsets>
      <View
        style={[
          {
            width: '100%',
            gap: theme.spacing.md,
            paddingVertical: theme.spacing.md,
            backgroundColor: theme.colors.primary100,
          },
          gStyles.centerColumn,
        ]}>
        <View style={[gStyles.centerRowBetween, { gap: theme.spacing.xs, width: '100%' }]}>
          <View style={[gStyles.fullWidthFromStart, { width: 'auto' }]}>
            <Button
              tx="voc.seeWordOfTheDay"
              width="auto"
              backgroundColor={theme.colors.secondary500}
              color={theme.colors.primary900}
              Left={() => UserCircleIcon({ width: 24, height: 24 })}
              style={[{ paddingVertical: theme.spacing.xs }]}
              textStyle={{ fontSize: theme.typography.sizes.xs.fontSize, textTransform: 'none' }}
            />
          </View>
          {/* TODO: Tooltip */}
          <Button
            // tx="voc.search"
            width="auto"
            backgroundColor={theme.colors.secondary500}
            color={theme.colors.primary900}
            Left={() => PasswordIcon({ width: 24, height: 24 })}
            style={[{ paddingVertical: theme.spacing.xs, paddingHorizontal: theme.spacing.xxs }]}
          />
          {/* TODO: Tooltip */}
          <Button
            // tx="voc.favorites"
            width="auto"
            backgroundColor={theme.colors.secondary500}
            color={theme.colors.primary900}
            Left={() => PasswordIcon({ width: 24, height: 24 })}
            style={{ paddingVertical: theme.spacing.xs, paddingHorizontal: theme.spacing.xxs }}
          />
        </View>

        <Button
          text="Flip"
          onPress={() => {
            cardRef.current?._toggleCard();
          }}
        />
        <View>
          <FlipCard flipHorizontal flipVertical={false} ref={cardRef}>
            <SwipeCard
              side="front"
              item={vocabulary.mighty as Word}
              isFirst
              renderChoice={() => <EnhancedText text="213" />}
            />

            <SwipeCard
              side="back"
              item={vocabulary.momently as Word}
              isFirst
              renderChoice={() => <EnhancedText text="213" />}
            />
          </FlipCard>

          {/* <CardFlip ref={card}>
            <EnhancedPressable onPress={() => card.current.flip()}>
              <SwipeCard
                item={vocabulary.mighty as Word}
                isFirst
                renderChoice={() => <EnhancedText text="213" />}
              />
            </EnhancedPressable>

            <EnhancedPressable onPress={() => card.current.tip()}>
              <SwipeCard
                item={vocabulary.momently as Word}
                isFirst
                renderChoice={() => <EnhancedText text="213" />}
              />
            </EnhancedPressable>
          </CardFlip> */}

          {/* <SwipeCard
              item={vocabulary.mighty as Word}
              isFirst
              renderChoice={() => <EnhancedText text="213" />}
            /> */}
        </View>
      </View>
    </ContainerWithInsets>
  );
};

export interface SwipeCardProps {
  item: Word;
  swipe: Animated.ValueXY;
  isFirst: boolean;
  renderChoice: (swipe: any) => React.JSX.Element;
  side: 'front' | 'back';
}

export const SwipeCard = ({ item, swipe, isFirst, renderChoice, side }: SwipeCardProps) => {
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();

  return (
    <Card minWidth={375} minHeight={500}>
      <View style={[gStyles.centerColumn, { gap: theme.spacing.lg, height: '100%' }]}>
        {isFirst && renderChoice(swipe)}

        <View
          style={[
            gStyles.centerRow,
            {
              backgroundColor: theme.colors.base40,
              borderRadius: theme.borderRadius.xl,
              padding: theme.spacing.sm,
              gap: theme.spacing.xs,
            },
          ]}>
          <BookIcon width={24} height={24} />
          <EnhancedText text="All words" weight="bold" style={{ ...theme.typography.sizes.sm }} />
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
                  backgroundColor: theme.colors.primary100,
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
                    backgroundColor: theme.colors.primary100,
                    borderRadius: theme.borderRadius.lg,
                    gap: theme.spacing.xs,
                  },
                ]}>
                <EnhancedText style={{ ...theme.typography.sizes.md }}>
                  {item.pronunciation}
                </EnhancedText>
                {/* // TODO: Speaker icon */}
                <HeartIcon width={28} height={28} />
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
                  color: theme.colors.primary900,
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
