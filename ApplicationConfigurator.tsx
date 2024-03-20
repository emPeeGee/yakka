import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';

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
import { HeroLoading } from '@/ui/core';

import './src/core/i18n';
import './src/ui/sheets/sheets';

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
              <RootNavigator />
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
