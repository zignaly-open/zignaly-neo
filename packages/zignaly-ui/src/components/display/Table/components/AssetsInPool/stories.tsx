import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { AssetsInPool } from ".";
import WhaleIcon from "assets/icons/whale-icon.svg";

export default {
  title: "Display/Table/Components/AssetsInPool",
  component: AssetsInPool,
} as ComponentMeta<typeof AssetsInPool>;

const Template: ComponentStory<typeof AssetsInPool> = (args) => <AssetsInPool {...args} />;

export const Service = Template.bind({});
Service.args = {
  numberOfInvestors: 100,
  assetsValue: 20000000,
  icon: <WhaleIcon />,
};
