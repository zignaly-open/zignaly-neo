// Dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Styles
import { dark } from "../../../../../theme";

// Components
import PercentageIndicator from "./index";

export default {
  title: "Display/Table/Components/PercentageIndicator",
  component: PercentageIndicator,
} as ComponentMeta<typeof PercentageIndicator>;

const Template: ComponentStory<typeof PercentageIndicator> = (args) => (
  <PercentageIndicator {...args} />
);

export const Positive = Template.bind({});
Positive.args = {
  value: 50,
  theme: dark,
};

export const Negative = Template.bind({});
Negative.args = {
  value: -50,
  theme: dark,
};
