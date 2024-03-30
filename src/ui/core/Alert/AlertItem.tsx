import { useEffect, useMemo, useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Animated, {
  CurvedTransition,
  FadeIn,
  FadeOut,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@/ui/theme';
import { ALERT_LEVEL, AlertItemType } from './types';
import { EnhancedText } from '../EnhancedText';

export function useLayout() {
  const [layout, setLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const onLayout = useCallback((e: any) => setLayout(e.nativeEvent.layout), []);

  return {
    onLayout,
    ...layout,
  };
}

type Props = {
  item: AlertItemType;
  onRemoved: (id: string) => void;
};

const DEFAULT_DURATION = 3000;

export function AlertItem({ item, onRemoved }: Props) {
  const { theme } = useTheme();
  const { width, onLayout } = useLayout();

  const barWidth = useSharedValue(0);

  useEffect(() => {
    if (width) {
      barWidth.value = width;
      if (item.duration !== -1) {
        barWidth.value = withTiming(0, { duration: item.duration || DEFAULT_DURATION }, () => {
          runOnJS(onRemoved)(item.id);
        });
      }
    }
  }, [width]);

  const levelStyle = useMemo(() => {
    switch (item.level) {
      case ALERT_LEVEL.Success:
        return {
          backgroundColor: theme.colors.success,
          color: theme.colors.base0,
          barColor: theme.colors.successBackground,
        };
      case ALERT_LEVEL.Info:
        return {
          backgroundColor: theme.colors.info,
          color: theme.colors.base0,
          barColor: theme.colors.mint,
        };
      case ALERT_LEVEL.Error:
        return {
          backgroundColor: theme.colors.error,
          color: theme.colors.base0,
          barColor: theme.colors.errorBackground,
        };
    }
  }, [item]);

  const barStyle = useAnimatedStyle(() => {
    return {
      width: barWidth.value,
      backgroundColor: levelStyle.barColor,
    };
  }, []);

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={CurvedTransition}
      pointerEvents={item.onPress ? 'auto' : 'none'}
      onLayout={onLayout}
      style={[styles.container, levelStyle, item.options?.containerStyle]}>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => {
          item.onPress?.(() => {
            onRemoved(item.id);
          });
        }}>
        <EnhancedText
          tx={item.tx}
          text={item.text}
          style={[{ color: levelStyle.color, textAlign: 'center' }, item.options?.textStyle]}
        />
      </TouchableOpacity>
      {!item.noTimeoutBar && (
        <Animated.View
          style={[
            styles.bar,
            {
              backgroundColor: levelStyle.barColor,
            },
            item.options?.timeoutBarStyle,
            barStyle,
          ]}
        />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
    width: '100%',
    overflow: 'hidden',
  },
  wrapper: {
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bar: {
    height: 5,
  },
});
