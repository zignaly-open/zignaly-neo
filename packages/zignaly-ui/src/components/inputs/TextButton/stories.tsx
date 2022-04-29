// Dependencies
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Component
import TextButton from "./";

// Assets
import CloseIcon from "assets/icons/close-icon.svg";
import ArrowDown from "assets/icons/arrow-bottom-icon.svg";

const ICONS = {
  ArrowDown: <ArrowDown width={13} height={8} color={"#E1E9F0"} />,
  CloseIcon: <CloseIcon width={13} height={13} color={"#E1E9F0"} />,
  NoIcon: null,
};
type Icons = typeof ICONS;

const renderIcon = (icon: keyof Icons) => {
  const Icon = ICONS[icon];
  return Icon ? Icon : null;
};

export default {
  title: "Inputs/TextButton",
  component: TextButton,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/VaAFxJqlZERpeEHw5S5coY/Buttons?node-id=402%3A963",
    },
  },
  argTypes: {
    rightElement: {
      control: {
        type: "select",
      },
      options: Object.keys(ICONS),
    },
    leftElement: {
      control: {
        type: "select",
      },
      options: Object.keys(ICONS),
    },
    caption: {
      control: { type: "text" },
      label: "Change Caption",
    },
    underline: {
      options: [true, false],
      control: { type: "radio" },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof TextButton>;

const Template: ComponentStory<typeof TextButton> = ({ leftElement, rightElement, ...args }) => {
  return (
    <TextButton
      leftElement={renderIcon(leftElement as keyof Icons)}
      rightElement={renderIcon(rightElement as keyof Icons)}
      {...args}
    />
  );
};

/// Normal Buttons
export const PlainTextButton = Template.bind({});
PlainTextButton.args = {};
