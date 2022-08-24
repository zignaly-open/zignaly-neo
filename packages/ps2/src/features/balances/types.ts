type NetworkData = {
  addressRegex: string;
  coin: string;
  depositDesc: string;
  depositEnable: boolean;
  integerMultiple: string;
  isDefault: boolean;
  memoRegex: boolean;
  name: string;
  network: string;
  resetAddressStatus: boolean;
  specialTips: string;
  withdrawDesc: string;
  withdrawFee: string;
  withdrawMin: string;
};

export type BalancesData = {
  name: string;
  networks: NetworkData[];
};
