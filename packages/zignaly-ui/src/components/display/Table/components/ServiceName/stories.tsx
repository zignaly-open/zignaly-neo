import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ServiceName } from ".";

export default {
  title: "Display/Table/Components/ServiceName",
  component: ServiceName,
} as ComponentMeta<typeof ServiceName>;

const Template: ComponentStory<typeof ServiceName> = (args) => <ServiceName {...args} />;

export const Service = Template.bind({});
Service.args = {
  heading: "The Golden Eagle",
  subtitle: "by Barry Silverman",
  cryptoName: "Matic",
};
