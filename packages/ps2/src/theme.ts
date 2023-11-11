import { getZignalyThemeExport } from '@zignaly-open/ui';
import { whitelabel } from './whitelabel';

const { mui, legacyStyledComponentsDoNotUse } = getZignalyThemeExport(
  whitelabel?.theme || 'dark',
  whitelabel.themeOverrides,
);

export default mui;
export { legacyStyledComponentsDoNotUse };
