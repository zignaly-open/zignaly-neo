import { InputAmountAdvancedValue } from '@zignaly-open/ui/lib/components/inputs/InputAmountAdvanced/types';

export type WithdrawFormData = {
  coin: string;
  network: string;
  exchangeInternalId: string;
  tag: string;
  address: string;
  amount: InputAmountAdvancedValue;
  code?: string;
};

// export type OptionItem = {
//   leftElement?: any;
//   caption: string;
// };

// export interface CoinOption extends OptionItem {
//   caption: string;
//   index: number;
//   leftElement?: any;
//   balance: number;
//   inOrders: number;
//   avaliable: number;
//   networks: NetworkOption[];
// }

// export interface NetworkOption extends OptionItem {
//   caption: string;
//   index: number;
//   leftElement?: any;
//   name: string;
//   depositAddress?: string;
//   depositMemo?: string;
//   depositEnable: boolean;
//   url: string;
// }
