import React, { useRef, useState } from 'react';
import { Animated, ScrollView, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import {
  ChoiceGroup,
  EnhancedText,
  FocusAwareStatusBar,
  HeaderScroll,
  HeroEmptyState,
  TextField,
} from '@/ui/core';
import { MagnifyingGlassIcon } from '@/ui/icons';
import { useTheme } from '@/ui/theme';
import { useVocabularyStore } from './vocabularyState';

export const VocFavoritesScreen = () => {
  const { theme } = useTheme();
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const { favorites } = useVocabularyStore();
  const [favoriteInput, setFavoriteInput] = useState('');
  const { navigate } = useNavigation();

  return (
    <View style={{ padding: theme.spacing.md, flex: 1 }}>
      <HeaderScroll title="voc.favoritesHand" withBackButton>
        <View style={{ paddingVertical: theme.spacing.md }}>
          <FocusAwareStatusBar />
          <View>
            <TextField
              value={favoriteInput}
              onChangeText={setFavoriteInput}
              placeholderTx="voc.searchWord"
              RightAccessory={props => (
                <View style={[props.style]}>
                  <MagnifyingGlassIcon />
                </View>
              )}
            />
          </View>
          <ScrollView
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingVertical: theme.spacing.md }}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }], {
              useNativeDriver: false, // NOTE: native driver doesn't work on ios (not sure on Android) https://stackoverflow.com/questions/55055873/react-native-animated-with-usenativedriver-reactnative-animated-event-is
            })}>
            <View>
              {favorites.length === 0 ? (
                <View style={{ paddingTop: theme.spacing.xl }}>
                  <HeroEmptyState notFound={!!favoriteInput} />
                </View>
              ) : (
                <ChoiceGroup
                  options={favorites
                    .filter(
                      word => word.word.includes(favoriteInput.toLocaleLowerCase()) && word.liked,
                    )
                    .map(favorite => ({
                      value: favorite.word,
                      label: favorite.word,
                      Right: () => (
                        <EnhancedText
                          style={[{ color: theme.colors.textDis }, theme.typography.sizes.sm]}>
                          {favorite.part_of_speech}
                        </EnhancedText>
                      ),
                    }))}
                  onChange={word => {
                    setTimeout(() => {
                      navigate('VocWord' as never, { word } as never);
                    });
                  }}
                />
              )}
            </View>
          </ScrollView>
        </View>
      </HeaderScroll>
    </View>
  );
};
