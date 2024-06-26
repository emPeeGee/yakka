import { useEffect, useRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useAuth } from '@/core/providers';
import {
  Button,
  ContainerWithInsets,
  EnhancedPressable,
  EnhancedText,
  CardStackItem,
  CardStack,
  Loader,
  Tooltip,
  HeroEmptyState,
  Card,
  HeaderPlaceholder,
} from '@/ui/core';
import { HeartIcon, BookBookmarkIcon, MagnifyingGlassIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { CARD_HEIGHT, CARD_WIDTH } from './constants';
import { useVocabularyStore } from './vocabularyState';
import { WordCard } from './WordCard';

// TODO: to be deleted
const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
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
    borderRadius: 75,
    borderWidth: 6,
    borderColor: '#01df8a',
  },
  red: {
    width: 75,
    height: 75,
    borderRadius: 75,
    borderWidth: 6,
    borderColor: '#fd267d',
  },
});

export const VocStartScreen = () => {
  const { theme, appColorScheme } = useTheme();
  const gStyles = useGlobalThemedStyles();
  const { navigate } = useNavigation();
  const { words, init, isLoading, setIsLoading } = useVocabularyStore();
  const { withAccessControl } = useAuth();

  const swiperRef = useRef<any>();
  const searchTooltipRef = useRef<Tooltip>(null);
  const favoritesTooltipRef = useRef<Tooltip>(null);

  useEffect(() => {
    setIsLoading(true);
    init();
  }, []);

  useEffect(() => {
    if (words.length > 0) {
      swiperRef.current.initDeck();
    }
  }, [words]);

  return (
    <ContainerWithInsets withoutBottom>
      {isLoading && words.length === 0 ? (
        <View style={[gStyles.centerColumn, { height: '100%' }]}>
          <Loader />
        </View>
      ) : (
        <View
          style={[
            {
              height: '100%',
              flex: 1,
              width: '100%',
              gap: theme.spacing.md,
              paddingVertical: theme.spacing.md,
              paddingHorizontal: theme.spacing.md,
              backgroundColor:
                appColorScheme === 'dark' ? theme.colors.background : theme.colors.primary100,
            },
            gStyles.centerColumn,
          ]}>
          <HeaderPlaceholder />
          <View style={[gStyles.centerRowBetween, { gap: theme.spacing.xs, width: '100%' }]}>
            <Button
              tx="voc.seeWordOfTheDay"
              width="auto"
              backgroundColor={theme.colors.secondary500}
              color={theme.colors.primary900}
              Left={() => BookBookmarkIcon({ width: 24, height: 24 })}
              style={[{ paddingVertical: theme.spacing.xs }]}
              textStyle={{ fontSize: theme.typography.sizes.xs.fontSize, textTransform: 'none' }}
              onPress={withAccessControl(
                () => navigate('VocWordOfTheDay' as never),
                () => navigate('Auth' as never, { screen: 'AuthSignUp' }),
              )}
            />
            <View style={[gStyles.fullWidthFromStart, { width: 'auto' }]} />

            <Tooltip
              ref={searchTooltipRef}
              actionType="longPress"
              height="auto"
              backgroundColor={theme.colors.info}
              pointerColor={theme.colors.info}
              popover={<EnhancedText style={{ color: theme.colors.base0 }} tx="voc.search" />}>
              <Button
                width="auto"
                backgroundColor={theme.colors.secondary500}
                color={theme.colors.primary900}
                Left={() => MagnifyingGlassIcon({ width: 26, height: 26 })}
                style={[{ paddingVertical: theme.spacing.xs, paddingHorizontal: theme.spacing.xs }]}
                onLongPress={() => {
                  searchTooltipRef.current?.toggleTooltip();
                }}
                onPress={withAccessControl(
                  () => navigate('VocCategories' as never),
                  () => navigate('Auth' as never, { screen: 'AuthSignUp' }),
                )}
              />
            </Tooltip>
            <Tooltip
              ref={favoritesTooltipRef}
              actionType="longPress"
              height="auto"
              backgroundColor={theme.colors.info}
              pointerColor={theme.colors.info}
              popover={<EnhancedText style={{ color: theme.colors.base0 }} tx="voc.favorites" />}>
              <Button
                width="auto"
                backgroundColor={theme.colors.secondary500}
                color={theme.colors.primary900}
                Left={() => HeartIcon({ width: 26, height: 26, fill: theme.colors.primary900 })}
                style={{ paddingVertical: theme.spacing.xs, paddingHorizontal: theme.spacing.xs }}
                onPress={withAccessControl(
                  () => navigate('VocFavorites' as never),
                  () => navigate('Auth', { screen: 'AuthSignUp' }),
                )}
                onLongPress={() => {
                  favoritesTooltipRef.current?.toggleTooltip();
                }}
              />
            </Tooltip>
          </View>
          <View>
            <CardStack
              style={[styles.content]}
              renderNoMoreCards={() => (
                <Card
                  style={[
                    gStyles.centerColumn,
                    // 24 is padding
                    { height: CARD_HEIGHT + 24 * 2 + 12, width: CARD_WIDTH + 24 * 2 - 12 },
                  ]}>
                  <HeroEmptyState title="voc.noMoreCardsTit" description="voc.noMoreCardsDesc" />
                </Card>
              )}
              ref={swiper => {
                swiperRef.current = swiper;
              }}
              theme={theme}
              onSwiped={() => console.log('onSwiped')}
              onSwipedLeft={() => console.log('onSwipedLeft')}>
              {words.map(word => (
                <CardStackItem key={word.word}>
                  <WordCard word={word} />
                </CardStackItem>
              ))}
            </CardStack>
          </View>
          {Platform.OS === 'web' && (
            <View style={styles.footer}>
              <View style={styles.buttonContainer}>
                <EnhancedPressable
                  style={[styles.button, styles.red, { backgroundColor: theme.colors.background }]}
                  onPress={() => {
                    swiperRef.current.swipeLeft();
                  }}>
                  <EnhancedText>to left</EnhancedText>
                </EnhancedPressable>
                <EnhancedPressable
                  style={[
                    styles.button,
                    styles.orange,
                    { backgroundColor: theme.colors.background },
                  ]}
                  onPress={() => {
                    swiperRef.current.goBackFromLeft();
                  }}>
                  <EnhancedText>restart</EnhancedText>
                </EnhancedPressable>
                <EnhancedPressable
                  style={[
                    styles.button,
                    styles.green,
                    { backgroundColor: theme.colors.background },
                  ]}
                  onPress={() => {
                    swiperRef.current.swipeRight();
                  }}>
                  <EnhancedText>to right</EnhancedText>
                </EnhancedPressable>
              </View>
            </View>
          )}
        </View>
      )}
    </ContainerWithInsets>
  );
};
