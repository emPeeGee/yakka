import { useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

import { Word } from '@/types';
import {
  Button,
  ContainerWithInsets,
  EnhancedPressable,
  EnhancedText,
  Card,
  HeroWithChat,
  Separator,
  CardStackItem,
  CardStack,
  FlipCard,
} from '@/ui/core';
import { UserCircleIcon, PasswordIcon, BookIcon, HeartIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import vocabulary from '../../mocks/vocabulary.json';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
  },
  content: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 320,
    height: 470,
    backgroundColor: '#FE474C',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  card1: {
    backgroundColor: '#FE474C',
  },
  card2: {
    backgroundColor: '#FEB12C',
  },
  label: {
    lineHeight: 400,
    textAlign: 'center',
    fontSize: 55,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 220,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  orange: {
    width: 55,
    height: 55,
    borderWidth: 6,
    borderColor: 'rgb(246,190,66)',
    borderRadius: 55,
    marginTop: -15,
  },
  green: {
    width: 75,
    height: 75,
    backgroundColor: '#fff',
    borderRadius: 75,
    borderWidth: 6,
    borderColor: '#01df8a',
  },
  red: {
    width: 75,
    height: 75,
    backgroundColor: '#fff',
    borderRadius: 75,
    borderWidth: 6,
    borderColor: '#fd267d',
  },
});

export const VocStartScreen = () => {
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();
  const cardRef = useRef<any>();
  const swiperRef = useRef<any>();

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

        <View style={{ minWidth: 320, minHeight: 470 }}>
          <CardStack
            style={[styles.content]}
            renderNoMoreCards={() => (
              <EnhancedText style={{ fontWeight: '700', fontSize: 18, color: 'gray' }}>
                No more cards :(
              </EnhancedText>
            )}
            ref={swiper => {
              swiperRef.current = swiper;
            }}
            onSwiped={() => console.log('onSwiped')}
            onSwipedLeft={() => console.log('onSwipedLeft')}>
            <CardStackItem style={[styles.card, styles.card1]}>
              <EnhancedText style={styles.label}>A</EnhancedText>
            </CardStackItem>
            <CardStackItem
              style={[styles.card, styles.card2]}
              onSwipedLeft={() => alert('left swipe')}>
              <EnhancedText style={styles.label}>B</EnhancedText>
            </CardStackItem>
            <CardStackItem style={[styles.card, styles.card1]}>
              <EnhancedText style={styles.label}>C</EnhancedText>
            </CardStackItem>
            <CardStackItem style={[styles.card, styles.card2]}>
              <EnhancedText style={styles.label}>D</EnhancedText>
            </CardStackItem>
            <CardStackItem style={[styles.card, styles.card1]}>
              <EnhancedText style={styles.label}>E</EnhancedText>
            </CardStackItem>
          </CardStack>
        </View>

        <View style={styles.footer}>
          <View style={styles.buttonContainer}>
            <EnhancedPressable
              style={[styles.button, styles.red]}
              onPress={() => {
                swiperRef.current.swipeLeft();
              }}>
              <EnhancedText>to left</EnhancedText>
            </EnhancedPressable>
            <EnhancedPressable
              style={[styles.button, styles.orange]}
              onPress={() => {
                swiperRef.current.goBackFromLeft();
              }}>
              <EnhancedText>restart</EnhancedText>
            </EnhancedPressable>
            <EnhancedPressable
              style={[styles.button, styles.green]}
              onPress={() => {
                swiperRef.current.swipeRight();
              }}>
              <EnhancedText>to right</EnhancedText>
            </EnhancedPressable>
          </View>
        </View>

        <View>
          <FlipCard flipHorizontal flipVertical={false} ref={cardRef}>
            <FlipCardWrapper
              side="front"
              item={vocabulary.mighty as Word}
              isFirst
              renderChoice={() => <EnhancedText text="213" />}
            />

            <FlipCardWrapper
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

export interface FlipCardWrapperProps {
  item: Word;
  swipe: Animated.ValueXY;
  isFirst: boolean;
  renderChoice: (swipe: any) => React.JSX.Element;
  side: 'front' | 'back';
}

export const FlipCardWrapper = ({
  item,
  swipe,
  isFirst,
  renderChoice,
  side,
}: FlipCardWrapperProps) => {
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
