import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { addZignalyUiResources } from '@zignaly-open/ui/i18n';

export const supportedLanguages = ['en'];

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
    ns: ['common', 'error', 'zignaly-ui'],
    supportedLngs: supportedLanguages,
    defaultNS: 'common',
    fallbackNS: 'common',
    fallbackLng: 'en',
    nonExplicitSupportedLngs: false,
    cleanCode: true,
    detection: {
      order: ['cookie', 'querystring', 'simpleBrowserDetector', 'navigator'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next-lng',
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
      caches: ['cookie'],
      cookieOptions: { path: '/', sameSite: 'strict' },
    },
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

addZignalyUiResources(i18n);

export default i18n;
