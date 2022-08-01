// Dependencies
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AreaChart } from ".";

// Component
export default {
  title: "Display/Charts",
  component: AreaChart,
  argTypes: {
    variant: {
      control: "select",
      options: ["large", "small"],
    },
    midLine: {
      control: "radio",
      options: { on: true, off: false },
    },
  },
} as ComponentMeta<typeof AreaChart>;

const Template: ComponentStory<typeof AreaChart> = (args) => <AreaChart {...args} />;

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
  variant: "large",
};
