import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ZigAlertMessage from "./";

export default {
  title: "Display/ZigAlertMessage",
  component: ZigAlertMessage,
  argTypes: {
    text: {
      type: "string",
    },
    error: {
      defaultValue: true,
      type: "boolean",
    },
    warning: {
      type: "boolean",
    },
  },
} as ComponentMeta<typeof ZigAlertMessage>;

const Template: ComponentStory<typeof ZigAlertMessage> = (args) => <ZigAlertMessage {...args} />;

export const Error = Template.bind({});
Error.args = {
  text: "Exceeds available balance",
  error: true,
};
