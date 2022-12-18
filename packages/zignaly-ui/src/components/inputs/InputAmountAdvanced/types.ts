import BigNumber from "bignumber.js";
import { Control } from "react-hook-form";

export type TokenItem = {
  id: string;
  balance: string | number | BigNumber;
};

export type InputAmountAdvancedValue = {
  value: string | number | BigNumber;
  token: {
    id: string;
    balance: string | number | BigNumber;
  };
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
  showBalance?: boolean;
  error?: string | null;
  onInsufficientFundsError?: any;
  additionalLabels?: React.ReactElement;
}
