// Dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import BrandImage from "./";
import { iconsByType } from "./types";

export default {
  title: "Navigation/Header/components/BrandImage",
  component: BrandImage,
  argTypes: {
    type: {
      control: {
        type: "select",
      },
      options: Object.keys(iconsByType),
    },
  },
} as ComponentMeta<typeof BrandImage>;

const Template: ComponentStory<typeof BrandImage> = (args) => <BrandImage {...args} />;

export const Logotype = Template.bind({});
Logotype.args = {
  type: "logotype",
  width: "140px",
  height: "68px",
};

export const Isotype = Template.bind({});
Isotype.args = {
  type: "isotype",
  width: "40px",
  height: "40px",
};
