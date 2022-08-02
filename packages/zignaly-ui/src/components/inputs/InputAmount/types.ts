import { BigNumberish } from "ethers";
import React, { ChangeEventHandler } from "react";

export type TokenItem = {
  id: string;
  balance: string | number | BigNumberish;
};

export interface InputAmountProps {
  label: string;
  labelBalance?: string;
  value: BigNumberish;
  onChange: Function;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  tokens?: TokenItem[];
  error?: string | null;
  initialTokenIndex?: number;
  name?: string;
  fullWidth?: boolean;
  placeholder?: string;
  showUnit?: boolean;
  readOnly?: boolean;
  showMaxButton?: boolean;
  customCoinIcon?: React.ReactElement;
}
