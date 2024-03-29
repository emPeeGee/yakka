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
import {
  SettingsIcon,
  AchievementsIcon,
  UserGearIcon,
  ClockIcon,
  PasswordIcon,
  UserCircleIcon,
} from '@/ui/icons';
import { useGlobalThemedStyles, useTheme } from '@/ui/theme';

export const ProfileScreen = () => {
  const { theme, isDark } = useTheme();
  const styles = getStyles(theme);
  const gStyles = useGlobalThemedStyles();

  const { navigate } = useNavigation();
  const { signOut, user, username, withAccessControl } = useAuth();

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
            () => navigate('ProfActivity'),
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
          {user && (
            <Image
              source={require('../../assets/profile.png')}
              resizeMode="contain"
              style={styles.profileImg}
            />
          )}
          <View style={[gStyles.fullWidthFromStart, styles.nameContainer]}>
            <EnhancedText style={styles.name} size="md">
              {username}
            </EnhancedText>
            {user && <EnhancedText tx="profile.rankNewbie" style={styles.grade} size="xxs" />}
          </View>

          <HeroWithChat direction="left" width={74} height={70} hero="ghost" />
          {/* <ToggleButton primaryText="12" secondaryText="333" onPress={} /> */}
        </View>
        <Separator paddingVertical={theme.spacing.md} />

        {user && (
          <View style={[gStyles.centerRowBetween, { justifyContent: 'space-around' }]}>
            <View style={gStyles.centerColumnBetween}>
              <View>
                <EnhancedText size="md">2+ hours</EnhancedText>
              </View>
              <View>
                <EnhancedText tx="profile.totalLearn" style={styles.statLabel} size="xxs" />
              </View>
            </View>

            <Separator isVertical height={24} paddingVertical={0} />

            <View style={gStyles.centerColumnBetween}>
              <View>
                <EnhancedText size="md">20</EnhancedText>
              </View>
              <View>
                <EnhancedText tx="profile.achievements" style={styles.statLabel} size="xxs" />
              </View>
            </View>
          </View>
        )}

        <ScrollView
          scrollEnabled
          horizontal
          contentContainerStyle={[gStyles.startRowStart, { gap: theme.spacing.md }]}>
          {user ? (
            <>
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
            </>
          ) : (
            <Button
              tx="common.createProfile"
              backgroundColor={theme.colors.primary500}
              Left={UserCircleIcon}
              onPress={() => navigate('Auth', { screen: 'AuthSignUp' })}
            />
          )}
        </ScrollView>

        {/* <View>
          <LineChart
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View> */}

        <List txTitle="profile.dashboard" data={DASHBOARD_LIST} />
        {user && <List txTitle="profile.myAccount" data={ACCOUNT_LIST} />}
      </View>
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: theme.spacing.md,
      gap: theme.spacing.md,
    },
    nameContainer: {
      paddingHorizontal: theme.spacing.xs,
    },
    profileImg: {
      height: 70,
      width: 70,
    },
    name: {
      color: theme.colors.textPri,
    },
    grade: {
      color: theme.colors.textSec,
    },
    statLabel: { color: theme.colors.textSec },
  });
