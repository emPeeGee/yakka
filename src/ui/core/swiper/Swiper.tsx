import React, { useCallback, useMemo } from 'react';
import {
  StyleSheet,
  View,
  useWindowDimensions,
  FlatList,
  ViewToken,
  ImageSourcePropType,
} from 'react-native';

import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import { Theme } from '@/types';
import { useTheme } from '@/ui/theme';
import { SwiperItem } from './Item';
import { SwiperButton } from './SwiperButton';
import { Pagination } from './SwiperPagination';
import { EnhancedText } from '../EnhancedText';

export type SwiperItemType = {
  id: number;
  image: ImageSourcePropType;
  title: string;
  text: string;
};

type SwiperProps = {
  items: SwiperItemType[];
  onFinish: () => void;
};

export const Swiper = ({ items, onFinish }: SwiperProps) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const flatListIndex = useSharedValue(0);
  const flatListRef = useAnimatedRef<FlatList>();
  const x = useSharedValue(0);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      flatListIndex.value = viewableItems[0].index ?? 0;
    },
    [],
  );

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        ref={flatListRef as any}
        data={items}
        keyExtractor={item => String(item.id)}
        renderItem={({ item, index }) => <SwiperItem index={index} item={item} x={x} />}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />

      <View style={styles.footerContainer}>
        <Pagination data={items} screenWidth={SCREEN_WIDTH} x={x} />
        <SwiperButton
          flatListIndex={flatListIndex}
          flatListRef={flatListRef}
          dataLength={items.length}
          onFinish={onFinish}
        />
      </View>
      <View style={styles.logInContainer}>
        <EnhancedText> Already a yakka user? Log in</EnhancedText>
      </View>
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    itemContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    footerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: 20,
    },
    logInContainer: {
      margin: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
