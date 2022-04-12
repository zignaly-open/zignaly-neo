// Dependencies
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Component
import Button, { ButtonSizes, ButtonVariants } from "./";

// Assets
import CloseIcon from "assets/icons/close-icon.svg";
import ArrowDown from "assets/icons/arrow-bottom-icon.svg";

export default {
  title: "Inputs/Button",
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/VaAFxJqlZERpeEHw5S5coY/Buttons?node-id=402%3A963",
    },
  },
  argTypes: {
    rightElement: {
      options: { Show: ArrowDown, Hide: null },
      control: { type: "radio" },
    },
    disabled: {
      options: [true, false],
      control: { type: "radio" },
    },
    icon: {
      options: { Show: CloseIcon, Hide: null },
      control: { type: "radio" },
    },
    leftElement: {
      options: { Show: CloseIcon, Hide: null },
      control: { type: "radio" },
    },
    caption: {
      control: { type: "text" },
      label: "Change Caption",
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

/// Normal Buttons
export const NormalButton = Template.bind({});
NormalButton.args = {
  variant: ButtonVariants.PRIMARY,
  size: ButtonSizes.NORMAL,
  leftElement: CloseIcon,
};
