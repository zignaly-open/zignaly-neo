// Dependencies
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Utils
import { BigNumber } from "ethers";

// Component
import EditInvestmentWithModal from "./";
import { EditInvestmentFormProps } from "./types";

import DateLabel from "../../display/Table/components/DateLabel";
import PriceLabel from "../../display/Table/components/PriceLabel";
import TextButton from "../../inputs/TextButton";

export default {
  title: "Modals/EditInvestmentWithModal",
  component: EditInvestmentWithModal,
} as ComponentMeta<typeof EditInvestmentWithModal>;

const Template: ComponentStory<typeof EditInvestmentWithModal> = (args) => (
  <EditInvestmentWithModal
    {...args}
    onAmountSubmit={(values: EditInvestmentFormProps) => {
      console.log(values);
    }}
  />
);

export const Default = Template.bind({});
Default.args = {
  investor: {
    name: "The Golden Eagle",
    successFee: 20,
    photoUrl: "https://logodix.com/logo/2129091.png",
  },
  isLoading: false,
  profitPercentage: 50,
  pendingTransactions: [
    {
      date: <DateLabel date={new Date()} />,
      amount: <PriceLabel value={10000} coin={"USDT"} />,
      type: "Investment",
      status: "Processing in 24 hrs",
      action: <TextButton caption={"Cancel"} onClick={() => {}} />,
    },
  ],
  coin: {
    id: "eth",
    balance: BigNumber.from("2000"),
  },
  amountInvested: BigNumber.from("2000"),
};
