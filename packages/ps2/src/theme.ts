import { themes } from '@zignaly-open/ui';
import { whitelabel } from './whitelabel';

const { mui, legacyStyledComponentsDoNotUse } =
  (whitelabel?.theme && themes[whitelabel?.theme]) || themes.dark;

export default mui;
export { legacyStyledComponentsDoNotUse };
