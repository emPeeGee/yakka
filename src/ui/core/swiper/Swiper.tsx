import React, { useCallback, useMemo, useRef } from 'react';
import {
  StyleSheet,
  View,
  useWindowDimensions,
  FlatList,
  ViewToken,
  ImageSourcePropType,
  Platform,
} from 'react-native';

import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import { Theme, VoidCb } from '@/types';
import { useTheme } from '@/ui/theme';
import { SwiperItem } from './Item';
import { SwiperButton } from './SwiperButton';
import { Pagination } from './SwiperPagination';

export type SwiperItemType = {
  id: number;
  image: ImageSourcePropType;
  title: string;
  text: string;
};

type SwiperProps = {
  items: SwiperItemType[];
  onFinish: VoidCb;
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

  const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;

      if (Platform.OS === 'web') {
        flatListIndex.value = event.contentOffset.x / SCREEN_WIDTH;
      }
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        ref={flatListRef as any}
        data={items}
        keyExtractor={item => String('itemid' + item.id)}
        renderItem={({ item, index }) => <SwiperItem index={index} item={item} x={x} />}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
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
  });
