import { InputAmountAdvancedValue } from '@zignaly-open/ui/lib/components/inputs/InputAmountAdvanced/types';
import { AccountCoinBalances, CoinBalances } from 'apis/coin/types';
import { Exchange } from 'apis/user/types';
import { WalletCoins } from 'apis/wallet/types';

export type WalletDepositModalProps = {
  selectedCoin: string;
  coins: WalletCoins;
};

export type DepositFormData = {
  network: string;
};

export type AddUsdtFormProps = {
  accountBalances: AccountBalances[];
};

export type SwapFormProps = {
  accountsBalances: AccountBalances[];
  coinFrom?: string;
  coinTo?: string;
  onDepositMore: () => void;
  onDone: () => void;
};

export type AccountBalances = {
  exchange: Exchange;
  balances: CoinBalances;
};

export type SwapFormData = {
  exchangeAccount: string;
  amount: InputAmountAdvancedValue;
};
