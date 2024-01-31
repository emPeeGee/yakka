import { TxKeyPath } from '@/core/i18n';

export type SelectableOption<T> = {
  tx: TxKeyPath;
  value: T;
};

export type Dimensions = {
  xxxs: number;
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
};
