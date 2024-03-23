import React, { useMemo } from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { SheetManager } from 'react-native-actions-sheet';

import { rootLog } from '@/core/logger';
import { useAuth } from '@/core/providers';
import { Theme } from '@/types';
import {
  Button,
  EnhancedText,
  List,
  DataListType,
  Separator,
  HeaderPlaceholder,
  FocusAwareStatusBar,
  HeroWithChat,
} from '@/ui/core';
import { SettingsIcon, AchievementsIcon, UserGearIcon, ClockIcon, PasswordIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

export const ProfileScreen = () => {
  const { theme, isDark } = useTheme();
  const styles = getStyles(theme);
  const gStyles = useGlobalThemedStyles();
  const { navigate } = useNavigation();
  const { signOut, user, withAccessControl } = useAuth();

  const DASHBOARD_LIST: DataListType[] = useMemo(
    () =>
      [
        { screen: 'ProfSettings', tx: 'profile.settings', Icon: SettingsIcon, withChevron: true },
        {
          callback: withAccessControl(
            () => navigate('ProfAchivements'),
            () => navigate('Auth', { screen: 'AuthSignUp' }),
          ),
          tx: 'profile.achievements',
          Icon: AchievementsIcon,
          withChevron: true,
        },
        {
          callback: withAccessControl(
            () => navigate('ProfAchivements'),
            () => navigate('Auth', { screen: 'AuthSignUp' }),
          ),
          tx: 'profile.myActivity',
          Icon: ClockIcon,
          withChevron: true,
        },
      ] as DataListType[],
    [withAccessControl],
  );
  const ACCOUNT_LIST = useMemo(
    () =>
      [
        {
          tx: 'profile.logOut',
          callback: async () => {
            const confirm = await SheetManager.show('confirmation-sheet');
            if (confirm) {
              signOut(() => navigate('Auth', { screen: 'AuthLogin' }));
            }

            rootLog.warn('LOGOUT was pressed');
          },
          color: theme.colors.error,
        },
      ] as DataListType[],
    [theme, rootLog],
  );

  return (
    <View>
      <HeaderPlaceholder />
      <FocusAwareStatusBar />

      <View style={[styles.container]}>
        <View style={gStyles.centerRowBetween}>
          <Image source={require('../../assets/profile.png')} style={styles.profileImg} />
          <View style={[gStyles.fullWidthFromStart, styles.nameContainer]}>
            <EnhancedText style={styles.name} size="md">
              {`${user?.user_metadata?.first_name || 'Unknown'} ${user?.user_metadata?.last_name}`}
            </EnhancedText>
            <EnhancedText style={styles.grade} size="xxs">
              Newbie
            </EnhancedText>
          </View>

          <HeroWithChat direction="left" width={74} height={70} hero="ghost" />
        </View>

        <Separator paddingVertical={theme.spacing.md} />

        <View
          style={[
            gStyles.centerRowBetween,
            { marginBottom: theme.spacing.lg, justifyContent: 'space-around' },
          ]}>
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
        </View>

        <ScrollView
          horizontal
          contentContainerStyle={[
            gStyles.startRowStart,
            { width: '100%', gap: theme.spacing.md, marginVertical: theme.spacing.md },
          ]}>
          <Button
            tx="profile.editProfile"
            width="auto"
            backgroundColor={isDark ? theme.colors.primary700 : theme.colors.primary100}
            color={isDark ? theme.colors.base0 : theme.colors.primary900}
            Left={UserGearIcon}
            onPress={() => navigate('ProfProfileEdit')}
            style={{ paddingVertical: theme.spacing.sm }}
          />
          <Button
            tx="profile.changePassword"
            width="auto"
            backgroundColor={isDark ? theme.colors.primary700 : theme.colors.primary100}
            color={isDark ? theme.colors.base0 : theme.colors.primary900}
            Left={PasswordIcon}
            onPress={() => navigate('ProfChangePassword')}
            style={{ paddingVertical: theme.spacing.sm }}
          />
        </ScrollView>

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
