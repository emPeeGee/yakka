import { AppColorSchemeType } from '@/types';

export function getContrastColor(hexColor: string): string {
  const rgb = parseInt(hexColor.substring(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luma < 128 ? '#fff' : '#000';
}

export function isThemeDark(colorScheme: AppColorSchemeType): boolean {
  return colorScheme === 'dark';
}

export function isThemeLight(colorScheme: AppColorSchemeType): boolean {
  return colorScheme === 'light';
}
