import { CoinBalance, CoinDetail } from 'apis/coin/types';

export type BalanceTableDataType = {
  coin: string;
  balance: CoinBalance & CoinDetail;
};
