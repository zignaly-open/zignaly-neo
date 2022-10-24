import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import * as domainMessages from './i18n';

const messages = {
  // fr: { ...frenchMessages, ...domainMessages.fr },
  en: { ...englishMessages, ...domainMessages.en },
};

const i18nProvider = polyglotI18nProvider((locale) => messages[locale]);

export default i18nProvider;
