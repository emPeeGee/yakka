import React, { useMemo } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { rootLog } from '@/core/logger';
import { useAuth } from '@/core/providers';
import { noop } from '@/core/utils';
import { Theme } from '@/types';
import {
  EnhancedText,
  List,
  DataListType,
  Separator,
  EnhancedPressable,
  HeaderPlaceholder,
  FocusAwareStatusBar,
} from '@/ui/core';
import { SettingsIcon, AchievementsIcon } from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

export const ProfileScreen = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const gStyles = useGlobalThemedStyles();
  const { navigate } = useNavigation();
  const { signOut, user, withAccessControl } = useAuth();

  const DASHBOARD_LIST: DataListType[] = useMemo(
    () =>
      [
        { screen: 'ProfSettings', label: 'Settings', Icon: SettingsIcon, withChevron: true },
        {
          callback: withAccessControl(
            () => navigate('ProfAchivements'),
            () => navigate('Auth', { screen: 'AuthSignUp' }),
          ),
          label: 'Achievements',
          Icon: AchievementsIcon,
          withChevron: true,
        },
      ] as DataListType[],
    [withAccessControl],
  );
  const ACCOUNT_LIST = useMemo(
    () =>
      [
        {
          label: 'Logout account',
          callback: async () => {
            rootLog.warn('LOGOUT was pressed');
            signOut(() => navigate('Auth', { screen: 'AuthLogin' }));
          },
          color: theme.colors.error,
        },
      ] as DataListType[],
    [theme, rootLog],
  );

  // NOTE: EXample
  // useEffect(() => {
  //   if (session) getProfile();
  // }, [session]);

  // async function getProfile() {
  //   try {
  //     setLoading(true);
  //     if (!session?.user) throw new Error('No user on the session!');

  //     const { data,y error, status } = await supabase
  //       .from('profiles')
  //       .select(`last_name, first_name, avatar_url, age`)
  //       .eq('id', session?.user.id)
  //       .single();

  //     if (error && status !== 406) {
  //       throw error;
  //     }

  //     console.log(data, error, status);
  //     if (data) {
  //       console.log(data);
  //       // setUsername(data.username);
  //       // setWebsite(data.website);
  //       // setAvatarUrl(data.avatar_url);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     if (error instanceof Error) {
  //       Alert.alert(error.message);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  return (
    <View>
      <HeaderPlaceholder />
      <FocusAwareStatusBar />

      <View style={[styles.container]}>
        <View style={gStyles.centerRowBetween}>
          <Image source={require('../../assets/profile.png')} style={styles.profileImg} />
          <View style={[gStyles.fullWidthFromStart, styles.nameContainer]}>
            <EnhancedText style={styles.name} size="md">
              {user?.user_metadata?.first_name || 'Unknown'}
              {user?.user_metadata?.last_name}
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
