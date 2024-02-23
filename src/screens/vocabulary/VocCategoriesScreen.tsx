import React, { useRef } from 'react';
import { Animated, ScrollView, StyleSheet } from 'react-native';

import { ContainerWithInsets, EnhancedText } from '@/ui/core';
import { DynamicHeader } from './DynamicHeader';

export const DATA = [
  {
    id: 1,
    title: 'Modern JS: A curated collection',
  },
  {
    id: 2,
    title: 'JavaScript notes for professionals',
  },
  {
    id: 3,
    title: 'JavaScript: The Good Parts',
  },
  {
    id: 4,
    title: 'JavaScript: The right way',
  },
  {
    id: 5,
    title: 'Exploring ES6',
  },
  {
    id: 6,
    title: 'JavaScript Enlightenment',
  },
  {
    id: 7,
    title: 'You dont know JS',
  },
  {
    id: 8,
    title: 'Learn JavaScript',
  },
  {
    id: 9,
    title: 'JavaScript succintly',
  },
  {
    id: 10,
    title: 'Human JavaScript',
  },
  {
    id: 11,
    title: 'JavaScript design patterns',
  },
  {
    id: 12,
    title: 'JS50: 50 illustrations in JS',
  },
  {
    id: 13,
    title: 'Eloqent JavaScript',
  },
  {
    id: 14,
    title: 'Practical ES6',
  },
  {
    id: 15,
    title: 'Speaking JavaScript',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    margin: 0,
  },
  scrollText: {
    fontSize: 19,
    textAlign: 'center',
    padding: 20,
    color: '#000',
  },
});

// TODO: word of the day will be provided via network
export const VocCategoriesScreen = () => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  return (
    <ContainerWithInsets>
      <DynamicHeader animHeaderValue={scrollOffsetY} />
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }], {
          useNativeDriver: true,
        })}>
        {DATA.map(book => {
          return (
            <EnhancedText style={styles.scrollText} key={book.id}>
              {book.title}
            </EnhancedText>
          );
        })}
      </ScrollView>
    </ContainerWithInsets>
  );
};
