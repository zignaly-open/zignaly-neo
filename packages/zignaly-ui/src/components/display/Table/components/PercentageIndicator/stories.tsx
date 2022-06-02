// Dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Components
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

export const Positive = Template.bind({});
Positive.args = {
  value: 50,
  dashboardType: "investor",
};

export const Negative = Template.bind({});
Negative.args = {
  value: -50,
  dashboardType: "investor",
};

export const NegativeUserDashboard = Template.bind({});
NegativeUserDashboard.args = {
  value: -50,
  subtitle: "2.2 years",
  withoutIcon: true,
  dashboardType: "user",
};

export const PositiveUserDashboard = Template.bind({});
PositiveUserDashboard.args = {
  value: 50,
  subtitle: "2.2 years",
  withoutIcon: true,
  dashboardType: "user",
};
