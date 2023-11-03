import { useEffect } from 'react';
import i18n from 'i18next';

/**
 * Use this to preload ns if you know some user interaction may trigger the loading of it
 * @param name
 */
export function usePrefetchTranslation(name: string | string[]) {
  useEffect(() => {
    i18n.loadNamespaces(name);
  }, [i18n.language]);
}
