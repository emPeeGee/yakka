import { useState, useReducer, useEffect } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';

import { BarChart } from 'react-native-chart-kit';

import { TIME_SPEND_DATA_KEY } from '@/core/constants';
import { getItem } from '@/core/storage';
import { formatMsToMinutes, getMonthNameFromNumber, getWeekNumber } from '@/core/utils';
import { SelectableOption } from '@/types';
import { ButtonToggleGroup, FocusAwareStatusBar } from '@/ui/core';
import { useTheme } from '@/ui/theme';

export enum GROUP_ACTIVITY_TYPE {
  Daily = 'daily',
  Weekly = 'weekly',
  Monthly = 'monthly',
}

const TIMING_OPTIONS: SelectableOption<GROUP_ACTIVITY_TYPE>[] = [
  { tx: 'common.daily', value: GROUP_ACTIVITY_TYPE.Daily },
  { tx: 'common.weekly', value: GROUP_ACTIVITY_TYPE.Weekly },
  { tx: 'common.monthly', value: GROUP_ACTIVITY_TYPE.Monthly },
];

export const ProfileActivityScreen = () => {
  const { theme } = useTheme();
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
          ).map(([date, time]) => ({
            date: getMonthNameFromNumber({ monthNumber: Number(date) }),
            time: time,
          }));
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
  return (
    <View style={{ marginVertical: theme.spacing.md }}>
      <FocusAwareStatusBar />
      <ButtonToggleGroup options={TIMING_OPTIONS} onOptionChange={dispatch} />
      <View style={{}}>
        <ScrollView horizontal>
          <BarChart
            data={{
              labels: dataset.map(d => d.date),
              datasets: [{ data: dataset.map(d => d.time) }],
            }}
            height={300}
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
            yAxisLabel=""
            // yAxisLabel={''}
            // xAxisLabel={''}
            // valueOnTopOfBarOffsetY
            yAxisSuffix=""
          />
        </ScrollView>
      </View>
    </View>
  );
};
