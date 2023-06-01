import { FilledTextFieldProps } from "@mui/material/TextField/TextField";

export type Coin = {
  coin: string;
  balance: string | number;
};

export type ZigInputAmountProps = Omit<FilledTextFieldProps, "variant" | "error"> & {
  wide?: boolean;
  sensitive?: boolean;
  error?: boolean | string;
  id?: string;
  coin?: string | Coin;
  extraInfo?: InputExtraInfo;
};

export type InputExtraInfoItem = { value: string | number; label: string };
export type InputExtraInfoFalseableItem = string | number | InputExtraInfoItem | false;

export type InputExtraInfoProps = {
  balance?: InputExtraInfoFalseableItem;
  min?: InputExtraInfoFalseableItem;
  max?: InputExtraInfoFalseableItem;
  others?: (InputExtraInfoItem | JSX.Element)[];
};

export type InputExtraInfo = JSX.Element | false | InputExtraInfoProps;
