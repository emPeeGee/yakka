import React, { useMemo } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';

import { rootLog } from '@/core/logger';
import { noop } from '@/core/utils';
import { Theme } from '@/types';
import {
  EnhancedText,
  List,
  DataListType,
  Separator,
  CurvedShape,
  EnhancedPressable,
  HeaderPlaceholder,
} from '@/ui/core';
import { SettingsIcon, AchievementsIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

const DASHBOARD_LIST: DataListType[] = [
  { screen: 'SettingsScreen', label: 'Settings', Icon: SettingsIcon, withChevron: true },
  {
    screen: 'AchievementsScreen',
    label: 'Achievements',
    Icon: AchievementsIcon,
    withChevron: true,
  },
];

export const ProfileScreen = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
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
      <CurvedShape />
      {/* TODO: 42 is hardcoded */}
      <HeaderPlaceholder additionalSpace={42} />

      <View style={[styles.container]}>
        <View style={gStyles.centerRowBetween}>
          <Image source={require('../../assets/profile.png')} style={styles.profileImg} />
          <View style={[gStyles.fullWidthFromStart, styles.nameContainer]}>
            <EnhancedText style={styles.name} size="md">
              Mihail Mitrofanov
            </EnhancedText>
            <EnhancedText style={styles.grade} size="xxs">
              Newbie
            </EnhancedText>
          </View>

          {/* TODO: for future to implement */}
          <EnhancedPressable onPress={noop}>
            <FontAwesome5 name="edit" size={22} color={theme.colors.textPri} />
          </EnhancedPressable>
        </View>

        <Separator paddingVertical={theme.spacing.md} />

        <View style={[gStyles.centerRowBetween, { marginBottom: theme.spacing.lg }]}>
          <View style={gStyles.centerColumnBetween}>
            <View>
              <EnhancedText size="md">2+ hours</EnhancedText>
            </View>
            <View>
              <EnhancedText style={styles.statLabel} size="xxs">
                Total learn
              </EnhancedText>
            </View>
          </View>

          <Separator isVertical height={24} paddingVertical={0} />

          <View style={gStyles.centerColumnBetween}>
            <View>
              <EnhancedText size="md">20</EnhancedText>
            </View>
            <View>
              <EnhancedText style={styles.statLabel} size="xxs">
                Achievements
              </EnhancedText>
            </View>
          </View>

          <Separator isVertical height={24} paddingVertical={0} />

          <View style={gStyles.centerColumnBetween}>
            <View>
              <EnhancedText size="md">1</EnhancedText>
            </View>
            <View>
              <EnhancedText style={styles.statLabel} size="xxs">
                Languages
              </EnhancedText>
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
      paddingHorizontal: theme.spacing.md,
    },
    nameContainer: {
      paddingHorizontal: theme.spacing.xs,
    },
    profileImg: {
      height: 85,
      width: 85,
    },
    name: {
      color: theme.colors.textPri,
    },
    grade: {
      color: theme.colors.textSec,
    },
    statLabel: { color: theme.colors.textSec },
  });
