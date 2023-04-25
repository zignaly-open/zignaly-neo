import React, { useState } from "react";
import "@mui/system";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ZigSliderInput from "./index";
import "@mui/system";

const result: ComponentMeta<typeof ZigSliderInput> = {
  title: "Inputs/ZigSliderInput",
  component: ZigSliderInput,
  argTypes: {
    mode: {
      control: "select",
      type: "string",
      options: ["normal", "range"],
    },
  },
};

export default result;

const Template: ComponentStory<typeof ZigSliderInput> = (args) => {
  const [value, setValue] = useState(0);
  return <ZigSliderInput {...args} onChange={setValue} value={value} />;
};

export const NormalSlider: ComponentMeta<typeof ZigSliderInput> = Template.bind({});
NormalSlider.args = {
  mode: "normal",
  labels: {
    top: "Top label",
    left: "Left",
    right: "Right",
  },
};

export const RangeSlider: ComponentMeta<typeof ZigSliderInput> = Template.bind({});
RangeSlider.args = {
  mode: "range",
};
