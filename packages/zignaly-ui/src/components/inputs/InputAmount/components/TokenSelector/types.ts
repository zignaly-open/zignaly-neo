import { TokenItem } from "../../types";

export type TokenSelectorProps = {
  value: TokenItem;
  onSelectToken: Function;
  tokens?: TokenItem[];
};
