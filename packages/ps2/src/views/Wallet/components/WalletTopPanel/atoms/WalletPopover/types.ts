import { WalletBalance, WalletCoin } from 'apis/wallet/types';

export type BalanceRowProps = {
  label?: string;
  amount: number;
  coin: WalletCoin;
};

export type WalletPopoverProps = {
  anchorEl: Element;
  handleClose: () => void;
  balance: WalletBalance;
  coin: WalletCoin;
  showLocked?: boolean;
};
