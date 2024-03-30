import { useContext } from 'react';

import { AlertContext } from './AlertProvider';

export function useAlert() {
  const alertCtx = useContext(AlertContext);

  if (!alertCtx) {
    throw Error('Alert is not provided. Did you forget to wrap your app with AlertProvider?');
  }

  return alertCtx;
}
