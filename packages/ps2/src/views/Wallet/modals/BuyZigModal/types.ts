import { InputAmountAdvancedValue } from '@zignaly-open/ui/lib/components/inputs/InputAmountAdvanced/types';
import { CoinBalances } from 'apis/ps2/coin/types';
import { Exchange } from 'apis/ps2/user/types';
import { WalletCoins } from 'apis/wallet/types';

export type WalletDepositModalProps = {
  selectedCoin: string;
  coins: WalletCoins;
  close: () => void;
};

export type DepositFormData = {
  network: string;
};

export type AddUsdtFormProps = {
  accountBalances: AccountBalances[];
  setStep: (value: Step) => void;
  close: () => void;
};

export type Step = 'swap' | 'deposit' | 'confirm';

export type SwapFormProps = {
  accountsBalances: AccountBalances[];
  coinFrom?: string;
  coinTo?: string;
  onDepositMore: () => void;
  onDone: () => void;
  setStep: (value: Step) => void;
};

export type AccountBalances = {
  exchange: Exchange;
  balances: CoinBalances;
};

export type SwapFormData = {
  exchangeAccount: string;
  amount: InputAmountAdvancedValue;
};

export type SwapConfirmFormProps = {
  internalId: string;
  coinFrom: string;
  coinTo: string;
  amount: string;
  onCancel: () => void;
  onDone: () => void;
};
