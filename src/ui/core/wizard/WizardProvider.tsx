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
  resetData: () => void;
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

  /**
   * Wizard's next button properties to allow to customize its behavior
   */
  nextButtonProps: BtnProps;
  setNextButtonProps: (btnProps: BtnProps) => void;
};
type BtnProps = {
  txButtonLabel?: TxKeyPath | null;
  answer?: string | null;
  isCorrect?: boolean | null;
  callback?: CallbackFunction | null;
};

type CallbackFunction = () => void;

const initialValue: WizardContextType = {
  data: {},
  setData: noop,
  resetData: noop,
  isContinueEnabled: false,
  setIsContinueEnabled: noop,
  onNextScreen: [],
  setOnNextScreen: noop,
  nextButtonProps: { callback: noop },
  setNextButtonProps: noop,
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
  const [data, setData] = useState<WizardData>({ time: new Date() });
  const [isContinueEnabled, setContinueEnabled] = useState<boolean>(
    enableContinueOnFirstScreen || initialValue.isContinueEnabled,
  );

  const [buttonProps, setButtonProps] = useState(() => {
    return noop;
  });

  const updateButtonProps = (btnProps: BtnProps) => {
    setButtonProps(() => btnProps);
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
        resetData: () => setData({}),
        isContinueEnabled,
        setIsContinueEnabled,
        onNextScreen: onNextScreen.current,
        setOnNextScreen: (index: number, cb: VoidCb) => {
          onNextScreen.current[index] = cb;
        },
        nextButtonProps: buttonProps,
        setNextButtonProps: updateButtonProps,
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
