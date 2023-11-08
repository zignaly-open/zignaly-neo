import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

export const supportedLanguages = ['en'];

const getFallbackLanguage = (locale: string): string | string[] => {
  const getFamily = (x: string) => x.split(/[_-]/)[0];
  return supportedLanguages.includes(locale)
    ? [locale, 'en']
    : [
        ...supportedLanguages.filter((x) => getFamily(x) === getFamily(locale)),
        'en',
      ];
};

const simpleBrowserDetector = new LanguageDetector();
simpleBrowserDetector.addDetector({
  name: 'simpleBrowserDetector',
  lookup() {
    return getFallbackLanguage(
      navigator?.languages?.[0] || navigator?.language || '',
    );
  },
});

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(simpleBrowserDetector)
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    debug: false,
    ns: ['common', 'error'],
    supportedLngs: supportedLanguages,
    defaultNS: 'common',
    fallbackNS: 'common',
    fallbackLng: getFallbackLanguage,
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

export default i18n;
