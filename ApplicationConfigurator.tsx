import { useEffect } from 'react';

import { ConfigLoggerType, consoleTransport, createLogger } from '@/core/logger/console';
import { RootNavigator } from '@/navigations/RootNavigator';

type ApplicationLogs = 'cus' | 'info' | 'error' | 'debug' | 'warn' | 'trace';

const defaultConfig: ConfigLoggerType = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
    cus: 4,
  },
  severity: 'debug',
  transport: consoleTransport,
  transportOptions: {
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
      debug: 'greenBright',
      cus: 'magenta',
    },
    extensionColors: {
      root: 'green',
    },
  },
  async: true,
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
  enabled: true,
};

const log = createLogger<ApplicationLogs>(defaultConfig);
const rootLog = log.extend('root');

export function ApplicationConfigurator() {
  // kinda, create own function, like info, info2 with different preset
  useEffect(() => {
    log.info('hello there', log.getSeverity());
    log.warn('hello there', log.getSeverity());
    log.debug('hello there', log.getSeverity());
    log.cus('hello there');
    rootLog.warn('showing');
  }, []);

  return <RootNavigator />;
}
