// Dependencies
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Component
import InputAmount from "./";

// Assets
import BTCIcon from "assets/icons/coins/btc.svg?url";
import ETHIcon from "assets/icons/coins/eth.svg?url";
import DOGEIcon from "assets/icons/coins/doge.svg?url";

export default {
  title: "Inputs/InputAmount",
  component: InputAmount,
  argTypes: {
    label: {
      type: "string",
    },
    onChange: {
      type: "function",
    },
    value: {
      type: "string",
      defaultValue: "",
    },
    disabled: {
      type: "boolean",
      defaultValue: false,
    },
    error: {
      type: "string",
      defaultValue: "",
    },
    initialTokenIndex: {
      type: "number",
      defaultValue: 0,
    },
  },
} as ComponentMeta<typeof InputAmount>;

const Template: ComponentStory<typeof InputAmount> = (args) => <InputAmount {...args} />;

export const OnlyNumber = Template.bind({});
OnlyNumber.args = {
  label: "Amount to Withdraw",
  onChange: () => {},
};

export const OnlyOneToken = Template.bind({});
OnlyOneToken.args = {
  label: "Amount to Withdraw",
  onChange: () => {},
  tokens: [
    {
      id: 1,
      name: "BTC",
      image: BTCIcon,
      balance: "1000000000000000000",
    },
  ],
};

export const WithMultipleTokens = Template.bind({});
WithMultipleTokens.args = {
  label: "Amount to Withdraw",
  onChange: ({ value, token }: any) => {
    console.log({ value, token });
  },
  tokens: [
    {
      id: 1,
      name: "BTC",
      image: BTCIcon,
      balance: "1000000000000000000",
    },
    {
      id: 2,
      name: "ETH",
      image: ETHIcon,
      balance: "5000000000000000000",
    },
    {
      id: 3,
      name: "DOGE",
      image: DOGEIcon,
      balance: "23000000000000000000000",
    },
  ],
};

export const WithError = Template.bind({});
WithError.args = {
  label: "Amount to Withdraw",
  onChange: ({ value, token }: any) => {
    console.log({ value, token });
  },
  tokens: [
    {
      id: 1,
      name: "BTC",
      image: BTCIcon,
      balance: "1000000000000000000",
    },
    {
      id: 2,
      name: "ETH",
      image: ETHIcon,
      balance: "5000000000000000000",
    },
    {
      id: 3,
      name: "DOGE",
      image: DOGEIcon,
      balance: "23000000000000000000000",
    },
  ],
  error: "Exceeds available balance",
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Amount to Withdraw",
  onChange: () => {},
  tokens: [
    {
      id: 1,
      name: "BTC",
      image: BTCIcon,
      balance: "1000000000000000000",
    },
  ],
  disabled: true,
};
