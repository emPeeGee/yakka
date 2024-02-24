import { TxKeyPath } from '@/core/i18n';

export type SelectableOption<T> = {
  tx?: TxKeyPath;
  label?: string;
  value: T;
};

export type Dimensions = {
  /** 2 */
  xxxs: number;
  /**  4 */
  xxs: number;
  /** 8 */
  xs: number;
  /** 12 */
  sm: number;
  /** 16 */
  md: number;
  /** 24 */
  lg: number;
  /** 32 */
  xl: number;
  /** 48 */
  xxl: number;
  /** 64 */
  xxxl: number;
};
