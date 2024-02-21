import { useRef } from 'react';
import { View, StyleSheet } from 'react-native';

import { Word } from '@/types';
import {
  Button,
  ContainerWithInsets,
  EnhancedPressable,
  EnhancedText,
  CardStackItem,
  CardStack,
} from '@/ui/core';
import { HeartIcon, BookBookmarkIcon, MagnifyingGlassIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { WordCard } from './WordCard';
import vocabulary from '../../mocks/vocabulary.json';

const styles = StyleSheet.create({
  content: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 360,
    height: 560,
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
              Left={() => BookBookmarkIcon({ width: 24, height: 24 })}
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
            Left={() => MagnifyingGlassIcon({ width: 26, height: 26 })}
            style={[{ paddingVertical: theme.spacing.xs, paddingHorizontal: theme.spacing.xs }]}
          />
          {/* TODO: Tooltip */}
          <Button
            // tx="voc.favorites"
            width="auto"
            backgroundColor={theme.colors.secondary500}
            color={theme.colors.primary900}
            Left={() => HeartIcon({ width: 26, height: 26, fill: theme.colors.primary900 })}
            style={{ paddingVertical: theme.spacing.xs, paddingHorizontal: theme.spacing.xs }}
          />
        </View>

        <View style={{ minWidth: 320, minHeight: 560 }}>
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
            <CardStackItem style={[styles.card]}>
              <WordCard word={vocabulary.mighty as Word} />
            </CardStackItem>
            <CardStackItem style={[styles.card]} onSwipedLeft={() => alert('left swipe')}>
              <WordCard word={vocabulary.mildly as Word} />
            </CardStackItem>
            <CardStackItem style={[styles.card]}>
              <WordCard word={vocabulary.momently as Word} />
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
      </View>
    </ContainerWithInsets>
  );
};
