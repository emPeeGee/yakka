import { useState, useEffect, createContext, useContext, useCallback, useMemo } from 'react';
import { Platform } from 'react-native';

import * as Haptics from 'expo-haptics';

import { rootLog } from '../logger';
import { getItem, setItem } from '../storage';
import { noop } from '../utils';

const IS_HAPTICS_ENABLED_KEY = 'IS_HAPTICS_ENABLED';

// TODO: names
type FeedbackType = 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'warning' | 'error';

type HapticCallbackType = (b: boolean) => void | undefined;

// NOTE: Mapped type
type HapticsContextType = {
  setHapticsEnabled: (enabled: boolean, callback: HapticCallbackType) => void;
  isHapticsEnabled: boolean;
} & { [Key in FeedbackType]: () => Promise<void> };

const initialValue: HapticsContextType = {
  isHapticsEnabled: true,
  setHapticsEnabled: noop,
  light: () => Promise.resolve(),
  medium: () => Promise.resolve(),
  heavy: () => Promise.resolve(),
  selection: () => Promise.resolve(),
  success: () => Promise.resolve(),
  warning: () => Promise.resolve(),
  error: () => Promise.resolve(),
};

const HapticsContext = createContext<HapticsContextType>(initialValue);

type HapticsProviderProps = {
  children?: React.ReactNode;
};

export const HapticsProvider = ({ children }: HapticsProviderProps): React.ReactNode => {
  const [isHapticsEnabled, setIsHapticsEnabled] = useState<boolean>(initialValue.isHapticsEnabled);

  // IDEA: make it promise for optimization ?
  const setHapticsEnabled = useCallback((enabled: boolean, callback: HapticCallbackType) => {
    setIsHapticsEnabled(() => {
      setIsHapticsEnabled(enabled);
      callback(enabled);
      setItem(IS_HAPTICS_ENABLED_KEY, enabled);

      return enabled;
    });
  }, []);

  const isHapticsAvailable = useMemo(
    () => isHapticsEnabled && Platform.OS !== 'web',
    [isHapticsEnabled],
  );

  const createHapticHandler = useCallback(
    (type: Haptics.ImpactFeedbackStyle) => {
      return isHapticsAvailable ? () => Haptics.impactAsync(type) : () => Promise.resolve();
    },
    [isHapticsAvailable],
  );

  const createNotificationFeedback = useCallback(
    (type: Haptics.NotificationFeedbackType) => {
      return isHapticsAvailable ? () => Haptics.notificationAsync(type) : () => Promise.resolve();
    },
    [isHapticsAvailable],
  );

  const haptics = useMemo(
    () => ({
      light: createHapticHandler(Haptics.ImpactFeedbackStyle.Light),
      medium: createHapticHandler(Haptics.ImpactFeedbackStyle.Medium),
      heavy: createHapticHandler(Haptics.ImpactFeedbackStyle.Heavy),
      success: createNotificationFeedback(Haptics.NotificationFeedbackType.Success),
      warning: createNotificationFeedback(Haptics.NotificationFeedbackType.Warning),
      error: createNotificationFeedback(Haptics.NotificationFeedbackType.Error),
      selection: isHapticsAvailable ? Haptics.selectionAsync : () => Promise.resolve(),
    }),
    [createHapticHandler, createNotificationFeedback],
  );

  useEffect(() => {
    (async () => {
      getItem<boolean>(IS_HAPTICS_ENABLED_KEY).then(async item => {
        setIsHapticsEnabled(item === null ? true : item);
      });
    })();
  }, []);

  rootLog.info(`isHapticsAvailable = ${isHapticsAvailable}`);

  return (
    <HapticsContext.Provider value={{ ...haptics, isHapticsEnabled, setHapticsEnabled }}>
      {children}
    </HapticsContext.Provider>
  );
};

export const useHaptics = () => useContext(HapticsContext);
