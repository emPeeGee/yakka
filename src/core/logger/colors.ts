export type LoggerColors = {
  black: number;
  red: number;
  green: number;
  yellow: number;
  blue: number;
  magenta: number;
  cyan: number;
  white: number;
  grey: number;
  redBright: number;
  greenBright: number;
  yellowBright: number;
  blueBright: number;
  magentaBright: number;
  cyanBright: number;
  whiteBright: number;
};

const LOGGER_COLORS: LoggerColors = {
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37,
  grey: 90,
  redBright: 91,
  greenBright: 92,
  yellowBright: 93,
  blueBright: 94,
  magentaBright: 95,
  cyanBright: 96,
  whiteBright: 97,
};

const RESET_COLOR = '\x1b[0m';

export { LOGGER_COLORS, RESET_COLOR };
