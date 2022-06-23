import { TokenItem } from "components/inputs/InputAmount/types";
import { BigNumberish } from "ethers";

export interface AvaliableCoin extends TokenItem {
  id: string;
  balance: string | number | BigNumberish;
  avaliableSwapPairs: TokenItem[];
}

export interface Swap {
  token?: AvaliableCoin;
  value?: string | number | BigNumberish;
}

export interface InputModalProps {
  avaliableCoins: AvaliableCoin[];
  continueButtonOnClick: any;
  onClickClose: any;
  getSwapRate: Function;
}
