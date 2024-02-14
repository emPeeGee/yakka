import { Animated, View } from 'react-native';

import { Word } from '@/types';
import { Button, ContainerWithInsets, EnhancedText, Card } from '@/ui/core';
import { UserCircleIcon, PasswordIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';
import vocabulary from '../../mocks/vocabulary.json';

export const VocStartScreen = () => {
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();

  return (
    <ContainerWithInsets>
      <View
        style={[
          { width: '100%', gap: theme.spacing.md, paddingVertical: theme.spacing.md },
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

        <View>
          <View>
            <SwipeCard
              item={vocabulary.mighty as Word}
              isFirst
              renderChoice={() => <EnhancedText text="213" />}
            />
          </View>
        </View>
      </View>
    </ContainerWithInsets>
  );
};

export interface ISwipeCardChildren {
  item: Word;
  swipe: Animated.ValueXY;
  isFirst: boolean;
  renderChoice: (swipe: any) => React.JSX.Element;
}

export const SwipeCard = ({ item, swipe, isFirst, renderChoice }: ISwipeCardChildren) => {
  const { theme } = useTheme();
  const gStyles = useGlobalThemedStyles();
  return (
    <Card minWidth={375} minHeight={400}>
      {/* <Card img={item.profileImg} minWidth={400} maxHeight={400} minHeight={400}> */}
      {isFirst && renderChoice(swipe)}
      <View
        style={[
          gStyles.centerRow,
          {
            position: 'relative',
            width: '100%',
            height: 240 * Math.sqrt(2),
          },
        ]}>
        <View
          style={{
            position: 'absolute',
            width: 240,
            height: 240,
            backgroundColor: theme.colors.primary100,
            borderRadius: theme.borderRadius.xl,
            transform: [{ rotate: '45deg' }],
          }}
        />
        <View style={gStyles.centerColumn}>
          <EnhancedText preset="heading">{item.word}</EnhancedText>
          <EnhancedText preset="formHelper">{item.meanings[0].speech_part}</EnhancedText>
        </View>
      </View>
      <Button text="Hee" />
    </Card>
  );
};
