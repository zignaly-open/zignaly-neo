import ZigChart from ".";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";

export default {
  title: "Display/Chart/ZigChart",
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
  data: (() => {
    let value = 100;
    // say "trista"
    return new Array(300).fill(0).map((_, i) => {
      value += Math.random() * 200 - 1;
      return {
        x: "Jun " + i,
        y: value,
      };
    });
  })(),
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
};
