import React, { ReactElement, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { EnhancedText, ContainerWithInsets } from '@/ui/core';
import { useTheme } from '@/ui/theme';

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
