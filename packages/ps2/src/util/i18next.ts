import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

export const supportedLanguages = ['en', 'ru'];

if (process.env.REACT_APP_ENABLE_TEST_LANGUAGE) supportedLanguages.push('ch');

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    debug: false,
    supportedLngs: supportedLanguages,
    defaultNS: 'common',
    fallbackNS: 'common',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
      format: (value: string | number, format?: string): string => {
        if (format === 'prettyNumber' && typeof value === 'number') {
          return Number(+value).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          });
        }
        return `${value}`;
      },
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
