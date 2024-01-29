import logger from './logger';
import { BASE_API, INDEX_HTML } from './constants';

export default function runEnvChecks() {
  if (!BASE_API) {
    logger.error('`BASE_API` should be defined');
    process.exit(1);
  }

  if (!INDEX_HTML) {
    logger.error('build/index.html is missing, aborting');
    process.exit(1);
  }
}
