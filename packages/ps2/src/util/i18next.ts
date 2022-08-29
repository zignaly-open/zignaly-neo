import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const supportedLanguages = ['en', 'ru'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    supportedLngs: supportedLanguages,
    defaultNS: 'common',
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
