export type CoinNetwork = {
  name: string;
  network: string;
  coin: string;
  addressRegex: string;
  depositDesc: string;
  depositEnable: boolean;
  isDefault: boolean;
  memoRegex: string;
  resetAddressStatus: boolean;
  specialTips: string;
  withdrawDesc: string;
  withdrawEnable: boolean;
  withdrawFee: string;
  withdrawMine: string;
  integerMultiple: string;
};
