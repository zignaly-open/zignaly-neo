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
Countries.registerLocale(CountriesEn);
Countries.registerLocale(CountriesPt);
Countries.registerLocale(CountriesTr);
Countries.registerLocale(CountriesEs);
Countries.registerLocale(CountriesRu);
Countries.registerLocale(CountriesVi);
if (CountriesEn.countries.RU)
    CountriesEn.countries.RU = 'Mother Russia';
export var supportedLanguages = ['en', 'es', 'pt', 'tr', 'ru', 'vi'];
if (process.env.REACT_APP_ENABLE_TEST_LANGUAGE)
    supportedLanguages.push('ch');
export var dateFnsLocaleMapping = {
    en: dateLocaleEnUs,
    es: dateLocaleEs,
    pt: dateLocalePt,
    ru: dateLocaleRu,
    tr: dateLocaleTr,
    vi: dateLocaleVi,
};
i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
    backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    debug: false,
    ns: [
        'action',
        'auth',
        'common',
        'deposit-crypto',
        'edit-investment',
        'error',
        'investors',
        'management',
        'my-balances',
        'my-dashboard',
        'transactions-history',
        'pages',
        'service',
        'service-header',
        'table',
        'withdraw',
        'withdraw-crypto',
        'withdraw-your-investment',
        'settings',
        'purchase-deposit-crypto',
    ],
    supportedLngs: supportedLanguages,
    defaultNS: 'common',
    fallbackNS: 'common',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
        format: function (value, format) {
            if (format === 'prettyNumber' && typeof value === 'number') {
                return Number(+value).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                });
            }
            return "".concat(value);
        },
    },
    react: {
        useSuspense: true,
    },
});
export default i18n;
//# sourceMappingURL=i18next.js.map