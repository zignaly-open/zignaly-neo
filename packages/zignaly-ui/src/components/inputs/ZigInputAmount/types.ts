import { FilledTextFieldProps } from "@mui/material/TextField/TextField";

export type Coin = {
  coin: string;
  balance: string | number;
};

export type ZigInputAmountProps = Omit<FilledTextFieldProps, "variant" | "error"> & {
  wide?: boolean;
  error?: boolean | string;
  disabled?: boolean;
  id?: string;
  coin?: string | Coin;
  tokenOptions?: any;
  onTokenChange?: (token: any) => void;
  showMaxButton?: boolean;
  /**
   * Extra info to show under the input.
   * By default it will show the balance, min and max, if those values are provided.
   * To hide them, set them to false.
   * To change the labels, set them to a string.
   *
   * To add additional items, use the `others` array property:
   * { value: "value", label: "label" } or JSX.Element
   */
  extraInfo?: InputExtraInfo;
  /**
   * Wrap info if more than specified number of items. Default is 2. Set to true/false to force.
   */
  wrapExtraInfo?: number | boolean;
  /**
   * Custom onMax callback but onChange will already be called with the max value.
   */
  onMax?: () => void;
  /**
   * Pressing the MAX button will trigger this value to be set.
   * Also showed as info under the input.
   * */
  balance?: string | number;
  /** Showed as info. */
  min?: string | number;
  /** Showed as info */
  max?: string | number;
  className?: string;
  labelInline?: boolean;
  withCoinSelector?: boolean;
};

export type InputExtraInfoItem = { value: string | number; label: string };
export type InputExtraInfoFalseableItem = string | InputExtraInfoItem | false;

export type InputExtraInfoProps = {
  balance?: string | number;
  min?: string | number;
  max?: string | number;
  extraInfo?: InputExtraInfoObject;
};

export type InputExtraInfoObject = {
  balance?: InputExtraInfoFalseableItem;
  min?: InputExtraInfoFalseableItem;
  max?: InputExtraInfoFalseableItem;
  others?: InputExtraInfoFalseableItem[];
  wrapExtraInfo?: number | boolean;
};

export type InputExtraInfo = JSX.Element | false | InputExtraInfoObject;
