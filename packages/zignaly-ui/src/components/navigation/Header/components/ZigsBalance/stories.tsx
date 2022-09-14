import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ZigBalance from "./";

export default {
  title: "Navigation/Header/components/ZigBalance",
  component: ZigBalance,
  argTypes: {
    balance: {
      control: "text",
      defaultValue: "1000000000000000000",
    },
  },
} as ComponentMeta<typeof ZigBalance>;

const Template: ComponentStory<typeof ZigBalance> = (args) => <ZigBalance {...args} />;

export const Default = Template.bind({});
Default.args = {
  balance: "0",
};
