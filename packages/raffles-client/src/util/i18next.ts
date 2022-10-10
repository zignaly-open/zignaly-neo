import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

const ns = [
  'global',
  'auction',
  'transfer-zig',
  'connect-wallet',
  'user-settings',
  'claim',
  'balance',
  'how-it-works',
  'footer',
  'exclusive-wallets',
];
const supportedLngs = ['en'];

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
    defaultNS: 'global',
    fallbackLng: 'en',
    ns,
    supportedLngs,
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

// Force preloading translations of the modals
// i18n.loadNamespaces([
//   'transfer-zig',
//   'connect-wallet',
//   'user-settings',
//   'claim',
// ]);

supportedLngs.forEach((lang) => {
  ns.forEach((n) => {
    i18n.addResourceBundle(
      lang,
      n,
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require(`../../public/locales/${lang}/${n}.json`),
    );
  });
});

export default i18n;
