import { BigNumberish } from "ethers";

type CoinProps = {
  id: string;
  image: string;
  name: string;
  balance: string | number | BigNumberish;
};

export type EditInvestmentWithModalProps = {
  investorName: String;
  investorPictureUrl: String;
  investorSuccessFee: String | Number;
  pendingTransactions: Number | null | any;
  amountInvested: number | string | any;
  reinvestPercentage: string;
  withdrawPercentage: string;
  coin?: CoinProps;
  onAmountSubmit: Function | any;
};

export type EditInvestmentFormProps = {
  moreInvestmentValue: string | number | BigNumberish;
  reinvestPercentageValue: string;
  withdrawPercentageValue: string;
};

export const viewsIds = {
  EDIT_INVESTMENT: "edit-investment",
  PENDING_TRANSACTIONS: "pending-transactions",
};
