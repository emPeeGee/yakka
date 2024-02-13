import React, { ReactElement, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue, runOnUI, runOnJS } from 'react-native-reanimated';

import { EnhancedText, ContainerWithInsets } from '@/ui/core';
import { useTheme } from '@/ui/theme';
import { MARGIN_LEFT } from './Layout';
import Lines from './Lines';
import SortableWord from './SortableWord';
import Word from './Word';

const words = [
  { id: 1, word: 'Er' },
  { id: 8, word: 'hungrig' },
  { id: 2, word: 'isst' },
  { id: 7, word: 'er' },
  { id: 6, word: 'weil' },
  { id: 9, word: 'ist' },
  { id: 5, word: ',' },
  { id: 3, word: 'einen' },
  { id: 4, word: 'Apfel' },
];

const containerWidth = Dimensions.get('window').width - MARGIN_LEFT * 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: MARGIN_LEFT,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    opacity: 0,
  },
});

interface WordListProps {
  children: ReactElement<{ id: number }>[];
}

const WordList = ({ children }: WordListProps) => {
  const [ready, setReady] = useState(false);
  const offsets = children.map(() => ({
    order: useSharedValue(0),
    width: useSharedValue(0),
    height: useSharedValue(0),
    x: useSharedValue(0),
    y: useSharedValue(0),
    originalX: useSharedValue(0),
    originalY: useSharedValue(0),
  }));
  if (!ready) {
    return (
      <View style={styles.row}>
        {children.map((child, index) => {
          return (
            <View
              key={index}
              onLayout={({
                nativeEvent: {
                  layout: { x, y, width, height },
                },
              }) => {
                const offset = offsets[index]!;
                offset.order.value = -1;
                offset.width.value = width;
                offset.height.value = height;
                offset.originalX.value = x;
                offset.originalY.value = y;
                runOnUI(() => {
                  'worklet';
                  if (offsets.filter(o => o.order.value !== -1).length === 0) {
                    runOnJS(setReady)(true);
                  }
                })();
              }}>
              {child}
            </View>
          );
        })}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Lines />
      {children.map((child, index) => (
        <SortableWord key={index} offsets={offsets} index={index} containerWidth={containerWidth}>
          {child}
        </SortableWord>
      ))}
    </View>
  );
};

export default WordList;

export const LessonScreen = () => {
  const { theme } = useTheme();

  return (
    <ContainerWithInsets>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'green' }}>
        <View style={{ flex: 1 }}>
          <EnhancedText size="xxl">Hello, Mate</EnhancedText>
          <EnhancedText
            size="xl"
            style={{
              color: theme.colors.textSec,
            }}>
            What would you like to learn today?
          </EnhancedText>
          <View style={{ flex: 1, backgroundColor: 'red' }}>
            <WordList>
              {words.map(word => (
                <Word key={word.id} {...word} />
              ))}
            </WordList>
          </View>
        </View>
      </GestureHandlerRootView>
    </ContainerWithInsets>
  );
};
