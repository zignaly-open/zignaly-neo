// Dependencies
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// Components
import Avatar, { AvatarSizes } from "./index";

export default {
  title: "Display/Avatar",
  component: Avatar,
  argTypes: {
    size: {
      control: "select",
      default: AvatarSizes.SMALL,
      options: [
        AvatarSizes.SMALL,
        AvatarSizes.MEDIUM,
        AvatarSizes.LARGE,
        AvatarSizes.XLARGE,
        AvatarSizes.XXLARGE,
      ],
    },
    hash: {
      control: "text",
    },
    image: {
      control: "text",
    },
  },
  parameters: {
    jest: ["avatar"],
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

// With Image
export const Image = Template.bind({});
Image.args = {
  hash: "",
  size: AvatarSizes.MEDIUM,
  image:
    "https://64.media.tumblr.com/ef4e0c2294d9e304e339f19307953e7f/6c205b8b5946f8a9-7c/s250x400/9d66b8e486071ecabe8db5afdfb879a038cc79d5.png",
};
Image.parameters = {
  jest: ["avatar"],
};

// With Metamask
export const Metamask = Template.bind({});
Metamask.args = {
  hash: "0xc3B2CFa1684dd33e8Ea8F657122f42b288d32852",
  size: AvatarSizes.MEDIUM,
  image: "",
};
//TODO: hay que darle nombre al fichero tsx o no funciona (pensar por que) la pena, se puede hacer que simplemente en chromatic se genere para que se pueda ver
Metamask.parameters = {
  jest: ["avatar"],
};
