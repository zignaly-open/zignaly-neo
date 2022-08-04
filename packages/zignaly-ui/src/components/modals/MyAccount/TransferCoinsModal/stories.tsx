import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import TransferCoinsModal from ".";
import { ReactComponent as AvatarIcon } from "assets/icons/avatar-icon.svg?url";
import { CoinTransfer } from "./types";
import { AccountOption } from "../types";

export default {
  title: "Modals/MyAccount/TransferCoinsModal",
  component: TransferCoinsModal,
} as ComponentMeta<typeof TransferCoinsModal>;

const Template: ComponentStory<typeof TransferCoinsModal> = (args) => {
  return <TransferCoinsModal {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  avaliableCoins: [
    { id: "ETH", balance: "1000000000000000" },
    { id: "BTC", balance: "1000000000000000" },
    { id: "Poly", balance: "100000000000000" },
    { id: "Doge", balance: "1000000000000000000" },
  ],
  transferNowOnClick: ({
    transferCoin,
    toAccount,
    fromAccount,
  }: {
    transferCoin: CoinTransfer;
    toAccount: AccountOption;
    fromAccount: AccountOption;
  }) => {
    console.log(transferCoin, toAccount, fromAccount);
  },
  accounts: [
    {
      index: 0,
      caption: "Account1",
      leftElement: AvatarIcon,
    },
    {
      index: 1,
      caption: "Account2",
      leftElement: AvatarIcon,
    },
    {
      index: 2,
      caption: "Account3",
      leftElement: AvatarIcon,
    },
  ],
};
