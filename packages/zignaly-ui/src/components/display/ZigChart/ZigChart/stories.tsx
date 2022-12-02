import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ZigChart from "./index";

export default {
  title: "Display/ZigChart/ZigChartMini",
  component: ZigChart,
  argTypes: {
    midLine: {
      control: "radio",
      options: { on: true, off: false },
    },
    height: {
      control: "number",
    },
  },
} as ComponentMeta<typeof ZigChart>;

const Template: ComponentStory<typeof ZigChart> = (args) => <ZigChart {...args} />;

export const ExampleChart = Template.bind({});
ExampleChart.args = {
  data: [
    { x: "Jul 1", y: 10 },
    { x: "Jul 2", y: 15 },
    { x: "Jul 3", y: 23 },
    { x: "Jul 4", y: 15 },
    { x: "Jul 5", y: 17 },
    { x: "Jul 6", y: 20 },
    { x: "Jul 7", y: 25 },
  ],
  height: 150,
  midLine: true,
};

export const ExampleChart2 = Template.bind({});
ExampleChart2.args = {
  data: [
    { x: "Jul 1", y: 10 },
    { x: "Jul 2", y: 15 },
    { x: "Jul 3", y: 23 },
    { x: "Jul 4", y: 15 },
    { x: "Jul 5", y: -17 },
    { x: "Jul 6", y: 20 },
    { x: "Jul 7", y: -25 },
  ],
  midLine: true,
  height: 100,
};
