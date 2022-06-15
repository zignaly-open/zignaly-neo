import { CoinOption, NetworkOption } from "../../types";

export interface FormAndButtonProps {
  coin: CoinOption | undefined;
  network: NetworkOption | undefined;
  inputAmountOnChange: Function;
  inputAddressOnChange: Function;
  notSureOnClick?: Function;
  onSubmit?: any;
}
