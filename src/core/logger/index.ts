import { ConfigLoggerType, consoleTransport, createLogger } from './logger';

type ApplicationLogs = 'info' | 'error' | 'debug' | 'warn' | 'trace';

const defaultConfig: ConfigLoggerType = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
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
      root: 'blue',
      onboarding: 'magenta',
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
const onboardLog = log.extend('onboarding');

// Kind of singletons, since they will never change and recreated
export { rootLog, onboardLog };
