import { Coin } from "../types";

export type TokenSelectorProps<T> = {
  value: string | Coin | undefined;
  onSelectToken: (token: Coin) => void;
  tokens?: TokenSelectOption<T>[];
};
export type TokenSelectOption<T> = {
  value: T;
  label: string | JSX.Element;
  disabled?: boolean;
};
