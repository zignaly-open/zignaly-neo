import en from "./i18n/en.json";
import es from "./i18n/es.json";
import tr from "./i18n/tr.json";
import vi from "./i18n/vi.json";
import ru from "./i18n/ru.json";
import { i18n } from "i18next";

export function addZignalyUiResources(i18nInstance: i18n) {
  i18nInstance.on("loaded", () => {
    i18nInstance.addResourceBundle("en", "zignaly-ui", en);
    i18nInstance.addResourceBundle("es", "zignaly-ui", es);
    i18nInstance.addResourceBundle("tr", "zignaly-ui", tr);
    i18nInstance.addResourceBundle("vi", "zignaly-ui", vi);
    i18nInstance.addResourceBundle("ru", "zignaly-ui", ru);
  });
}
