import { useState, createContext, useContext, useCallback, useRef } from 'react';

import { TxKeyPath } from '@/core/i18n';
import { noop } from '@/core/utils';
import { VoidCb } from '@/types';

type ContinueCallbackType = (b: boolean) => void | undefined;

export interface WizardData {
  [key: string]: any;
}

type WizardContextType = {
  data: WizardData;
  setData: (key: string, value: any) => void;
  isContinueEnabled: boolean;
  setIsContinueEnabled: (enabled: boolean, callback?: ContinueCallbackType) => void;
  /**
   * An array of callbacks for each screen. Wizard will call each when that screen is reached.
   */
  onNextScreen: VoidCb[];
  /**
   * Set a callback which will be called when a specific screen is reached
   */
  setOnNextScreen: (index: number, cb: VoidCb) => void;
  // TODO: Experimental
  // TODO: to ve removed
  myCallback: CallbackFunction;
  updateCallback: (newCallback: CallbackFunction) => void;

  buttonProps: BtnProps;
  updateButtonProps: (btnProps: BtnProps) => void;
};
type BtnProps = {
  txButtonLabel?: TxKeyPath | null;
  title?: string | null;
  answer?: string | null;
  isCorrect?: boolean | null;
  callback?: CallbackFunction | null;
};

type CallbackFunction = () => void;

const initialValue: WizardContextType = {
  data: {},
  setData: noop,
  isContinueEnabled: false,
  setIsContinueEnabled: noop,
  onNextScreen: [],
  setOnNextScreen: noop,
  myCallback: noop,
  updateCallback: noop,
  buttonProps: { callback: noop },
  updateButtonProps: noop,
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
  const [data, setData] = useState<WizardData>({});
  const [isContinueEnabled, setContinueEnabled] = useState<boolean>(
    enableContinueOnFirstScreen || initialValue.isContinueEnabled,
  );

  const [myCallback, setMyCallback] = useState(() => {
    return () => {
      console.log('Initial callback function called!');
      // Initial logic
    };
  });

  // Function to update the callback function
  const updateCallback = newCallback => {
    setMyCallback(() => newCallback);
  };

  const [btnProps, setBtnProps] = useState(() => {
    return () => {
      console.log('Initial callback function called!');
      // Initial logic
    };
  });

  // Function to update the callback function
  const updateButtonProps = (btnProps: BtnProps) => {
    setBtnProps(() => btnProps);
    // setMyCallback(() => newCallback);
  };

  const setIsContinueEnabled = useCallback((enabled: boolean, callback?: ContinueCallbackType) => {
    setContinueEnabled(() => {
      callback?.(enabled);
      return enabled;
    });
  }, []);

  return (
    <WizardContext.Provider
      value={{
        data,
        setData: (key: string, value: any) => {
          setData(prevData => ({
            ...prevData,
            [key]: value,
          }));
        },
        isContinueEnabled,
        setIsContinueEnabled,
        onNextScreen: onNextScreen.current,
        setOnNextScreen: (index: number, cb: VoidCb) => {
          onNextScreen.current[index] = cb;
        },
        myCallback,
        updateCallback,

        buttonProps: btnProps,
        updateButtonProps,
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
