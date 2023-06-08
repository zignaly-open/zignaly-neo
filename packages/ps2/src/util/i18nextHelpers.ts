import { useEffect } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { setDefaultOptions } from 'date-fns';
import { dateFnsLocaleMapping } from './i18next';

/**
 * Use this to preload ns if you know some user interaction may trigger the loading of it
 * @param name
 */
export function usePrefetchTranslation(name: string | string[]) {
  useEffect(() => {
    i18n.loadNamespaces(name);
  }, [i18n.language]);
}

export function useDateLocaleFixer() {
  const {
    i18n: { language: locale },
  } = useTranslation();

  useEffect(() => {
    locale &&
      setDefaultOptions({
        locale:
          dateFnsLocaleMapping[locale !== 'ch' ? locale.split('_')[0] : 'ru'] ||
          dateFnsLocaleMapping.en,
      });
  }, [locale]);
}
