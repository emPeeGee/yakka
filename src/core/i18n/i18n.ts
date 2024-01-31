import { I18nManager, NativeModules, Platform } from 'react-native';

// import * as Localization from 'expo-localization';
import { I18n, TranslateOptions } from 'i18n-js';

// if English isn't your default language, move Translations to the appropriate language file.
import { en, Translations } from './en';
import { ro } from './ro';
// IDEA: ru
import { rootLog } from '../logger';

const deviceLanguage =
  // NOTE: hardcoded, but web is not the target
  Platform.OS === 'web'
    ? 'en_US'
    : Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
      : NativeModules.I18nManager.localeIdentifier;

// The preferred language is the first element in the array, however, we fallback to en-US, especially for tests.
const preferredLanguage: { languageTag: string; textDirection: 'ltr' | 'rtl' } = {
  languageTag: deviceLanguage,
  textDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
} || {
  languageTag: 'en-US',
  textDirection: 'ltr',
};

// handle RTL languages
export const isRTL = preferredLanguage.textDirection === 'rtl';
I18nManager.allowRTL(isRTL);
I18nManager.forceRTL(isRTL);

/**
 * Builds up valid keypaths for translations.
 */
export type TxKeyPath = RecursiveKeyOf<Translations>;

// via: https://stackoverflow.com/a/65333050
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`>;
}[keyof TObj & (string | number)];

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfHandleValue<TValue, Text extends string> = TValue extends any[]
  ? Text
  : TValue extends object
    ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
    : Text;

/**
 * we need always include "*-US" for some valid language codes because when you change the system language,
 * the language code is the suffixed with "-US". i.e. if a device is set to English ("en"),
 * if you change to another language and then return to English language code is now "en-US".
 */
export const i18n = new I18n(
  { en, 'en-US': en, ro },
  { enableFallback: true, locale: preferredLanguage.languageTag },
);

/**
 * Translates text.
 *
 * @param key The i18n key.
 * @param options The i18n options.
 * @returns The translated text.
 *
 * @example
 * Translations:
 *
 * ```en.ts
 * {
 *  "hello": "Hello, {{name}}!"
 * }
 * ```
 *
 * Usage:
 * ```ts
 * import { translate } from "i18n-js"
 *
 * translate("common.ok", { name: "world" })
 * // => "Hello world!"
 * ```
 */
export function translate(key: TxKeyPath, options?: TranslateOptions) {
  return i18n.t(key, options);
}

rootLog.info(
  `I18N has been initialized. Preferred locale is ${preferredLanguage.languageTag} and ${preferredLanguage.textDirection} `,
);
