import { CoinBalance, CoinDetail } from 'apis/ps2/coin/types';

export type BalanceTableDataType = {
  coin: string;
  balance: CoinBalance & CoinDetail;
};
