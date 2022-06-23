import { Swap } from "../types";

export interface ConfirmSwapModalProps {
  swapTo: Swap;
  swapFrom: Swap;
  swapRate: string;
  swapNowOnClick: Function;
  getSwapRate: Function;
}
