// Dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Components
import PercentageIndicator from "./index";

export default {
  title: "Display/Table/Components/PercentageIndicator",
  component: PercentageIndicator,
  argTypes: {
    size: {
      control: "number",
      default: 50,
    },
  },
} as ComponentMeta<typeof PercentageIndicator>;

const Template: ComponentStory<typeof PercentageIndicator> = (args) => (
  <PercentageIndicator {...args} />
);

export const Positive = Template.bind({});
Positive.args = {
  value: 50,
};

export const Negative = Template.bind({});
Negative.args = {
  value: -50,
};
