import { FilledTextFieldProps } from "@mui/material/TextField/TextField";

export type Coin = {
  coin: string;
  balance: string | number;
};

export type ZigInputAmountProps = Omit<FilledTextFieldProps, "variant" | "error"> & {
  wide?: boolean;
  error?: boolean | string;
  id?: string;
  coin?: string | Coin;
  /**
   * Extra info to show under the input.
   * By default it will show the balance, min and max (if the values are provided).
   * To hide the balance set it to false.
   * To pass a custom label, pass an object with the value and label properties. Or a full JSX.Element.
   */
  extraInfo?: InputExtraInfo;
  /**
   * Wrap info if more than specified number of items. Default is 2. Set to true/false to force.
   */
  wrapExtraInfo?: number | boolean;
  /**
   * Custom onMax callback, if not provided, onChange will be called with the max value.
   */
  onMax?: () => void;
  /**
   * Pressing the MAX button will trigger this value to be set.
   * Also showed as info under the input.
   * */
  balance?: string | number;
  /** Showed as info. */
  min?: string | number;
  /** Showed as info. */
  max?: string | number;
};

export type InputExtraInfoItem = { value: string | number; label: string };
export type InputExtraInfoFalseableItem = string | number | InputExtraInfoItem | false;

export type InputExtraInfoProps = {
  balance?: InputExtraInfoFalseableItem;
  min?: InputExtraInfoFalseableItem;
  max?: InputExtraInfoFalseableItem;
  others?: (InputExtraInfoItem | JSX.Element)[];
  wrapExtraInfo?: number | boolean;
};

export type InputExtraInfo = JSX.Element | false | InputExtraInfoProps;
