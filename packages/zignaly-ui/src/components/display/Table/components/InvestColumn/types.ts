export interface InvestColumnProps {
  type: keyof typeof InvestTypes;
}

export const InvestTypes = {
  liquidated: "liquidated",
  invested: "invested",
  notInvested: "notInvested",
  investedSeeAll: "investedSeeAll",
  notInvestedAllAccounts: "notInvestedAllAccounts",
};
