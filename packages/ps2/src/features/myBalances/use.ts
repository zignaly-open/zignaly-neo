import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useLazyReducedBalancesQuery, useLazyAllCoinsQuery } from './api';
import { Exchange } from '../auth/types';

export function useSelectMyBalances(): object {
  const balances = useSelector((state: RootState) => state.myBalances.balances);
  const coins = useSelector((state: RootState) => state.myBalances.coins);

  return Object.entries(balances).reduce(
    (acc: object, [coin, balance]: [string, object]) => {
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
}

export const useFetchMyBalances = (): [
  { isLoadingAllCoins: boolean; isLoadingReducedBalances: boolean },
  (currentExchange: Exchange) => Promise<void>,
] => {
  const [loadReducedBalances, { isFetching: isLoadingReducedBalances }] =
    useLazyReducedBalancesQuery();
  const [, { isFetching: isLoadingAllCoins }] = useLazyAllCoinsQuery();

  return [
    { isLoadingAllCoins, isLoadingReducedBalances },
    async (currentExchange: Exchange) => {
      await loadReducedBalances(currentExchange.internalId).unwrap();
    },
  ];
};
