import i18n from './i18next';
import { whitelabel } from '../../whitelabel';

const overrides = whitelabel.translationOverrides;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type TranslationRecord = Record<string, string | TranslationRecord>;

export function flattenOverrideObject(
  obj: TranslationRecord,
  prefix = '',
  result = {} as Record<string, string>,
): Record<string, string> {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      result[prefix + key] = value;
    } else {
      flattenOverrideObject(value, `${prefix}${key}.`, result);
    }
  }
  return result;
}

if (whitelabel.translationOverrides) {
  const addOverrides = (
    data: Record<string, Record<string, boolean | unknown>>,
  ) => {
    // this is for when we have the overrides, and we've just loaded the ns
    for (const [language, namespaces] of Object.entries(data || {})) {
      for (const [ns, loaded] of Object.entries(namespaces || {})) {
        const override = overrides?.[language]?.[ns];
        const overridesProcessed = flattenOverrideObject(override || {});
        if (loaded) {
          for (const [k, v] of Object.entries(overridesProcessed)) {
            i18n.addResource(language, ns, k, v);
          }
        }
      }
    }
  };

  i18n.on('loaded', addOverrides);
}
