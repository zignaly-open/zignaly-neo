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

export const ExampleChartWithEvents = Template.bind({});
ExampleChartWithEvents.args = {
  events: [
    { x: 25, label: "Raz raz raz" },
    { x: 145, label: "Eto hardbass" },
  ],
  data: (() => {
    let value = 10;
    // say "trista"
    return new Array(300).fill(0).map((_, i) => {
      value += Math.random() * 20 - 1;
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

export const ExampleChartSlightlyNegative = Template.bind({});
ExampleChartSlightlyNegative.args = {
  data: [
    { x: "Jul 1", y: 10 },
    { x: "Jul 2", y: 15 },
    { x: "Jul 3", y: 23 },
    { x: "Jul 4", y: 15 },
    { x: "Jul 5", y: -1 },
    { x: "Jul 6", y: 20 },
    { x: "Jul 7", y: -2 },
  ],
};

export const ExampleBarChart = Template.bind({});
ExampleBarChart.args = {
  bars: true,
  data: (() => {
    let value = 100;
    // say "trista"
    return new Array(90).fill(0).map((_, i) => {
      value += Math.random() * 200 - 1;
      return {
        x: "Jun " + i,
        y: value,
      };
    });
  })(),
};

export const ExampleBarChartWithEvents = Template.bind({});
ExampleBarChartWithEvents.args = {
  events: [
    { x: 25, label: "Raz raz raz" },
    { x: 145, label: "Eto hardbass" },
  ],
  bars: true,
  data: (() => {
    let value = 10;
    // say "trista"
    return new Array(300).fill(0).map((_, i) => {
      value += (Math.random() - 0.5) * 20;
      return {
        x: "Jun " + i,
        y: value,
      };
    });
  })(),
};

export const ExampleBarChart2 = Template.bind({});
ExampleBarChart2.args = {
  bars: true,
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
