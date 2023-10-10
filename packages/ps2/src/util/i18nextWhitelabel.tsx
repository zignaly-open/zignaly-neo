import i18n from './i18next';
import React, { PropsWithChildren } from 'react';

let overrides: Record<string, Record<string, Record<string, string>>> | null =
  null;

const loaderPromise = fetch('/translationOverride.json')
  .then((r) => r.json())
  .then((v) => {
    overrides = v;
    // postProcessOverrides(overrides);
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error('Failed to load translation overrides', e);
    overrides = {};
  });

i18n.on('loaded', (data) => {
  for (const [language, namespaces] of Object.entries(data)) {
    for (const [ns, loaded] of Object.entries(namespaces)) {
      if (loaded) {
        i18n.addResourceBundle(language, ns, overrides?.[language]?.[ns] || {});
      }
    }
  }
});

// function postProcessOverrides(overrides) {}

const I18NextWhitelabelTranslationOverrideLoader: React.FC<
  PropsWithChildren
> = ({ children }) => {
  if (!overrides) throw loaderPromise;
  return <>{children}</>;
};

export default I18NextWhitelabelTranslationOverrideLoader;
