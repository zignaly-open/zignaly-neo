import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import PercentageIndicator from "./index";

export default {
  title: "Display/Table/Components/PercentageIndicator",
  component: PercentageIndicator,
} as ComponentMeta<typeof PercentageIndicator>;

const Template: ComponentStory<typeof PercentageIndicator> = (args) => (
  <div style={{ display: "grid", justifyContent: "start" }}>
    <PercentageIndicator {...args} />
  </div>
);

export const PositiveGraph = Template.bind({});
PositiveGraph.args = {
  value: 50,
  type: "graph",
};

export const NegativeGraph = Template.bind({});
NegativeGraph.args = {
  value: -50,
  type: "graph",
};

export const NegativeDefault = Template.bind({});
NegativeDefault.args = {
  value: -50,
  type: "default",
};

export const PositiveDefault = Template.bind({});
PositiveDefault.args = {
  value: 50,
  type: "default",
};

export const NegativeNumber = Template.bind({});
NegativeNumber.args = {
  value: 50,
  type: "only_number",
};

export const PositiveNumber = Template.bind({});
PositiveNumber.args = {
  value: 50,
  type: "only_number",
};
