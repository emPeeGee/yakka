import { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { translate } from '@/core/i18n';
import { Theme } from '@/types';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import { EnhancedText, TextProps } from '../EnhancedText';

type HeroWithChatProps = {
  text?: TextProps['text'];
  tx?: TextProps['tx'];
  txOptions?: TextProps['txOptions'];
  chatPosition?: 'right' | 'top';
};

export const HeroWithChat = ({
  tx,
  text,
  txOptions,
  chatPosition = 'right',
}: HeroWithChatProps) => {
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();
  const styles = getStyles(theme);

  const i18nText = tx && translate(tx, txOptions);
  const textChat = i18nText || text;

  const isChatRight = chatPosition === 'right';

  const [currentIndicatorLayout, setCurrentIndicatorLayout] = useState<{
    width: number;
    height: number;
  } | null>(null);

  return (
    <View>
      <View style={[isChatRight ? gStyles.centerRow : gStyles.centerColumn]}>
        <View style={[gStyles.centerRow]}>
          <Image
            source={require('../../../assets/hero/heroToL.png')}
            style={{
              width: 170,
              height: 170,
              transform: [{ scale: 1.3 }, { translateY: isChatRight ? 16 : 8 }],
            }}
          />
        </View>
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
                      left: currentIndicatorLayout ? currentIndicatorLayout?.width / 2 - 24 / 2 : 0,
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
          <EnhancedText size="sm" weight="medium" style={{ textAlign: 'center' }}>
            {textChat}
          </EnhancedText>
        </View>
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

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    chatShape: {
      // width: 180,
      borderWidth: theme.borders.medium,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
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
      top: -22,
      borderLeftWidth: OUTER_TRIANGLE.height,
      borderRightWidth: OUTER_TRIANGLE.height,
      borderBottomWidth: OUTER_TRIANGLE.width,

      borderBottomColor: theme.colors.border,
      transform: [{ rotate: '0deg' }],
    },
    topInnerShape: {
      left: '50%',
      top: -18,
      borderLeftWidth: INNER_TRIANGLE.height,
      borderRightWidth: INNER_TRIANGLE.height,
      borderBottomWidth: INNER_TRIANGLE.width,
      borderBottomColor: theme.colors.background,
      transform: [{ rotate: '0deg' }],
      zIndex: 2,
    },

    rightOuterShape: {
      left: -24,
      top: '50%',
      // right: 0,
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
