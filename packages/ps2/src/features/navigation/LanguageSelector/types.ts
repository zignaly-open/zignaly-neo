export type LanguageSelectorProps = {
  onSelectLocale: (locale: string) => void;
  supportedLocales?: string[];
  selectedLocale: string;
};
