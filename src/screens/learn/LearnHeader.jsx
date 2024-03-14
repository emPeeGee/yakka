import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, Animated, Dimensions, StyleSheet } from 'react-native';
import { EnhancedText, Fade } from '@/ui/core';
import { BalloonIcon, LightningIcon, HeartIcon } from '@/ui/icons';

const HEADER_HEIGHT = 64;

// TODO: refactor into function and add border bottom
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  headerContainer: {
    height: HEADER_HEIGHT,
    backgroundColor: '#009688',
  },
  headerComponentContainer: {
    height: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  headline: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '500',
    letterSpacing: 0.019,
  },
  title: {
    letterSpacing: 0.011,
    fontWeight: '700',
    color: 'black',
  },
  statContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
});

const { height } = Dimensions.get('window');

export class LearnHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    headlineStyle: PropTypes.object,
    children: PropTypes.node,
    containerStyle: PropTypes.object,
    headerContainerStyle: PropTypes.object,
    headerComponentContainerStyle: PropTypes.object,
    scrollContainerStyle: PropTypes.object,
    fadeDirection: PropTypes.string,
    scrollViewProps: PropTypes.object,
    stats: PropTypes.object,
  };

  static defaultProps = {
    scrollViewProps: {},
  };

  state = {
    headerHeight: 0,
    headerY: 0,
    isHeaderScrolled: false,
    fadeDirection: '',
  };

  onLayout = event => {
    this.setState({
      headerHeight: event.nativeEvent.layout.height,
      headerY: event.nativeEvent.layout.y,
    });
  };

  scrollAnimatedValue = new Animated.Value(0);

  handleScroll = event => {
    const offset = event.nativeEvent.contentOffset.y;
    const scrollHeaderOffset = this.state.headerHeight + this.state.headerY - 8;
    const isHeaderScrolled = scrollHeaderOffset < offset;

    if (!this.state.isHeaderScrolled && isHeaderScrolled) {
      this.setState({
        isHeaderScrolled,
      });
    }

    if (this.state.isHeaderScrolled && !isHeaderScrolled) {
      this.setState({
        isHeaderScrolled,
      });
    }
  };

  render() {
    const username = 'Mihail';

    const {
      children,
      title = '',
      titleStyle = {},
      containerStyle = {},
      headerContainerStyle = {},
      headerComponentContainerStyle = {},
      headlineStyle = {},
      scrollContainerStyle = {},
      fadeDirection,
      scrollViewProps = {},
      stats = {},
    } = this.props;

    const fontSize = titleStyle.fontSize || 34;
    const titleStyles = {
      fontSize,
      lineHeight: fontSize * 1.2,
    };

    console.log('aa.', this.scrollAnimatedValue.value);

    const animatedFontSize = this.scrollAnimatedValue.interpolate({
      inputRange: [-height, 0],
      outputRange: [fontSize * 1.75, fontSize],
      extrapolate: 'clamp',
    });

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.headerContainer, headerContainerStyle]}>
          <Fade visible={this.state.isHeaderScrolled} direction={fadeDirection}>
            <View style={[styles.headerComponentContainer, headerComponentContainerStyle]}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'white',
                }}>
                <View style={styles.statContainer}>
                  <BalloonIcon />
                  <Text style={[styles.headline, headlineStyle]}>{stats.balloons}</Text>
                </View>
                <View style={styles.statContainer}>
                  <LightningIcon />
                  <Text style={[styles.headline, headlineStyle]}>{stats.xp}</Text>
                </View>
                <View style={styles.statContainer}>
                  <HeartIcon fill="#E32227" />
                  <Text style={[styles.headline, headlineStyle]}>{stats.lives}</Text>
                </View>
              </View>
            </View>
          </Fade>
        </View>
        <ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollAnimatedValue } } }],
            {
              listener: this.handleScroll,
            },
          )}
          scrollEventThrottle={16}
          contentContainerStyle={[scrollContainerStyle]}
          {...scrollViewProps}>
          <View
            onLayout={this.onLayout}
            style={{
              backgroundColor: '#009688',
              // paddingHorizontal: 16,
              // paddingVertical: 16,
              gap: 16,
              flexDirection: 'column',
              alignItems: 'start',
            }}>
            <Animated.Text
              style={[
                styles.title,
                titleStyle,
                titleStyles,
                {
                  fontSize: animatedFontSize,
                },
              ]}>
              {title}
            </Animated.Text>

            <View style={{ paddingHorizontal: 16 }}>
              <EnhancedText size="xl" tx="learn.greeting" txOptions={{ name: username || 'Mate' }}>
                Hello, Mate
              </EnhancedText>

              <EnhancedText size="lg" tx="learn.wouldLearn" style={{}} />
            </View>

            <View
              style={{
                width: '100%',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'white',
                paddingHorizontal: 16,
                paddingVertical: 16,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                borderBottomWidth: 1,
              }}>
              <View style={styles.statContainer}>
                <BalloonIcon />
                <Text style={[styles.headline, headlineStyle]}>{stats.balloons}</Text>
              </View>
              <View style={styles.statContainer}>
                <LightningIcon />
                <Text style={[styles.headline, headlineStyle]}>{stats.xp}</Text>
              </View>
              <View style={styles.statContainer}>
                <HeartIcon fill="#E32227" />
                <Text style={[styles.headline, headlineStyle]}>{stats.lives}</Text>
              </View>
            </View>
          </View>
          {children}
        </ScrollView>
      </View>
    );
  }
}
