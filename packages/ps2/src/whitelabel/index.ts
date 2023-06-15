import * as clients from './configs';
import { WhitelabelOverride } from './type';

const { envkey_REACT_APP_WHITELABEL: whitelabel } = process.env;

export default ((whitelabel &&
  typeof clients[whitelabel] !== 'undefined' &&
  clients[whitelabel]) ||
  {}) as WhitelabelOverride;
