import React, { useRef, useState } from 'react';
import { Animated, ScrollView, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { translate } from '@/core/i18n';
import {
  ChoiceGroup,
  Emoji,
  FocusAwareStatusBar,
  HeaderScroll,
  HeroEmptyState,
  TextField,
} from '@/ui/core';
import { MagnifyingGlassIcon } from '@/ui/icons';
import { useTheme } from '@/ui/theme';
import { useExploreStore } from './exploreState';

export const ExpFavoritesScreen = () => {
  const { theme } = useTheme();
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const { exploreUsers } = useExploreStore();
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
              {exploreUsers.length === 0 ? (
                <View style={{ paddingTop: theme.spacing.xl }}>
                  <HeroEmptyState notFound={!!favoriteInput} />
                </View>
              ) : (
                <ChoiceGroup
                  options={exploreUsers
                    .filter(
                      exp =>
                        translate(exp?.explore?.lesson_name).includes(
                          favoriteInput.toLocaleLowerCase(),
                        ) && exp.liked,
                    )
                    .map(expUser => ({
                      value: expUser.explore,
                      tx: expUser.explore?.lesson_name,
                      Right: () => <Emoji emoji={expUser.explore?.emoji} />,
                    }))}
                  onChange={expUser => {
                    setTimeout(() => {
                      navigate('ExpContent' as never, expUser as never);
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
