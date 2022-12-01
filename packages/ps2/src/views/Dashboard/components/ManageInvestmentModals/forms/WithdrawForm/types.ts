export type OptionItem = {
  leftElement?: any;
  caption: string;
};

export interface CoinOption extends OptionItem {
  caption: string;
  index: number;
  leftElement?: any;
  balance: number;
  inOrders: number;
  avaliable: number;
  networks: NetworkOption[];
}

export interface NetworkOption extends OptionItem {
  caption: string;
  index: number;
  leftElement?: any;
  name: string;
  depositAddress?: string;
  depositMemo?: string;
  depositEnable: boolean;
  url: string;
}
