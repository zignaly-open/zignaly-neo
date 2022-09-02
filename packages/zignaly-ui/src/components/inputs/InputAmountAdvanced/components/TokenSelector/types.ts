import { TokenItem } from "../../types";

export type TokenSelectorProps = {
  value: TokenItem;
  onSelectToken: (token: TokenItem) => void;
  tokens?: TokenItem[];
};
