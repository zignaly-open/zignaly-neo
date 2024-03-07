import i18n from "i18next";
import React from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import * as allLanguages from "./ns";
import { addZignalyUiResources } from "../i18n";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  ns: ["zignaly-ui"],
  defaultNS: "zignaly-ui",
  interpolation: {
    escapeValue: false,
  },
  resources: Object.entries(allLanguages).reduce((memo, [l, v]) => {
    memo[l] = { "zignaly-ui": v };
    return memo;
  }, {}),
});

addZignalyUiResources(i18n);

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
