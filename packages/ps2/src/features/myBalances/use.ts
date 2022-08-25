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
  { isLoading: boolean },
  (currentExchange: Exchange) => Promise<void>,
] => {
  const [loadReducedBalances, { isLoading: isLoadingReducedBalances }] =
    useLazyReducedBalancesQuery();
  const [loadAllCoins, { isLoading: isLoadingAllCoins }] =
    useLazyAllCoinsQuery();

  return [
    { isLoading: isLoadingAllCoins || isLoadingReducedBalances },
    async (currentExchange: Exchange) => {
      await Promise.all([
        loadReducedBalances(currentExchange.internalId).unwrap(),
        loadAllCoins(currentExchange.exchangeType).unwrap(),
      ]);
    },
  ];
};
