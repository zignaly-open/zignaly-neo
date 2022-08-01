import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import ToggleButton from ".";

export default {
  title: "Inputs/ToggleButton",
  component: ToggleButton,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/VaAFxJqlZERpeEHw5S5coY/Buttons?node-id=402%3A963",
    },
  },
  argTypes: {
    onChange: {
      disabled: true,
    },
    defaultValue: {
      disabled: true,
    },
  },
  decorators: [(story) => <div style={{ padding: "0.2rem" }}>{story()}</div>],
} as ComponentMeta<typeof ToggleButton>;

const Template: ComponentStory<typeof ToggleButton> = (args) => <ToggleButton {...args} />;

export const LargeToggleButton = Template.bind({});

export const SmallToggleButton = Template.bind({});
SmallToggleButton.args = {
  size: "small",
};

export const MediumToggleButton = Template.bind({});
MediumToggleButton.args = {
  size: "medium",
};
