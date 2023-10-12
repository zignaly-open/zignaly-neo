import i18n from './i18next';
import React, { PropsWithChildren } from 'react';
import { whitelabel, whitelabelName } from '../whitelabel';

let overrides: Record<string, Record<string, Record<string, string>>> | null =
  null;

let loaderPromise: Promise<unknown> | null = null;

if (whitelabel.translationOverrides) {
  const addOverrides = (
    data: Record<string, Record<string, boolean | unknown>>,
  ) => {
    // this is for when we have the overrides, and we've just loaded the ns
    for (const [language, namespaces] of Object.entries(data || {})) {
      for (const [ns, loaded] of Object.entries(namespaces || {})) {
        const override = overrides?.[language]?.[ns];
        if (loaded && override) {
          i18n.addResourceBundle(language, ns, override);
        }
      }
    }
  };

  const postProcessOverrides = () => {
    // this is for whenn we already have some ns, and now we've just loaded the overrides

    // we can not just add resources before they are loaded
    // because in this case react-i18next thinks that it already has a resource
    // and it won't load the full translation

    // here we check only the current language
    // because the scenario when they loaded 1st language, switched to another and then would switch back
    // is extremely unlikely provided this function should not be even firing normally
    addOverrides({ [i18n.language]: i18n.getDataByLanguage(i18n.language) });
  };

  loaderPromise = fetch(`/locales/_overrides/${whitelabelName}.json`)
    .then((r) => r.json())
    .then((v) => {
      overrides = v;
      postProcessOverrides();
    })

    .catch((e) => {
      // eslint-disable-next-line no-console
      console.error('Failed to load translation overrides', e);
      overrides = {};
    });

  i18n.on('loaded', addOverrides);
}

const I18NextWhitelabelTranslationOverrideLoader: React.FC<
  PropsWithChildren
> = ({ children }) => {
  if (!overrides && whitelabel.translationOverrides) throw loaderPromise;
  return <>{children}</>;
};

export default I18NextWhitelabelTranslationOverrideLoader;
