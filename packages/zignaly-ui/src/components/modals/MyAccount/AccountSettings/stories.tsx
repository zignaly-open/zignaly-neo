import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import AccountSettingsModal from ".";

export default {
  title: "Modals/MyAccount/AccountSettingsModal",
  component: AccountSettingsModal,
} as ComponentMeta<typeof AccountSettingsModal>;

const Template: ComponentStory<typeof AccountSettingsModal> = (args) => {
  return <AccountSettingsModal {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  generateOnClick: () => {
    return { apiSecret: "qfiobgoigvb", apiKey: "hefeh293chn2813" };
  },
};
