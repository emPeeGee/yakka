import { useState } from 'react';
import { View, Image, StyleSheet, ImageBackground, ImageURISource } from 'react-native';

import { Theme } from '@/types';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { EnhancedText, TextProps } from '../EnhancedText';

type HeroStyle =
  | 'default'
  | 'vampire'
  | 'flowers'
  | 'discovery'
  | 'question'
  | 'clock'
  | 'tears'
  | 'magician';

type HeroWithChatProps = {
  text?: TextProps['text'];
  tx?: TextProps['tx'];
  txOptions?: TextProps['txOptions'];
  chatPosition?: 'no-chat' | 'right' | 'top';
  hero?: HeroStyle;
  width?: number;
  height?: number;
  withConfetti?: boolean;
  direction?: 'left' | 'right';
};

const HERO_STYLES: Record<HeroStyle, ImageURISource> = {
  default: require('../../../assets/hero/heroToR.png'),
  vampire: require('../../../assets/hero/heroVampire.png'),
  flowers: require('../../../assets/hero/heroWithFlowers.png'),
  discovery: require('../../../assets/hero/heroDiscovery.png'),
  question: require('../../../assets/hero/heroWithQuestion.png'),
  clock: require('../../../assets/hero/heroWithClock.png'),
  tears: require('../../../assets/hero/heroWithTears.png'),
  magician: require('../../../assets/hero/heroMagician.png'),
};

// TODO: triangle is too big

// TODO: crop all images and remove scale
export const HeroWithChat = ({
  tx,
  text,
  txOptions,
  hero = 'default',
  chatPosition = 'no-chat',
  withConfetti = false,
  direction = 'right',
  width = 50,
  height = 50,
}: HeroWithChatProps) => {
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();
  const isChatRight = chatPosition === 'right';
  const styles = getStyles(theme, isChatRight);
  const [currentIndicatorLayout, setCurrentIndicatorLayout] = useState<{
    width: number;
    height: number;
  } | null>(null);

  return (
    <View style={styles.container}>
      {withConfetti && (
        <ImageBackground
          source={require('../../../assets/confetti.png')}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            transform: [{ scale: 1.2 }],
          }}
        />
      )}
      <View style={[isChatRight ? gStyles.centerRow : gStyles.centerColumnReverse]}>
        <View style={[styles.hero, gStyles.centerRow]}>
          <Image
            source={HERO_STYLES[hero]}
            style={{
              width,
              height,
              transform: [
                // { scale: 1.3 },
                { scaleX: direction === 'left' ? -1 : 1 },
              ],
            }}
          />
        </View>
        {chatPosition !== 'no-chat' && (
          <View
            onLayout={e => {
              setCurrentIndicatorLayout({
                height: e.nativeEvent.layout.height,
                width: e.nativeEvent.layout.width,
              });
            }}
            style={styles.chatShape}>
            <View
              style={[
                styles.triangle,
                isChatRight ? styles.rightOuterShape : styles.topOuterShape,
                {
                  ...(isChatRight
                    ? {
                        top: currentIndicatorLayout
                          ? currentIndicatorLayout?.height / 2 - OUTER_TRIANGLE.width / 2
                          : 0,
                      }
                    : {}),
                },
                {
                  ...(!isChatRight
                    ? {
                        left: currentIndicatorLayout
                          ? currentIndicatorLayout?.width / 2 - 24 / 2
                          : 0,
                      }
                    : {}),
                },
              ]}
            />
            <View
              style={[
                styles.triangle,
                isChatRight ? styles.rightInnerShape : styles.topInnerShape,
                {
                  ...(isChatRight
                    ? {
                        top: currentIndicatorLayout
                          ? currentIndicatorLayout?.height / 2 - INNER_TRIANGLE.width / 2
                          : 0,
                      }
                    : {}),
                  ...(!isChatRight
                    ? {
                        left: currentIndicatorLayout
                          ? currentIndicatorLayout?.width / 2 - INNER_TRIANGLE.width / 2
                          : 0,
                      }
                    : {}),
                },
              ]}
            />
            <EnhancedText
              text={text}
              tx={tx}
              txOptions={txOptions}
              size="sm"
              weight="medium"
              style={{ textAlign: 'center' }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const OUTER_TRIANGLE = {
  width: 22,
  height: 12,
};

const INNER_TRIANGLE = {
  width: 18,
  height: 9,
};

const getStyles = (theme: Theme, isChatRight: boolean) =>
  StyleSheet.create({
    container: {
      height: 'auto',
    },
    hero: {
      // NOTE: These lines causes too issue on android device
      // flexShrink: 1,
      // flexGrow: 1,
    },
    heroImage: {
      width: 140,
      height: 140,
      transform: [{ scale: 1.4 }],
    },
    chatShape: {
      width: 'auto',
      flex: isChatRight ? 1 : undefined,
      marginLeft: isChatRight ? 22 : 0,
      borderWidth: theme.borders.medium,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
      backgroundColor: theme.colors.background,
    },
    triangle: {
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      backgroundColor: 'transparent',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
    },

    topOuterShape: {
      left: '50%',
      bottom: -22,
      borderLeftWidth: OUTER_TRIANGLE.height,
      borderRightWidth: OUTER_TRIANGLE.height,
      borderBottomWidth: OUTER_TRIANGLE.width,

      borderBottomColor: theme.colors.border,
      transform: [{ rotate: '180deg' }],
    },
    topInnerShape: {
      left: '50%',
      bottom: -18,
      borderLeftWidth: INNER_TRIANGLE.height,
      borderRightWidth: INNER_TRIANGLE.height,
      borderBottomWidth: INNER_TRIANGLE.width,
      borderBottomColor: theme.colors.background,
      transform: [{ rotate: '180deg' }],
      zIndex: 2,
    },

    rightOuterShape: {
      left: -24,
      top: '50%',
      borderLeftWidth: OUTER_TRIANGLE.height,
      borderRightWidth: OUTER_TRIANGLE.height,
      borderBottomWidth: OUTER_TRIANGLE.width,
      borderBottomColor: theme.colors.border,
      transform: [{ rotate: '-90deg' }],
    },
    rightInnerShape: {
      left: -18,
      borderLeftWidth: INNER_TRIANGLE.height,
      borderRightWidth: INNER_TRIANGLE.height,
      borderBottomWidth: INNER_TRIANGLE.width,
      borderBottomColor: theme.colors.background,
      transform: [{ rotate: '-90deg' }],
      zIndex: 2,
    },
  });
