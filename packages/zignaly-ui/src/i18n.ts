import en from "./i18n/static/en.json";
import es from "./i18n/static/es.json";
import tr from "./i18n/static/tr.json";
import vi from "./i18n/static/vi.json";
import ru from "./i18n/static/ru.json";
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
