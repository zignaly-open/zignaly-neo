import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ZigAlertMessage from "./";

export default {
  title: "Display/ZigAlertMessage",
  component: ZigAlertMessage,
  argTypes: {
    type: {
      options: ["default", "error", "warning"],
      control: { type: "select" },
    },
  },
} as ComponentMeta<typeof ZigAlertMessage>;

const Template: ComponentStory<typeof ZigAlertMessage> = (args) => <ZigAlertMessage {...args} />;

export const Error = Template.bind({});
Error.args = {
  text: "Exceeds available balance",
};
