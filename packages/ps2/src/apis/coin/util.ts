import {
  CoinBalances,
  CoinDetails,
  CoinBalance,
  AggregatedBalances,
} from './types';

export const mergeCoinsAndBalances = (
  coins: CoinDetails,
  balances: CoinBalances,
): AggregatedBalances =>
  Object.entries(balances || {}).reduce(
    (acc, [coin, balance]: [string, CoinBalance]) => {
      acc = {
        ...acc,
        [coin]: {
          ...balance,
          ...coins[coin],
        },
      };
      return acc;
    },
    {},
  );
