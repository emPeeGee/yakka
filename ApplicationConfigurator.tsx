import { useEffect } from 'react';

import { SheetProvider } from 'react-native-actions-sheet';

import { REGENERATE_INTERVAL_MS } from '@/core/constants';
import {
  AuthProvider,
  FirstLaunchProvider,
  HapticsProvider,
  SoundProvider,
} from '@/core/providers';
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

//TODO:  main loading error?color
