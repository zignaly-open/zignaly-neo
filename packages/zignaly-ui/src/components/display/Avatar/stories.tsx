// Dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Components
import Avatar from "./";

// Types
import { sizeTypesId } from "types/sizes";

export default {
  title: "Display/Avatar",
  component: Avatar,
  argTypes: {
    size: {
      control: "select",
      default: sizeTypesId.SMALL,
      options: [sizeTypesId.SMALL, sizeTypesId.MEDIUM, sizeTypesId.LARGE],
    },
    hash: {
      control: "text",
    },
    image: {
      control: "text",
    },
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

// With Image
export const Image = Template.bind({});
Image.args = {
  hash: "",
  size: sizeTypesId.MEDIUM,
  image:
    "https://64.media.tumblr.com/1ca5ac368badaea331737f7856d844a8/tumblr_qdawidrDy61rpwm80o1_250.jpg",
};
Image.parameters = {
  jest: ["test.js"],
};

// With Metamask
export const Metamask = Template.bind({});
Metamask.args = {
  hash: "0xc3B2CFa1684dd33e8Ea8F657122f42b288d32852",
  size: sizeTypesId.MEDIUM,
  image: "",
};
Metamask.parameters = {
  jest: ["test.js"],
};
