// TODO
// Dependencies
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Component
import InputAmount from "./";

export default {
  title: "Inputs/InputAmount",
  component: InputAmount,
  argTypes: {
    label: {
      type: "string",
    },
    placeholder: {
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
};

export const OnlyOneToken = Template.bind({});
OnlyOneToken.args = {
  label: "Amount to Withdraw",
  tokens: [
    {
      id: "btc",
      balance: "1000000000000000000",
    },
  ],
};

export const OnlyOneTokenWithUnit = Template.bind({});
OnlyOneTokenWithUnit.args = {
  label: "Amount to Withdraw",
  tokens: [
    {
      id: "btc",
      balance: "1000000000000000000",
    },
  ],
};
//
// export const WithMultipleTokens = Template.bind({});
// WithMultipleTokens.args = {
//   label: "Amount to Withdraw",
//   onChange: (e: any, { value, token }: any) => {
//     console.log(e);
//     console.log({ value, token });
//   },
//   tokens: [
//     {
//       id: "btc",
//       balance: "100000000000000000000",
//     },
//     {
//       id: "eth",
//       balance: "1000000000000000000",
//     },
//     {
//       id: "doge",
//       balance: "1000000000000000000",
//     },
//   ],
// };
//
// export const WithError = Template.bind({});
// WithError.args = {
//   label: "Amount to Withdraw",
//   onChange: ({ value, token }: any) => {
//     console.log({ value, token });
//   },
//   tokens: [
//     {
//       id: "btc",
//       balance: "1000000000000000000",
//     },
//     {
//       id: "eth",
//       balance: "1000000000000000000",
//     },
//     {
//       id: "doge",
//       balance: "1000000000000000000",
//     },
//   ],
//   error: "Exceeds available balance",
// };
//
// export const Disabled = Template.bind({});
// Disabled.args = {
//   label: "Amount to Withdraw",
//   onChange: () => {},
//   tokens: [
//     {
//       id: "btc",
//       balance: "1000000000000000000",
//     },
//     {
//       id: "eth",
//       balance: "1000000000000000000",
//     },
//     {
//       id: "doge",
//       balance: "1000000000000000000",
//     },
//   ],
//   disabled: true,
// };
//
// export const ReadOnly = Template.bind({});
// ReadOnly.args = {
//   label: "Swap to",
//   onChange: () => {},
//   readOnly: true,
//   value: 100,
//   showMaxButton: false,
//   tokens: [
//     {
//       id: "btc",
//       balance: "1000000000000000000",
//     },
//     {
//       id: "eth",
//       balance: "1000000000000000000",
//     },
//     {
//       id: "doge",
//       balance: "1000000000000000000",
//     },
//   ],
// };
//
// export const CustomIcon = Template.bind({});
// CustomIcon.args = {
//   label: "Amount to Withdraw",
//   onChange: () => {},
//   tokens: [
//     {
//       id: "Zig",
//       balance: "1000000000000000000",
//     },
//   ],
//   customCoinIcon: <ZigCoin width={32} height={32} />,
// };
