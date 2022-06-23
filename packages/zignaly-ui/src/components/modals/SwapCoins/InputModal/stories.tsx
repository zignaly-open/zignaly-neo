import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import InputModal from ".";
import { Swap } from "../types";

export default {
  title: "Modals/SwapCoins/InputModal",
  component: InputModal,
} as ComponentMeta<typeof InputModal>;

const Template: ComponentStory<typeof InputModal> = (args) => {
  return <InputModal {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  continueButtonOnClick: ({ swapFrom, swapTo }: { swapFrom: Swap; swapTo: Swap }) => {
    console.log(swapFrom);
    console.log(swapTo);
  },
  getSwapRate: ({ swapTo, swapFrom }: { swapTo: Swap; swapFrom: Swap }) => {
    console.log(swapTo, swapFrom);
    return 100;
  },
  avaliableCoins: [
    {
      id: "BTC",
      balance: "1000000000000000000",
      avaliableSwapPairs: [
        { id: "ETH", balance: "10000000000000" },
        { id: "BTC", balance: "10000000000000" },
        { id: "Poly", balance: "1000000000000" },
        { id: "Doge", balance: "1000000000000000000" },
      ],
    },
    {
      id: "ETH",
      balance: "1000000000000000000",
      avaliableSwapPairs: [
        { id: "ETH", balance: "10000000000000" },
        { id: "BTC", balance: "10000000000000" },
        { id: "Poly", balance: "1000000000000" },
        { id: "Doge", balance: "1000000000000000000" },
      ],
    },
    {
      id: "Doge",
      balance: "1000000000000000000",
      avaliableSwapPairs: [
        { id: "ETH", balance: "10000000000000" },
        { id: "BTC", balance: "10000000000000" },
        { id: "Poly", balance: "1000000000000" },
        { id: "Doge", balance: "1000000000000000000" },
      ],
    },
    {
      id: "Matic",
      balance: "1000000000000000000",
      avaliableSwapPairs: [
        { id: "ETH", balance: "10000000000000" },
        { id: "BTC", balance: "10000000000000" },
        { id: "Poly", balance: "1000000000000" },
        { id: "Doge", balance: "1000000000000000000" },
      ],
    },
    {
      id: "Poly",
      balance: "1000000000000000000",
      avaliableSwapPairs: [
        { id: "ETH", balance: "10000000000000" },
        { id: "BTC", balance: "10000000000000" },
        { id: "Poly", balance: "1000000000000" },
        { id: "Doge", balance: "1000000000000000000" },
      ],
    },
  ],
};
