import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ZigSlider from "./index";
import { useState } from "react";
import { ZigSliderProps } from "./types";

const meta = {
  title: "Inputs/ZigSlider",
  component: ZigSlider,
} as Meta;
export default meta;

const ZigSliderControlled = (props: ZigSliderProps) => {
  const [value, setValue] = useState(props.value);

  return <ZigSlider {...props} value={value} onChange={(e, v) => setValue(v)} />;
};

type Story = StoryObj<typeof meta>;

export const WithLabel: Story = {
  args: {
    labels: { top: "My Slider", start: "Start", end: "End", invertSliderValues: true },
  },
  render: (props) => <ZigSliderControlled {...props} />,
};

export const WithoutLabels: Story = { args: {} };
