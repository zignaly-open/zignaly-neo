import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BalanceSummary } from ".";

export default {
  title: "Display/Table/Components/BalanceSummary",
  component: BalanceSummary,
} as ComponentMeta<typeof BalanceSummary>;

const Template: ComponentStory<typeof BalanceSummary> = (args) => (
  <div style={{ justifyContent: "start", display: "flex" }}>
    <BalanceSummary {...args} />
  </div>
);

export const BalancePositive = Template.bind({});
BalancePositive.args = {
  profit: 100,
  totalValue: 80000,
};

export const BalanceNegative = Template.bind({});
BalanceNegative.args = {
  profit: -100,
  totalValue: 80000,
};

export const BalanceEqual = Template.bind({});
BalanceEqual.args = {
  profit: 0,
  totalValue: 80000,
};
