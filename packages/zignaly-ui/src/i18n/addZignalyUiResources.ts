import { i18n } from "i18next";
import * as allLanguages from "./ns";

export function addZignalyUiResources(i18nInstance: i18n) {
  i18nInstance.on("loaded", () => {
    Object.entries(allLanguages).forEach(([l, v]) =>
      i18nInstance.addResourceBundle(l, "zignaly-ui", v),
    );
  });
}
