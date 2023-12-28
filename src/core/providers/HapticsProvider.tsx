import { useState, useEffect, createContext, useContext, useCallback, useMemo } from 'react';
import { Platform } from 'react-native';

import * as Haptics from 'expo-haptics';

import { rootLog } from '../logger';
import { getItem, setItem } from '../storage';
import { noop } from '../utils';

const IS_HAPTICS_ENABLED_KEY = 'IS_HAPTICS_ENABLED';

// TODO: names
type FeedbackType =
  | 'lightHaptics'
  | 'mediumHaptics'
  | 'heavyHaptics'
  | 'selectionHaptics'
  | 'successHaptics'
  | 'warningHaptics'
  | 'errorHaptics';

type HapticCallbackType = (b: boolean) => void | undefined;

// NOTE: Mapped type
type HapticsContextType = {
  setHapticsEnabled: (enabled: boolean, callback: HapticCallbackType) => void;
  isHapticsEnabled: boolean;
} & { [Key in FeedbackType]: () => Promise<void> };

const initialValue: HapticsContextType = {
  isHapticsEnabled: true,
  setHapticsEnabled: noop,
  lightHaptics: () => Promise.resolve(),
  mediumHaptics: () => Promise.resolve(),
  heavyHaptics: () => Promise.resolve(),
  selectionHaptics: () => Promise.resolve(),
  successHaptics: () => Promise.resolve(),
  warningHaptics: () => Promise.resolve(),
  errorHaptics: () => Promise.resolve(),
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
      lightHaptics: createHapticHandler(Haptics.ImpactFeedbackStyle.Light),
      mediumHaptics: createHapticHandler(Haptics.ImpactFeedbackStyle.Medium),
      heavyHaptics: createHapticHandler(Haptics.ImpactFeedbackStyle.Heavy),
      successHaptics: createNotificationFeedback(Haptics.NotificationFeedbackType.Success),
      warningHaptics: createNotificationFeedback(Haptics.NotificationFeedbackType.Warning),
      errorHaptics: createNotificationFeedback(Haptics.NotificationFeedbackType.Error),
      selectionHaptics: isHapticsAvailable ? Haptics.selectionAsync : () => Promise.resolve(),
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
