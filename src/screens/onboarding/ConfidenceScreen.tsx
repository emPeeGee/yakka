import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFirstLaunch } from '@/core/providers';
import { Theme } from '@/types';
import { SwiperDataItem, Swiper } from '@/ui/core';
import { useTheme } from '@/ui/theme';

export const onboardingItems: SwiperDataItem[] = [
  {
    id: 1,
    image: require('../../assets/image1.png'),
    title: 'Confidence in your words',
    text: "With conversation-based learning, you'll be talking from lesson one.",
  },
  {
    id: 2,
    image: require('../../assets/image2.png'),
    title: 'Lorem Ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 3,
    image: require('../../assets/image3.png'),
    title: 'Lorem Ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

export const ConfidenceScreen = () => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { setIsFirstLaunch } = useFirstLaunch();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      <Swiper
        items={onboardingItems}
        onFinish={() => {
          setIsFirstLaunch(false);
        }}
      />

      {/* <ConfidenceSvg />
      <EnhancedText></EnhancedText>
      <EnhancedText></EnhancedText>
      <View style={{ flexDirection: 'row' }}>
        <Button title="Choose a language" backgroundColor="#5B7BFE" />
      </View>
      <EnhancedText></EnhancedText> */}
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    itemContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    itemTitle: {
      color: theme.colors.textPri,
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    itemText: {
      color: theme.colors.textPri,
      textAlign: 'center',
      lineHeight: 20,
      marginHorizontal: 30,
    },
    footerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: 20,
    },
  });
