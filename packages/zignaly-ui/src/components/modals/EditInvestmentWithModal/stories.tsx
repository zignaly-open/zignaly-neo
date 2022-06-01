// Dependencies
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// Component
import EditInvestmentWithModal from "./";
import { EditInvestmentFormProps } from "./types";
import { BigNumber } from "ethers";

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
  investorName: "The Golden Eagle",
  investorPictureUrl: "https://logodix.com/logo/2129091.png",
  investorSuccessFee: 20,
  pendingTransactions: 0,
  amountInvested: BigNumber.from("2000"),
};
