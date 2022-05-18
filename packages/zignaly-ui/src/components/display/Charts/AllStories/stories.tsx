// Dependencies
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AreaChart } from "..";
import { ChartVariations } from "../types";

export default {
  title: "Display/Charts/AllStories",
  component: AreaChart,
  argTypes: {
    variant: {
      control: "select",
      options: [ChartVariations.LARGE, ChartVariations.SMALL],
    },
  },
} as ComponentMeta<typeof AreaChart>;

const Template: ComponentStory<typeof AreaChart> = (args) => <AreaChart {...args} />;


export const ChartSmallPositive = Template.bind({});
ChartSmallPositive.args = {
  data: [
    { x: "Jul 1", y: 10 },
    { x: "Jul 2", y: 15 },
    { x: "Jul 3", y: 23 },
    { x: "Jul 4", y: 15 },
    { x: "Jul 5", y: 17 },
    { x: "Jul 6", y: 20 },
    { x: "Jul 7", y: 25 },
  ],
  variant: ChartVariations.SMALL,
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
  variant: ChartVariations.SMALL,
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
  variant: ChartVariations.SMALL,
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
  variant: ChartVariations.LARGE,
};
