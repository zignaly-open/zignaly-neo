import React, { useState } from "react";
import "@mui/system";
import { Meta, StoryObj } from "@storybook/react";
import ZigInputAmount from "./index";
import "@mui/system";
import ZigTypography from "components/display/ZigTypography";
import { ZigInputAmountProps } from "./types";

const meta = {
  title: "Inputs/ZigInputAmount",
  component: ZigInputAmount,
  argTypes: {
    label: {
      type: "string",
    },
    placeholder: {
      type: "string",
    },
    wide: {
      type: "boolean",
      defaultValue: false,
    },
    disabled: {
      type: "boolean",
      defaultValue: false,
    },
    defaultValue: {
      type: "string",
    },
    error: {
      type: "string",
      defaultValue: "",
    },
  },
} as Meta;
export default meta;

const ZigInputAmountWithState = (props: ZigInputAmountProps) => {
  // Sets the hooks for both the label and primary props
  const [value, setValue] = useState(props.value);
  // const [isPrimary, setIsPrimary] = useState(false);

  // Sets a click handler to change the label's value
  // const handleOnChange = () => {
  //   if (!isPrimary) {
  //     setIsPrimary(true);
  //     setValue("Primary");
  //   }
  // };
  return (
    <ZigInputAmount
      {...props}
      // onMax={
      //   typeof props.extraInfo === "object" && props.extraInfo !== null
      //     ? () => setValue(props.extraInfo?.balance)
      //     : null
      // }
      // onMax1={
      //   props.extraInfo && typeof props.extraInfo === "object" && "balance" in props.extraInfo
      //     ? () => setValue(props.extraInfo.balance)
      //     : undefined
      // }
      // onMax0={
      //   typeof props.extraInfo === "object" && "balance" in props.extraInfo
      //     ? () => setValue(props.extraInfo.balance)
      //     : null
      // }
      // onMax={
      //   props.extraInfo && props.extraInfo.balance ? () => setValue(props.extraInfo.balance) : null
      // }
      onMax={
        props.extraInfo && props.extraInfo?.balance
          ? () => setValue(props.extraInfo.balance)
          : undefined
      }
      value={value}
    />
  );
};

type Story = StoryObj<typeof meta>;

export const Default = { args: {} };
export const WithLabel: Story = {
  args: {
    label: "A label",
    coin: "USDT",
    extraInfo: {
      balance: 1000,
      min: { value: 100, label: "Min. deposit:" },
    },
  },
  render: (props) => <ZigInputAmountWithState {...props} />,
};

export const WithCustomExtraInfo = {
  args: {
    label: "A label",
    // coin: { coin: "USDT", balance: 10 },
    coin: "USDT",
    // extraInfo: (
    //   <InputExtraInfo balance={{ value: 1000, label: "Cuustom balance label" }} min={100} />
    // ),
    extraInfo: {
      balance: 1000,
      min: { value: 100, label: "Min. deposit:" },
      others: [
        {
          label: "Custom label:",
          value: 200,
        },
        <ZigTypography variant="body2" color="neutral100" key="1">
          Custom element
        </ZigTypography>,
      ],
    },
  },
};

// export const Default = Template.bind({});

// const Template: ComponentStory<typeof InputText> = (args) => <InputText {...args} />;

// export const TextInputer: ComponentMeta<typeof InputText> = Template.bind({});
// TextInputer.args = {
//   label: "Amount to Withdraw",
//   placeholder: "Amount to Withdraw",
// };

// export const Sensitive: ComponentMeta<typeof InputText> = Template.bind({});
// Sensitive.args = {
//   label: "Amount to Withdraw",
//   sensitive: true,
//   placeholder: "Amount to Withdraw",
// };

// export const TextareaInputer: ComponentMeta<typeof InputText> = Template.bind({});
// TextareaInputer.args = {
//   value:
//     "https://zignaly.com/api/signals.php?key=YOURSECRETKEY&type=entry&exchange=zignaly&pair=ethusdt&orderType=limit&positionSize=10&signalId=123&limitPrice=3420&takeProfitPercentage1=20&takeProfitAmountPercentage1=100&stopLossPercentage=-5",
//   multiline: true,
//   wide: true,
//   label: "Label",
// };

// export const Error: ComponentMeta<typeof InputText> = Template.bind({});
// Error.args = {
//   value: "https://zignaly com/api/",
//   wide: true,
//   error: "Invalid URL",
//   label: "Label",
// };

// export const LabelActionLink: ComponentMeta<typeof InputText> = Template.bind({});
// LabelActionLink.args = {
//   value: "",
//   wide: true,
//   labelAction: {
//     text: "Link to somewhere",
//     href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//   },
//   label: "Label",
// };

// export const LabelAction: ComponentMeta<typeof InputText> = Template.bind({});
// LabelAction.args = {
//   value: "",
//   wide: true,
//   labelAction: {
//     text: "Alert",
//     onClick: () => alert(),
//     tabIndex: -1,
//   },
//   label: "Label",
// };
