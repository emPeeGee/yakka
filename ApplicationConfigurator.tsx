import { useEffect, useRef } from 'react';
import { AppState, Platform } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SheetProvider } from 'react-native-actions-sheet';

import { REGENERATE_INTERVAL_MS, TIME_SPEND_DATA_KEY } from '@/core/constants';
import {
  AuthProvider,
  FirstLaunchProvider,
  HapticsProvider,
  SoundProvider,
} from '@/core/providers';
import { getItem } from '@/core/storage';
import { RootNavigator } from '@/navigation';
// TODO: import is awful
import { useLearnStore } from '@/screens/learn/learnState';
import { AlertProvider, HeroLoading } from '@/ui/core';
import * as Notifications from 'expo-notifications';

import './src/core/i18n';
import './src/ui/sheets/sheets';

const scheduleDailyNotifications = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  console.log('exisi', existingStatus);
  // if ( self.gotPermission ) {
  // // It's useful to save notification id so that you can edit/delete notification later
  // const idOfNotification = await Notifications.scheduleNotificationAsync( {
  //   content: {
  //     title: "App Name - Daily Remainder",
  //     body: "Text you want to show in your notification",
  //     sound: 'default'
  //   },
  //   trigger: {
  //     hour: 14, // show this notification every day, 14:00
  //     repeats: true
  //   },
  // } );
};

/**
 * Get permissions from user.
 * This needs to be done both for local and server notifications.
 * Call this method after user click some 'Allow notifications' button
 */

async function requestPermissions() {
  const { granted } = await Notifications.getPermissionsAsync();
  if (!granted) {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to send notifications denied');
    }
  }
}
async function* getPermission() {
  if (Platform.OS !== 'web') {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    console.log('aaaaaaaaaaaaaaaaa', existingStatus);

    if (existingStatus !== 'granted') {
      __DEV__ && console.log('Requesting notification permission');

      const { status } = yield Notifications.requestPermissionsAsync();

      if (status !== 'granted') throw new Error("Didn't receive permission to save notifications");

      __DEV__ && console.log('Permission for notifications granted');

      // This code is needed for Android to work
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    }
  }
}

export function ApplicationConfigurator() {
  const { regenerateLife } = useLearnStore();

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log('regenerated interval');
      regenerateLife();
    }, REGENERATE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  });

  // const appState = useRef(AppState.currentState);

  const startTime = useRef(new Date());

  useEffect(() => {
    requestPermissions();

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        startTime.current = new Date();
      }

      if (nextAppState.match(/inactive|background/) && startTime) {
        const elapsedTime = Date.now() - startTime.current.valueOf();
        updateTotalTime(elapsedTime);
      }

      // if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      //   console.log('App has come to the foreground!');
      // }
    });

    // getPermission();

    // scheduleDailyNotifications();

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <HapticsProvider>
      <SoundProvider>
        <FirstLaunchProvider>
          <SheetProvider>
            <AuthProvider loadingIndicator={<HeroLoading />}>
              <AlertProvider>
                <RootNavigator />
              </AlertProvider>
            </AuthProvider>
          </SheetProvider>
        </FirstLaunchProvider>
      </SoundProvider>
    </HapticsProvider>
  );
}

const updateTotalTime = async (elapsedTime: number) => {
  try {
    const today = new Date().toISOString().slice(0, 10); // Get today's date in yyyy-mm-dd format
    const timeSpend: Record<string, number> = (await getItem(TIME_SPEND_DATA_KEY)) || {};
    const todayTime = timeSpend[today];

    timeSpend[today] = todayTime ? elapsedTime + todayTime : elapsedTime;
    await AsyncStorage.setItem(TIME_SPEND_DATA_KEY, JSON.stringify(timeSpend));
  } catch (error) {
    console.error('Error updating total time:', error);
  }
};

//TODO:  main loading error?color
