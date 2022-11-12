import { useEffect } from 'react';
import { setDefaultOptions } from 'date-fns';
import * as locales from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

export default function DateLocaleFixer(): JSX.Element {
  const {
    i18n: { language: locale },
  } = useTranslation();

  useEffect(() => {
    locale &&
      setDefaultOptions({
        locale:
          locales[locale !== 'ch' ? locale.split('_')[0] : 'ru'] ||
          locales.enUS,
      });
  }, [locale]);
  return null;
}
