import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { View, Image, StyleSheet, ScrollView, Dimensions, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { SheetManager } from 'react-native-actions-sheet';
import { BarChart } from 'react-native-chart-kit';

import { TIME_SPEND_DATA_KEY } from '@/core/constants';
import { rootLog } from '@/core/logger';
import { getItem } from '@/core/storage';
import {
  formatMsToMinutes,
  getMonthNameFromNumber,
  getWeekNumber,
  useAuth,
} from '@/core/providers';
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
  ButtonToggleGroup,
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
import { BarChart, LineChart } from 'react-native-chart-kit';
// import { ToggleButton } from '@/ui/core/ButtonToggleGroup';

export enum GROUP_ACTIVITY_TYPE {
  Daily = 'daily',
  Weekly = 'weekly',
  Monthly = 'monthly',
}

export const ProfileScreen = () => {
  const { theme, isDark } = useTheme();
  const styles = getStyles(theme);
  const gStyles = useGlobalThemedStyles();

  const [rawTimeSpend, setRawTimeSpend] = useState<{ date: string; time: number }[]>([]);
  // TODO: use memo will be better
  const [dataset, dispatch] = useReducer(
    (state: { date: string; time: number }[], action: GROUP_ACTIVITY_TYPE) => {
      switch (action) {
        case GROUP_ACTIVITY_TYPE.Daily:
          return rawTimeSpend.map(({ date, time }) => ({ date, time }));
        case GROUP_ACTIVITY_TYPE.Weekly:
          return Object.entries(
            rawTimeSpend.reduce<Record<number, number>>((acc, next) => {
              const date = new Date(next.date);
              const [, yearWeek] = getWeekNumber(date);

              // add this key as a property to the result object
              if (!acc[yearWeek]) {
                acc[yearWeek] = 0;
              }

              // push the current date that belongs to the year-week calculated before
              acc[yearWeek] += next.time;

              return acc;
            }, {}),
          ).map(([date, time]) => ({ date: date, time: time }));
        case GROUP_ACTIVITY_TYPE.Monthly:
          return Object.entries(
            rawTimeSpend.reduce<Record<number, number>>((acc, next) => {
              const date = new Date(next.date);
              const month = date.getMonth() + 1;

              // add this key as a property to the result object
              if (!acc[month]) {
                acc[month] = 0;
              }

              // push the current date that belongs to the year-week calculated before
              acc[month] += next.time;

              return acc;
            }, {}),
          ).map(([date, time]) => ({ date: getMonthNameFromNumber(date), time: time }));
      }
    },
    [],
  );

  useEffect(() => {
    const fetchTimeSpend = async () => {
      const timeSpend: Record<string, number> = (await getItem(TIME_SPEND_DATA_KEY)) || {};
      const dataset = Object.entries(timeSpend).map(([key, time]) => ({
        date: key,
        time: time,
      }));

      setRawTimeSpend(dataset);
      dispatch(GROUP_ACTIVITY_TYPE.Daily);
    };

    fetchTimeSpend();
  }, []);
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
          contentContainerStyle={[
            gStyles.startRowStart,
            { gap: theme.spacing.md, marginVertical: theme.spacing.md },
          ]}>
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

        <ButtonToggleGroup
          options={[
            GROUP_ACTIVITY_TYPE.Daily,
            GROUP_ACTIVITY_TYPE.Weekly,
            GROUP_ACTIVITY_TYPE.Monthly,
          ]}
          onOptionChange={dispatch}
        />

        <View style={{}}>
          <ScrollView horizontal>
            <BarChart
              data={{
                labels: dataset.map(d => d.date),
                datasets: [{ data: dataset.map(d => d.time) }],
              }}
              height={250}
              chartConfig={{
                color: () => theme.colors.textSec,
                backgroundColor: theme.colors.background,
                backgroundGradientFrom: theme.colors.background,
                backgroundGradientTo: theme.colors.background,
                propsForBackgroundLines: {
                  strokeWidth: 1,
                  color: theme.colors.secondary100,
                },
                horizontalOffset: 0,
                fillShadowGradientFromOpacity: 1,
                fillShadowGradientToOpacity: 1,
                fillShadowGradientOpacity: 1,
                fillShadowGradientTo: theme.colors.secondary400,
                fillShadowGradientFrom: theme.colors.secondary600,
                fillShadowGradientFromOffset: 0.1,
                fillShadowGradientToOffset: 0.7,
                barRadius: theme.borderRadius.sm,
                paddingRight: 0,
                paddingTop: 0,
                labelColor: () => theme.colors.textSec,
                formatTopBarValue: n => `${formatMsToMinutes(n)} `,
                propsForLabels: {
                  // fontFamily: font.body.normal,
                },
              }}
              style={{
                backgroundColor: theme.colors.background,
                paddingRight: 0,
                // paddingTop: theme.spacing.md,
                paddingLeft: 0,
                paddingBottom: 0,
                borderRadius: theme.borderRadius.lg,
                borderWidth: theme.borders.thin,
                borderColor: theme.colors.border,
                marginVertical: theme.spacing.md,
              }}
              showValuesOnTopOfBars={true}
              showBarTops={false}
              fromZero
              withHorizontalLabels={false}
              withVerticalLabels={true}
              xLabelsOffset={0}
              yLabelsOffset={0}
              withInnerLines
              width={Math.max(
                dataset.length * 50,
                Dimensions.get('window').width - theme.spacing.md * 2 - theme.borders.thin * 2,
              )}
              // width={Dimensions.get('window').width - theme.spacing.md * 2 - theme.borders.thin * 2}
              yAxisLabel=""
              // yAxisLabel={''}
              // xAxisLabel={''}
              // valueOnTopOfBarOffsetY
              yAxisSuffix=""
            />
          </ScrollView>
        </View>

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

        <List title="Dashboard" data={DASHBOARD_LIST} />
        <List title="My account" data={ACCOUNT_LIST} />
      </View>

      <ButtonToggleGroup options={['Daily', 'Weekly', 'Monthly']} onOptionChange={noop} />
      <List txTitle="profile.dashboard" data={DASHBOARD_LIST} />
      {user && <List txTitle="profile.myAccount" data={ACCOUNT_LIST} />}
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
