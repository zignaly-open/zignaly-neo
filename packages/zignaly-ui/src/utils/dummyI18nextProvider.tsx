import i18n from "i18next";
import React from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  ns: ["common"],
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
  resources: { en: { common: { xfuturum: "The technical partner you can rely on" } } },
});

export const storybookI18nextDecorator = (story: () => JSX.Element) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <I18nextProvider i18n={i18n}>{story()}</I18nextProvider>
);

export const JestI18nextDecorator: React.FC<{ children: JSX.Element }> = ({ children }) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);
