import { rootLog } from '../logger';

export function noop() {
  rootLog.info('noop called');
}
