import React from "react";
import { BigNumberish } from "ethers";

type CoinProps = {
  id: string;
  balance: string | number | BigNumberish;
};

export type InvestorProps = {
  name: string;
  photoUrl: string;
  successFee: number;
};

export type PendingTransactionsProps = {
  date: string | React.ReactElement;
  amount: React.ReactElement;
  type: string;
  status: string;
  action: any;
};

export type EditInvestmentWithModalProps = {
  coin: CoinProps;
  investor: InvestorProps;
  profitPercentage: string;
  onAmountSubmit: Function | any;
  amountInvested: number | string | any;
  pendingTransactions: PendingTransactionsProps[];
};

export type EditInvestmentFormProps = {
  moreInvestmentValue: string | number | BigNumberish;
  profitPercentageValue: string | number | BigNumberish;
};

export const viewsIds = {
  EDIT_INVESTMENT: "edit-investment",
  PENDING_TRANSACTIONS: "pending-transactions",
};
