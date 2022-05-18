import { BigNumber } from "ethers";
import { ChangeEventHandler } from "react";

export type TokenItem = {
  id: string | number;
  name: string;
  image: string;
  balance: string | number;
};

export interface InputAmountProps {
  label: string;
  value: BigNumber;
  onChange: Function;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  disabled: boolean;
  tokens?: TokenItem[];
  error?: string | null;
  initialTokenIndex?: number;
  name?: string;
  fullWidth?: boolean;
}
