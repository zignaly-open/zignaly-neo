import React, { useState } from "react";
import "@mui/system";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import SliderInput from "./index";
import "@mui/system";

const result: ComponentMeta<typeof SliderInput> = {
  title: "Inputs/SliderInput",
  component: SliderInput,
  argTypes: {
    mode: {
      control: "select",
      type: "string",
      options: ["normal", "range"],
    },
  },
};

export default result;

const Template: ComponentStory<typeof SliderInput> = (args) => {
  const [value, setValue] = useState(0);
  return <SliderInput {...args} onChange={setValue} value={value} />;
};

export const NormalSlider: ComponentMeta<typeof SliderInput> = Template.bind({});
NormalSlider.args = {
  mode: "normal",
  labels: {
    top: "Top label",
    left: "Left",
    right: "Right",
  },
};

export const RangeSlider: ComponentMeta<typeof SliderInput> = Template.bind({});
RangeSlider.args = {
  mode: "range",
};
