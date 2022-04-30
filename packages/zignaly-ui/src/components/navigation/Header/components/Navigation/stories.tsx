// Dependencies
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Navigation from "./";

export default {
  title: "Navigation/Header/components/Navigation",
  component: Navigation,
} as ComponentMeta<typeof Navigation>;

const Template: ComponentStory<typeof Navigation> = (args) => <Navigation {...args} />;

export const Default = Template.bind({});
Default.args = {
  routes: [
    {
      path: "#",
      label: "Profit Sharing",
      isActive: true,
    },
    {
      path: "#",
      label: "Staking",
    },
    {
      path: "#",
      label: "ZIGpad",
    },
  ],
};
