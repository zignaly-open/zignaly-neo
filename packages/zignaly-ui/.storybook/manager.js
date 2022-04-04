import { addons } from "@storybook/addons";
import zignalyTheme from "./zignalyTheme";

addons.setConfig({
  theme: zignalyTheme,

  sidebar: {
    showRoots: false,
  },
});
