import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import Countries from 'i18n-iso-countries';
import CountriesTr from 'i18n-iso-countries/langs/tr.json';
import CountriesPt from 'i18n-iso-countries/langs/pt.json';
import CountriesEs from 'i18n-iso-countries/langs/es.json';
import CountriesEn from 'i18n-iso-countries/langs/en.json';
import CountriesRu from 'i18n-iso-countries/langs/ru.json';
import CountriesVi from 'i18n-iso-countries/langs/vi.json';
import dateLocaleEnUs from 'date-fns/locale/en-US';
import dateLocaleEs from 'date-fns/locale/es';
import dateLocalePt from 'date-fns/locale/pt';
import dateLocaleTr from 'date-fns/locale/tr';
import dateLocaleRu from 'date-fns/locale/ru';
import dateLocaleVi from 'date-fns/locale/vi';

import { whitelabel } from '../../whitelabel';

Countries.registerLocale(CountriesEn);
Countries.registerLocale(CountriesPt);
Countries.registerLocale(CountriesTr);
Countries.registerLocale(CountriesEs);
Countries.registerLocale(CountriesRu);
Countries.registerLocale(CountriesVi);

// mishka vodka balalayka
// if (CountriesEn.countries.RU)
//   CountriesEn.countries.RU = 'Mother Russia' as unknown as string[];

export const supportedLanguages = ['en', 'es', 'pt', 'tr', 'ru', 'vi'].filter(
  (l) => !whitelabel?.locales || whitelabel?.locales.includes(l),
);

if (process.env.REACT_APP_ENABLE_TEST_LANGUAGE) supportedLanguages.push('ch');

export const dateFnsLocaleMapping = {
  en: dateLocaleEnUs,
  es: dateLocaleEs,
  pt: dateLocalePt,
  ru: dateLocaleRu,
  tr: dateLocaleTr,
  vi: dateLocaleVi,
};

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
      loadPath:
        ((typeof process.env.PUBLIC_URL === 'string' &&
          (process.env.PUBLIC_URL as string)) ||
          '') + '/locales/{{lng}}/{{ns}}.json',
    },
    debug: false,
    ns: ['common', 'error', 'pages', 'zignaly-ui'],
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
      defaultVariables: { whitelabel: whitelabel.name },
      escapeValue: false,
      format: (value: string | number, format?: string): string => {
        if (format === 'prettyNumber' && typeof value === 'number') {
          return Number(+value).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          });
        }
        if (format === 'prettyNumberFull' && typeof value === 'number') {
          return Number(+value).toLocaleString(undefined, {
            maximumFractionDigits: 20,
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
