import { Alert, AlertButton, Platform } from 'react-native';

const alertPolyfill = (
  title: string,
  message?: string | undefined,
  buttons?: AlertButton[] | undefined,
  // options?: AlertOptions | undefined,
) => {
  const result = window.confirm([title, message].filter(Boolean).join('\n'));

  if (result) {
    const confirmOption = buttons?.find(({ style }) => style !== 'cancel');
    confirmOption && confirmOption?.onPress();
  } else {
    const cancelOption = buttons?.find(({ style }) => style === 'cancel');
    cancelOption && cancelOption?.onPress();
  }
};

export const enhancedAlert = Platform.OS === 'web' ? alertPolyfill : Alert.alert;
