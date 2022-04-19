import { BigNumber } from "ethers";

export type TokenItem = {
  id: string | number;
  name: string;
  image: string;
  balance: string | number;
};

export type InputAmountProps = {
  label: string;
  value: BigNumber;
  onChange: Function;
  disabled: boolean;
  tokens?: TokenItem[];
  error?: string | null;
  initialTokenIndex?: number;
};
