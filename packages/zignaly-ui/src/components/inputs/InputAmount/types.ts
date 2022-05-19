import { BigNumber } from "ethers";
import { ChangeEventHandler } from "react";

export type TokenItem = {
  id: string | number;
  name: string;
  /** Token icon. If no icon is provided, its name will be showed on the right side */
  image?: string;
  balance: string | number;
};

export interface InputAmountProps {
  label: string;
  value: BigNumber;
  onChange: Function;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  tokens?: TokenItem[];
  error?: string | null;
  initialTokenIndex?: number;
  name?: string;
  fullWidth?: boolean;
  placeholder?: string;
}
