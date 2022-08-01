// Dependencies
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AreaChart } from "..";

export default {
  title: "Display/Charts/AllStories",
  component: AreaChart,
  argTypes: {
    variant: {
      control: "select",
      options: ["large", "small"],
    },
  },
} as ComponentMeta<typeof AreaChart>;

const Template: ComponentStory<typeof AreaChart> = (args) => <AreaChart {...args} />;

export const ChartSmallPositive = Template.bind({});
ChartSmallPositive.args = {
  data: [
    { x: "Jul 1", y: 10 },
    { x: "Jul 2", y: 15 },
    { x: "Jul 3", y: 18 },
    { x: "Jul 4", y: 19 },
    { x: "Jul 5", y: 21 },
    { x: "Jul 6", y: 16 },
    { x: "Jul 7", y: 18 },
    { x: "Jul 9", y: 22 },
    { x: "Jul 10", y: 20 },
    { x: "Jul 11", y: 22 },
    { x: "Jul 12", y: 30 },
  ],
  variant: "small",
};

export const ChartSmallNegative = Template.bind({});
ChartSmallNegative.args = {
  data: [
    { x: "Jul 1", y: 10 },
    { x: "Jul 2", y: 15 },
    { x: "Jul 3", y: 23 },
    { x: "Jul 4", y: 15 },
    { x: "Jul 5", y: 17 },
    { x: "Jul 6", y: 5 },
  ],
  variant: "small",
};

export const ChartSmallBreakeven = Template.bind({});
ChartSmallBreakeven.args = {
  data: [
    { x: "Jul 1", y: 10 },
    { x: "Jul 2", y: 15 },
    { x: "Jul 3", y: 23 },
    { x: "Jul 4", y: 15 },
    { x: "Jul 5", y: 17 },
    { x: "Jul 6", y: 10 },
  ],
  variant: "small",
};

export const ChartLargePositive = Template.bind({});
ChartLargePositive.args = {
  data: [
    { x: "Jul 1", y: 10 },
    { x: "Jul 2", y: 15 },
    { x: "Jul 3", y: 23 },
    { x: "Jul 4", y: 15 },
    { x: "Jul 5", y: 17 },
    { x: "Jul 6", y: 20 },
    { x: "Jul 7", y: 25 },
  ],
  variant: "large",
};
