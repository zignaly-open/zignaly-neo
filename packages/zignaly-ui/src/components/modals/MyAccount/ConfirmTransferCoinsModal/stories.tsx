import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import ConfirmTransferCoinsModal from ".";

export default {
  title: "Modals/MyAccount/ConfirmTransferCoinsModal",
  component: ConfirmTransferCoinsModal,
} as ComponentMeta<typeof ConfirmTransferCoinsModal>;

const Template: ComponentStory<typeof ConfirmTransferCoinsModal> = (args) => {
  return <ConfirmTransferCoinsModal {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
