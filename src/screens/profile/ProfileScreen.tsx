import React, { useMemo } from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import { Path, Svg } from 'react-native-svg';

import { rootLog } from '@/core/logger';
import { noop } from '@/core/utils';
import { Theme } from '@/types';
import { EnhancedText, List, DataListType, Separator } from '@/ui/core';
import { SettingsIcon, AchievementsIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

const DASHBOARD_LIST: DataListType[] = [
  { screen: 'Settings', label: 'Settings', Icon: SettingsIcon, withChevron: true },
  { screen: 'Settings', label: 'Achievements', Icon: AchievementsIcon, withChevron: true },
];

export const ProfileScreen = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const headerHeight = useHeaderHeight();
  const gStyles = useGlobalThemedStyles();

  const ACCOUNT_LIST = useMemo(
    () =>
      [
        {
          label: 'Logout account',
          callback: () => rootLog.warn('LOGOUT was pressed'),
          color: theme.colors.error,
        },
      ] as DataListType[],
    [theme, rootLog],
  );

  return (
    <View>
      {/* TODO: thoughts on how to export it */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Svg
          width="100%"
          height="276"
          viewBox="0 0 375 276"
          preserveAspectRatio="xMinYMin slice"
          fill="none">
          <Path
            d="M199.81 125.92C321.578 132.028 389.543 78.392 408.304 50.8105L464.252 -71.1497C418.522 -66.6995 305.335 -65.9644 218.428 -98.6253C109.793 -139.451 45.3276 -145.631 -120.477 -111.942C-253.121 -84.9906 -244.976 132.779 -224.324 238.295L-9.88153 275.653C9.27883 223.197 78.0416 119.812 199.81 125.92Z"
            fill="#3DB2FF"
          />
        </Svg>
      </View>
      {/* TODO: 42 is hardcoded */}
      <View style={{ height: headerHeight + 42 }}></View>

      <View style={[styles.container]}>
        <View style={gStyles.centerRowBetween}>
          <Image source={require('../../assets/profile.png')} style={styles.profileImg} />
          <View style={[gStyles.fullWidthFromStart, styles.nameContainer]}>
            <EnhancedText style={styles.name}>Mihail Mitrofanov</EnhancedText>
            <EnhancedText style={styles.grade}>Newbie</EnhancedText>
          </View>

          {/* TODO: for future to implement */}
          <Pressable onPress={noop}>
            <FontAwesome5 name="edit" size={22} color={theme.colors.textPri} />
          </Pressable>
        </View>

        <Separator paddingVertical={theme.spacing.medium} />

        <View style={[gStyles.centerRowBetween, { marginBottom: theme.spacing.large }]}>
          <View style={gStyles.centerColumnBetween}>
            <View>
              <EnhancedText style={styles.statValue}>2+ hours</EnhancedText>
            </View>
            <View>
              <EnhancedText style={styles.statLabel}>Total learn</EnhancedText>
            </View>
          </View>

          <Separator isVertical height={24} paddingVertical={0} />

          <View style={gStyles.centerColumnBetween}>
            <View>
              <EnhancedText style={styles.statValue}>20</EnhancedText>
            </View>
            <View>
              <EnhancedText style={styles.statLabel}>Achievements</EnhancedText>
            </View>
          </View>

          <Separator isVertical height={24} paddingVertical={0} />

          <View style={gStyles.centerColumnBetween}>
            <View>
              <EnhancedText style={styles.statValue}>1</EnhancedText>
            </View>
            <View>
              <EnhancedText style={styles.statLabel}>Languages</EnhancedText>
            </View>
          </View>
        </View>

        <List title="Dashboard" data={DASHBOARD_LIST} />
        <List title="My account" data={ACCOUNT_LIST} />
      </View>
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: theme.spacing.medium,
    },
    nameContainer: {
      paddingHorizontal: theme.spacing.extraSmall,
    },
    profileImg: {
      height: 85,
      width: 85,
    },
    name: {
      fontSize: 18,
      color: theme.colors.textPri,
    },
    grade: {
      fontSize: 12,
      color: theme.colors.textSec,
    },
    statLabel: { color: theme.colors.textSec, fontSize: 12 },
    statValue: { fontSize: 18 },
  });
