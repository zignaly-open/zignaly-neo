import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import ConfirmSwapModal from ".";
import { Swap } from "../types";

export default {
  title: "Modals/SwapCoins/ConfirmSwapModal",
  component: ConfirmSwapModal,
} as ComponentMeta<typeof ConfirmSwapModal>;

const Template: ComponentStory<typeof ConfirmSwapModal> = (args) => {
  return <ConfirmSwapModal {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  swapFrom: {
    token: { id: "ETH", balance: "10000000000000", avaliableSwapPairs: [] },
    value: "100",
  },
  getSwapRate: (swapFrom: Swap) => {
    console.log(swapFrom);
    return { swapRate: 100, value: 10, netWorkFee: 3 };
  },
  swapTo: {
    token: { id: "USDT", balance: "10000000000000", avaliableSwapPairs: [] },
    value: "2000000000",
    networkFee: 2,
    swapRate: 10,
  },
};
