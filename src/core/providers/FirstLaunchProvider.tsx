import { useState, useEffect, createContext, useContext } from 'react';

import { getItem, setItem } from '../storage';
import { noop } from '../utils';

const IS_FIRST_TIME_KEY = 'IS_FIRST_TIME';

type FirstLaunchContextType = {
  isFirstLaunch: boolean | null;
  setIsFirstLaunch: React.Dispatch<React.SetStateAction<boolean | null>>;
};

const initialValue = {
  isFirstLaunch: null,
  setIsFirstLaunch: noop,
};

const FirstLaunchContext = createContext<FirstLaunchContextType>(initialValue);

type FirstLaunchProviderProps = {
  children?: React.ReactNode;
};

export const FirstLaunchProvider = ({ children }: FirstLaunchProviderProps): React.ReactNode => {
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      getItem<boolean>(IS_FIRST_TIME_KEY).then(async item => {
        if (item === null) {
          setIsFirstTime(true);
          await setItem(IS_FIRST_TIME_KEY, false);
        } else {
          setIsFirstTime(item === true);
        }
      });
    })();
  }, []);

  return (
    <FirstLaunchContext.Provider
      value={{ isFirstLaunch: isFirstTime, setIsFirstLaunch: setIsFirstTime }}>
      {children}
    </FirstLaunchContext.Provider>
  );
};

export const useFirstLaunch = () => useContext(FirstLaunchContext);
