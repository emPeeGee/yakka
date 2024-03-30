import { TextStyle, ViewStyle } from 'react-native';

import { TxKeyPath } from '@/core/i18n';

export enum ALERT_LEVEL {
  Info,
  Success,
  Error,
}

export type AlertOptions = {
  tx: TxKeyPath;
  level: ALERT_LEVEL;
  duration?: number;
  noTimeoutBar?: boolean;
  limit?: number | null;
  onPress?: (remove: () => void) => void;
  options?: {
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
    timeoutBarStyle?: ViewStyle;
  };
};

export type AlertItemType = {
  id: string;
} & AlertOptions;
