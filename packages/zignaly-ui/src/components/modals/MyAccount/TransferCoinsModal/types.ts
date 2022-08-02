import { TokenItem } from "components/inputs/InputAmount/types";
import { AvaliableCoin } from "components/modals/SwapCoins/types";
import { BigNumberish } from "ethers";
import { AccountOption } from "../types";

export interface TransferCoinsModalProps {
  onClickClose: Function;
  avaliableCoins: AvaliableCoin[];
  historyOnClick: Function;
  transferNowOnClick: Function;
  accounts: AccountOption[];
  isLoading: boolean;
}

export interface AvaliableTransferToken extends TokenItem {
  id: string;
  balance: string | number | BigNumberish;
}

export interface CoinTransfer {
  token: AvaliableCoin;
  value: string | number | BigNumberish;
}
