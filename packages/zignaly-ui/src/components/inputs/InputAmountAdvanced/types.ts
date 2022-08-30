import BigNumber from "bignumber.js";
import { Control } from "react-hook-form";

export type TokenItem = {
  id: string;
  balance: string | number | BigNumber;
};

export type InputAmountAdvancedValue = {
  value: string | number;
  token: TokenItem;
};
export interface InputAmountProps {
  name?: string;
  control: Control;
  label: string;
  labelBalance?: string;
  defaultValue?: string;
  disabled?: boolean;
  tokens?: TokenItem[];
  initialTokenIndex?: number;
  maxLength?: number;
  fullWidth?: boolean;
  placeholder?: string;
  withInsufficientFundsError?: boolean;
  showUnit?: boolean;
  readOnly?: boolean;
  showMaxButton?: boolean;
  error?: string | null;
  onInsufficientFundsError?: any;
}
