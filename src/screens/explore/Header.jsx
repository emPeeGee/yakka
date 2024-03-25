import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, Animated, Dimensions, StyleSheet } from 'react-native';
import { BackButton, EnhancedText, Fade } from '@/ui/core';

const HEADER_HEIGHT = 64;

// TODO: refactor into function and add border bottom
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  headerContainer: {
    height: HEADER_HEIGHT,
  },
  headerComponentContainer: {
    height: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
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
  },
});

const { height } = Dimensions.get('window');

export class HeaderScrollView extends Component {
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
    withBackButton: PropTypes.bool,
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
      withBackButton = false,
    } = this.props;

    const fontSize = titleStyle.fontSize || 34;
    const titleStyles = {
      fontSize,
      lineHeight: fontSize * 1.2,
    };

    const opacityHeaderAnimation = this.scrollAnimatedValue.interpolate({
      inputRange: [
        0,
        this.state.headerHeight / 2,
        this.state.headerHeight / 1.5,
        this.state.headerHeight,
      ],
      outputRange: [0, 0.05, 0.1, 1],
      extrapolate: 'clamp',
    });

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.headerContainer, headerContainerStyle]}>
          {/* <Fade visible={this.state.isHeaderScrolled} direction={fadeDirection}> */}
          <Animated.View style={{ opacity: opacityHeaderAnimation }}>
            <View style={[styles.headerComponentContainer, headerComponentContainerStyle]}>
              {withBackButton && <BackButton />}
              <View style={{ flex: 1, alignItems: 'center' }}>
                <EnhancedText style={[styles.headline, headlineStyle]} tx={title} />
              </View>
            </View>
          </Animated.View>
          {/* </Fade> */}
        </View>
        <ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollAnimatedValue } } }],
            {
              useNativeDriver: false,
              listener: this.handleScroll,
            },
          )}
          scrollEventThrottle={16}
          contentContainerStyle={[scrollContainerStyle]}
          {...scrollViewProps}>
          <Animated.View
            onLayout={this.onLayout}
            style={{
              paddingHorizontal: 16,
              gap: 16,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {withBackButton && <BackButton />}
            <EnhancedText tx={title} style={[styles.title, titleStyle, titleStyles, ,]} />
          </Animated.View>
          {children}
        </ScrollView>
      </View>
    );
  }
}
