import { useState, createContext, useContext, useCallback, useRef } from 'react';

import { rootLog } from '@/core/logger';
import { noop } from '@/core/utils';

type ContinueCallbackType = (b: boolean) => void | undefined;

type WizardContextType = {
  isContinueEnabled: boolean;
  setIsContinueEnabled: (enabled: boolean, callback: ContinueCallbackType) => void;
  onNextScreen: (() => any)[];
  setOnNextScreen: any;
  // setOnNextScreen: (cb: any) => void;
};

const initialValue: WizardContextType = {
  isContinueEnabled: false,
  setIsContinueEnabled: noop,
  onNextScreen: [],
  setOnNextScreen: noop,
};

const WizardContext = createContext<WizardContextType>(initialValue);

type WizardProviderProps = {
  children?: React.ReactNode;
};

export const WizardProvider = ({ children }: WizardProviderProps): React.ReactNode => {
  const [isContinueEnabled, setContinueEnabled] = useState<boolean>(initialValue.isContinueEnabled);
  // const [onNextScreen, setOnNextScreen] = useState<any>(() => initialValue.onNextScreen);

  const setIsContinueEnabled = useCallback((enabled: boolean, callback: ContinueCallbackType) => {
    setContinueEnabled(() => {
      callback(enabled);
      return enabled;
    });
  }, []);

  const onNextScreen = useRef<any>([noop]);

  rootLog.info(`isContinueEnabled= ${isContinueEnabled}`);

  return (
    <WizardContext.Provider
      value={{
        isContinueEnabled,
        setIsContinueEnabled,
        onNextScreen: onNextScreen.current,
        setOnNextScreen: (cb: any) => {
          onNextScreen.current.push(cb);
          // onNextScreen.current = cb;
        },
      }}>
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
