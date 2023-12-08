import { useState, useEffect } from 'react';

import { getItem, setItem } from '../storage';

const IS_FIRST_TIME_KEY = 'IS_FIRST_TIME';

export const useIsFirstTime = () => {
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      getItem<boolean>(IS_FIRST_TIME_KEY)
        .then(async item => {
          if (item === null) {
            setIsFirstTime(true);
            await setItem(IS_FIRST_TIME_KEY, false);
          } else {
            setIsFirstTime(item === true);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    })();
  }, []);

  return [isFirstTime, setIsFirstTime, isLoading] as const;
};
