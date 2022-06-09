// Dependencies
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import MyAccountDepositModal from ".";

// Assets
import EthereumIcon from "assets/icons/coins/eth.svg?url";
import BitcoinIcon from "assets/icons/coins/btc.svg?url";
import DogecoinIcon from "assets/icons/coins/doge.svg?url";

const coins = [
  {
    index: 0,
    caption: "ETH",
    leftElement: EthereumIcon,
    inOrders: 100,
    balance: 10,
    avaliable: 0,
    depositAddress: "0138fbwuVB83ru",
    networks: [
      {
        index: 0,
        caption: "Main Net",
        leftElement: EthereumIcon,
        depositAddress: "0138fbwuVB83ru",
        depositEnable: true,
        name: "ERC-20",
        url: "www.zignaly.com",
      },
      {
        index: 1,
        caption: "Test Net",
        leftElement: EthereumIcon,
        depositAddress: "0138fbwuVB83ru",
        depositEnable: true,
        name: "ERC-20",
        url: "www.zignaly.com",
      },
    ],
  },
  {
    index: 1,
    caption: "BTC",
    leftElement: BitcoinIcon,
    inOrders: 100,
    balance: 10,
    avaliable: 0,
    depositAddress: "0138fbwuVB83ru",
    networks: [
      {
        index: 0,
        caption: "Main Net",
        leftElement: BitcoinIcon,
        depositAddress: "0138fbwuVB83ru",
        depositEnable: true,
        name: "BitCoin Network",
        url: "www.zignaly.com",
      },
      {
        index: 1,
        caption: "Lightning Network",
        leftElement: BitcoinIcon,
        depositAddress: "0138fbwuVB83ru",
        depositEnable: true,
        name: "LN",
        url: "www.zignaly.com",
      },
      {
        index: 2,
        caption: "Test Net",
        leftElement: BitcoinIcon,
        depositAddress: "0138fbwuVB83ru",
        depositEnable: true,
        name: "Test net",
        url: "www.zignaly.com",
      },
    ],
  },
  {
    index: 2,
    caption: "DOGE",
    leftElement: DogecoinIcon,
    inOrders: 100,
    balance: 10,
    avaliable: 0,
    networks: [
      {
        index: 0,
        caption: "Ethereum",
        leftElement: EthereumIcon,
        depositEnable: false,
        name: "ERC-20",
        url: "www.zignaly.com",
      },
      {
        index: 1,
        caption: "Bitcoin",
        leftElement: BitcoinIcon,
        depositEnable: false,
        name: "BitCoin Network",
        url: "www.zignaly.com",
      },
      {
        index: 2,
        caption: "Dogecoin",
        leftElement: DogecoinIcon,
        depositAddress: "0138fbwuVB83ru",
        depositEnable: true,
        name: "ERC-20",
        url: "www.zignaly.com",
      },
    ],
  },
];

export default {
  title: "Modals/MyAccount/DepositModal",
  component: MyAccountDepositModal,
} as ComponentMeta<typeof MyAccountDepositModal>;

const Template: ComponentStory<typeof MyAccountDepositModal> = (args) => {
  return <MyAccountDepositModal {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  coins: coins,
};
