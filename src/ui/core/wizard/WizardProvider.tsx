import { useState, createContext, useContext, useCallback, useRef } from 'react';

import { noop } from '@/core/utils';
import { VoidCb } from '@/types';

type ContinueCallbackType = (b: boolean) => void | undefined;

type WizardContextType = {
  isContinueEnabled: boolean;
  setIsContinueEnabled: (enabled: boolean, callback?: ContinueCallbackType) => void;
  /**
   * An array of callbacks for each screen. Wizard will call each when that screen is reached.
   */
  onNextScreen: VoidCb[];
  /**
   * Set a callback which will be called when a specific screen is reached
   */
  setOnNextScreen: (cb: VoidCb) => void;
};

const initialValue: WizardContextType = {
  isContinueEnabled: false,
  setIsContinueEnabled: noop,
  onNextScreen: [],
  setOnNextScreen: noop,
};

const WizardContext = createContext<WizardContextType>(initialValue);

type WizardProviderProps = {
  enableContinueOnFirstScreen?: boolean;
  children?: React.ReactNode;
};

export const WizardProvider = ({
  children,
  enableContinueOnFirstScreen,
}: WizardProviderProps): React.ReactNode => {
  const onNextScreen = useRef<VoidCb[]>([]);
  const [isContinueEnabled, setContinueEnabled] = useState<boolean>(
    enableContinueOnFirstScreen || initialValue.isContinueEnabled,
  );

  const setIsContinueEnabled = useCallback((enabled: boolean, callback?: ContinueCallbackType) => {
    setContinueEnabled(() => {
      callback?.(enabled);
      return enabled;
    });
  }, []);

  return (
    <WizardContext.Provider
      value={{
        isContinueEnabled,
        setIsContinueEnabled,
        onNextScreen: onNextScreen.current,
        setOnNextScreen: (cb: VoidCb) => {
          onNextScreen.current.push(cb);
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
