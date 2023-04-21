import { useEffect } from 'react';
import { setDefaultOptions } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { dateFnsLocaleMapping } from '../../../util/i18next';

export default function DateLocaleFixer(): JSX.Element {
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
  return null;
}
