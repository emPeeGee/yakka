import { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const IS_FIRST_TIME_KEY = 'IS_FIRST_TIME';

export const useIsFirstTime = () => {
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const storedIsFirstTime = await AsyncStorage.getItem(IS_FIRST_TIME_KEY);

        if (storedIsFirstTime === null) {
          setIsFirstTime(true);
          await AsyncStorage.setItem(IS_FIRST_TIME_KEY, 'false');
        } else {
          setIsFirstTime(storedIsFirstTime === 'true');
        }
      } catch (err) {
        console.log('useIsFirstTime error', err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return [isFirstTime, setIsFirstTime, isLoading] as const;
};
