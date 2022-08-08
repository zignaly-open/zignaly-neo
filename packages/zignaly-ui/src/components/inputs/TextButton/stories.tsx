// Dependencies
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Component
import TextButton from "./";

// Assets
import { ReactComponent as CloseIcon } from "assets/icons/close-icon.svg";
import { ReactComponent as ArrowDown } from "assets/icons/arrow-bottom-icon.svg";
import { dark } from "theme";

const ICONS = {
  ArrowDown: <ArrowDown height="20" width="20" color={"#E1E9F0"} />,
  CloseIcon: <CloseIcon height="20" width="20" color={dark.links} />,
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
    disabled: {
      options: [true, false],
      control: { type: "radio" },
    },
    loading: {
      options: [true, false],
      control: { type: "radio" },
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
    color: {
      options: Object.keys(dark),
      control: "select",
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

// Link Button
export const LinkButton = Template.bind({});
LinkButton.args = {
  href: "https://zignaly.com",
  rightElement: <CloseIcon />,
  leftElement: <ArrowDown />,
};

export const LoadingButton = Template.bind({});
LoadingButton.args = {
  href: "https://zignaly.com",
  loading: true,
};
