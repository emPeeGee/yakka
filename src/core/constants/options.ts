import { SelectableOption, UserColorSchemeType } from '@/types';

export const COLOR_SCHEME_OPTIONS: SelectableOption<UserColorSchemeType>[] = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'System', value: 'system' },
];
