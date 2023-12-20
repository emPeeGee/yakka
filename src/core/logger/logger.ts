import { LOGGER_COLORS, LoggerColors, RESET_COLOR } from '@/core/logger/colors';

type TransportType = {
  msg: string;
  rawMsg: string;
  level: { severity: number; text: string };
  extension?: string | null;
  options?: TransportOptionsType;
};

type TransportOptionsType = {
  colors: { [key: string]: keyof LoggerColors };
  extensionColors: { [key: string]: keyof LoggerColors };
  consoleFunc?: ((...data: unknown[]) => void) | null;
};

type TransportFunctionType = (props: TransportType) => any;

type LevelsType = { [key: string]: number };
type LogMethodType = (level: string, extension: string | null, ...msgs: any[]) => boolean | void;
type ExtendedLogType = { [key: string]: (...msgs: any[]) => boolean | any };

type ConfigLoggerType = {
  severity: string;
  transport?: TransportFunctionType | TransportFunctionType[];
  transportOptions?: TransportOptionsType;
  levels?: LevelsType;
  async?: boolean;
  asyncFunc?: (cb: () => boolean) => void;
  stringifyFunc?: (msg: unknown) => string;
  dateFormat?: string | ((date: Date) => string); //"time" | "local" | "utc" | "iso" | "function";
  printLevel?: boolean;
  printDate?: boolean;
  enabled?: boolean;
  enabledExtensions?: string[] | string | null;
};

const consoleTransport: TransportFunctionType = (props: TransportType) => {
  if (!props) return false;

  let msg = props.msg;
  let color;

  if (
    props.options?.colors &&
    props.options.colors[props.level.text] &&
    LOGGER_COLORS[props.options.colors[props.level.text]]
  ) {
    color = `\x1b[${LOGGER_COLORS[props.options.colors[props.level.text]]}m`;
    msg = `${color}${msg}${RESET_COLOR}`;
  }

  if (props.extension && props.options?.extensionColors) {
    let extensionColor = '\x1b[7m';

    if (
      props.options.extensionColors[props.extension] &&
      LOGGER_COLORS[props.options.extensionColors[props.extension]]
    ) {
      extensionColor = `\x1b[${
        LOGGER_COLORS[props.options.extensionColors[props.extension]] + 10
      }m`;
    }

    const extStart = color ? RESET_COLOR + extensionColor : extensionColor;
    const extEnd = color ? RESET_COLOR + color : RESET_COLOR;
    msg = msg.replace(props.extension, `${extStart} ${props.extension} ${extEnd}`);
  }

  if (props.options?.consoleFunc) {
    props.options.consoleFunc(msg.trim());
  } else {
    console.log(msg.trim());
  }

  return true;
};

const asyncFunc = (cb: () => boolean): void => {
  setTimeout(() => {
    return cb();
  }, 0);
};

const stringifyFunc = (msg: any): string => {
  let stringMsg = '';
  if (typeof msg === 'string') {
    stringMsg = msg + ' ';
  } else if (typeof msg === 'function') {
    stringMsg = '[function] ';
  } else if (msg && msg.stack && msg.message) {
    stringMsg = msg.message + ' ';
  } else {
    try {
      stringMsg = '\n' + JSON.stringify(msg, undefined, 2) + '\n';
    } catch (error) {
      stringMsg += 'Undefined Message';
    }
  }
  return stringMsg;
};

/** Reserved key log string to avoid overwriting other methods or properties */
const reservedKey: string[] = [
  'extend',
  'enable',
  'disable',
  'getExtensions',
  'setSeverity',
  'getSeverity',
  'getOriginalConsole',
];

/** Default configuration parameters for logger */
const defaultLogger: ConfigLoggerType = {
  severity: 'debug',
  transport: consoleTransport,
  transportOptions: {
    colors: {},
    extensionColors: {},
    consoleFunc: null,
  },
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  async: false,
  asyncFunc: asyncFunc,
  stringifyFunc: stringifyFunc,
  printLevel: true,
  printDate: true,
  dateFormat: 'time',
  enabled: true,
  enabledExtensions: null,
};

class Logs {
  private _levels: LevelsType;
  private _level: string;
  private _transport: TransportFunctionType | TransportFunctionType[];
  private _transportOptions: TransportOptionsType;
  private _async: boolean;
  private _asyncFunc: (cb: () => boolean) => void;
  private _stringifyFunc: (msg: unknown) => string;
  private _dateFormat: string | ((date: Date) => string);
  private _printLevel: boolean;
  private _printDate: boolean;
  private _enabled: boolean;
  private _enabledExtensions: string[] | null = null;
  private _extensions: string[] = [];
  private _extendedLogs: { [key: string]: ExtendedLogType } = {};
  private _originalConsole?: typeof console;

  constructor(config: Required<ConfigLoggerType>) {
    this._levels = config.levels;
    this._level = config.severity ?? Object.keys(this._levels)[0];

    this._transport = config.transport;
    this._transportOptions = config.transportOptions;

    this._asyncFunc = config.asyncFunc;
    this._async = config.async;

    this._stringifyFunc = config.stringifyFunc;

    this._dateFormat = config.dateFormat;

    this._printLevel = config.printLevel;
    this._printDate = config.printDate;

    this._enabled = config.enabled;

    if (Array.isArray(config.enabledExtensions)) {
      this._enabledExtensions = config.enabledExtensions;
    } else if (typeof config.enabledExtensions === 'string') {
      this._enabledExtensions = [config.enabledExtensions];
    }

    /** Bind correct log levels methods */
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let _this = this;
    Object.keys(this._levels).forEach((level: string) => {
      if (typeof level !== 'string') {
        throw Error(`[logger] ERROR: levels must be strings`);
      }
      if (level[0] === '_') {
        throw Error(
          `[logger] ERROR: keys with first char "_" is reserved and cannot be used as levels`,
        );
      }
      if (reservedKey.indexOf(level) !== -1) {
        throw Error(
          `[logger] ERROR: [${level}] is a reserved key, you cannot set it as custom level`,
        );
      }

      if (typeof this._levels[level] === 'number') {
        _this[level] = this._log.bind(this, level, null);
      } else {
        throw Error(`[logger] ERROR: [${level}] wrong level config`);
      }
    }, this);
  }

  /** Log messages methods and level filter */
  private _log: LogMethodType = (level, extension, ...msgs) => {
    if (this._async) {
      return this._asyncFunc(() => {
        return this._sendToTransport(level, extension, msgs);
      });
    }

    return this._sendToTransport(level, extension, msgs);
  };

  private _sendToTransport = (level: string, extension: string | null, msgs: any) => {
    if (!this._enabled) return false;
    if (!this._isLevelEnabled(level)) {
      return false;
    }
    if (extension && !this._isExtensionEnabled(extension)) {
      return false;
    }
    const msg = this._formatMsg(level, extension, msgs);
    const transportProps: TransportType = {
      msg,
      rawMsg: msgs,
      level: { severity: this._levels[level], text: level },
      extension: extension,
      options: this._transportOptions,
    };
    if (Array.isArray(this._transport)) {
      for (let i = 0; i < this._transport.length; i++) {
        this._transport[i](transportProps);
      }
    } else {
      this._transport(transportProps);
    }
    return true;
  };

  private _stringifyMsg = (msg: unknown): string => {
    return this._stringifyFunc(msg);
  };

  private _formatMsg = (level: string, extension: string | null, msgs: any): string => {
    let nameTxt: string = '';
    if (extension) {
      nameTxt = `${extension} | `;
    }

    let dateTxt: string = '';
    if (this._printDate) {
      if (typeof this._dateFormat === 'string') {
        switch (this._dateFormat) {
          case 'time':
            dateTxt = `${new Date().toLocaleTimeString()} | `;
            break;
          case 'local':
            dateTxt = `${new Date().toLocaleString()} | `;
            break;
          case 'utc':
            dateTxt = `${new Date().toUTCString()} | `;
            break;
          case 'iso':
            dateTxt = `${new Date().toISOString()} | `;
            break;
          default:
            break;
        }
      } else if (typeof this._dateFormat === 'function') {
        dateTxt = this._dateFormat(new Date());
      }
    }

    let levelTxt = '';
    if (this._printLevel) {
      levelTxt = `${level.toUpperCase()} : `;
    }

    let stringMsg: string = dateTxt + nameTxt + levelTxt;

    if (Array.isArray(msgs)) {
      for (let i = 0; i < msgs.length; ++i) {
        stringMsg += this._stringifyMsg(msgs[i]);
      }
    } else {
      stringMsg += this._stringifyMsg(msgs);
    }

    return stringMsg;
  };

  /** Return true if level is enabled */
  private _isLevelEnabled = (level: string): boolean => {
    if (this._levels[level] < this._levels[this._level]) {
      return false;
    }
    return true;
  };

  /** Return true if extension is enabled */
  private _isExtensionEnabled = (extension: string): boolean => {
    if (!this._enabledExtensions) {
      return true;
    }
    if (this._enabledExtensions.includes(extension)) {
      return true;
    }
    return false;
  };

  /** Extend logger with a new extension */
  extend = (extension: string): ExtendedLogType => {
    if (extension === 'console') {
      throw Error(`[logger:extend] ERROR: you cannot set [console] as extension!`);
    }
    if (this._extensions.includes(extension)) {
      return this._extendedLogs[extension];
    }
    this._extendedLogs[extension] = {};
    this._extensions.push(extension);
    const extendedLog = this._extendedLogs[extension];
    Object.keys(this._levels).forEach((level: string) => {
      extendedLog[level] = (...msgs: any) => {
        this._log(level, extension, ...msgs);
      };
      extendedLog['extend'] = () => {
        throw Error(`[logger] ERROR: you cannot extend a logger from an already extended logger`);
      };
      extendedLog['enable'] = () => {
        throw Error(`[logger] ERROR: You cannot enable a logger from extended logger`);
      };
      extendedLog['disable'] = () => {
        throw Error(`[logger] ERROR: You cannot disable a logger from extended logger`);
      };
      extendedLog['getExtensions'] = () => {
        throw Error(`[logger] ERROR: You cannot get extensions from extended logger`);
      };
      extendedLog['setSeverity'] = () => {
        throw Error(`[logger] ERROR: You cannot set severity from extended logger`);
      };
      extendedLog['getSeverity'] = () => {
        throw Error(`[logger] ERROR: You cannot get severity from extended logger`);
      };
      extendedLog['getOriginalConsole'] = () => {
        throw Error(`[logger] ERROR: You cannot get original console from extended logger`);
      };
    });
    return extendedLog;
  };

  /** Enable logger or extension */
  enable = (extension?: string): boolean => {
    if (!extension) {
      this._enabled = true;
      return true;
    }

    if (this._extensions.includes(extension)) {
      if (this._enabledExtensions) {
        if (!this._enabledExtensions.includes(extension)) {
          this._enabledExtensions.push(extension);
          return true;
        } else {
          return true;
        }
      } else {
        this._enabledExtensions = [];
        this._enabledExtensions.push(extension);
        return true;
      }
    } else {
      throw Error(`[logger:enable] ERROR: Extension [${extension}] not exist`);
    }
  };

  // /** Disable logger or extension */
  disable = (extension?: string): boolean => {
    if (!extension) {
      this._enabled = false;
      return true;
    }
    if (this._extensions.includes(extension)) {
      if (this._enabledExtensions) {
        let extIndex = this._enabledExtensions.indexOf(extension);
        if (extIndex > -1) {
          this._enabledExtensions.splice(extIndex, 1);
        }
        return true;
      } else {
        return true;
      }
    } else {
      throw Error(`[logger:disable] ERROR: Extension [${extension}] not exist`);
    }
  };

  /** Return all created extensions */
  getExtensions = (): string[] => {
    return this._extensions;
  };

  /** Set log severity API */
  setSeverity = (level: string): string => {
    if (level in this._levels) {
      this._level = level;
    } else {
      throw Error(`[logger:setSeverity] ERROR: Level [${level}] not exist`);
    }
    return this._level;
  };

  /** Get current log severity API */
  getSeverity = (): string => {
    return this._level;
  };
}

/**
 * Create a logger object. All params will take default values if not passed.
 * each levels has its level severity so we can filter logs with < and > operators
 * all subsequent levels to the one selected will be exposed (ordered by severity asc)
 * through the transport
 */
const createLogger = <Y extends string>(config?: ConfigLoggerType) => {
  type LevelMethods<levels extends string> = {
    [key in levels]: (...args: unknown[]) => void;
  };

  type LoggerType = LevelMethods<Y>;

  type ExtendMethods = {
    extend: (extension: string) => LoggerType;
  };

  return new Logs({
    ...defaultLogger,
    ...(config as Required<ConfigLoggerType>),
  }) as unknown as Omit<Logs, 'extend'> & LoggerType & ExtendMethods;
};

export { createLogger, consoleTransport };

export type { ConfigLoggerType };
