import { OptionItem } from "components/inputs/Selector/types";

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
  depositEnable: boolean;
  url: string;
}

export interface MyAccountDepositModalProps {
  coins: CoinOption[];
  notSureOnClick?: Function;
}

export interface MyAccountWithdrawModalProps {
  coins: CoinOption[];
  notSureOnClick?: Function;
  addressOnChange?: Function;
  amountOnChange?: Function;
}
