import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import ConfirmWithdrawalModal from ".";

export default {
  title: "Modals/MyAccount/ConfirmWithdrawalModal",
  component: ConfirmWithdrawalModal,
} as ComponentMeta<typeof ConfirmWithdrawalModal>;

const Template: ComponentStory<typeof ConfirmWithdrawalModal> = (args) => {
  return <ConfirmWithdrawalModal {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  networkCaption: "ETH Mainnet",
  coinName: "ETH",
  withdrawAddress: "0x64849239doj2dor555AAk9Hgjk931JjFp87144nBm87KDcP128",
  withdrawalAmount: 100000,
  netWorkFee: 10,
};
