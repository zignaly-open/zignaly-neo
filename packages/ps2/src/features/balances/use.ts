// Dependencies
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

// API
import { useLazyReducedBalancesQuery, useLazyAllCoinsQuery } from './api';

// Types
import { Exchange } from '../auth/types';

// Actions
import { setCoins } from '../coins/store';
import { setBalances } from './store';

export function useSelectBalances(): object {
  const balances = useSelector((state: RootState) => state.balances);
  const coins = useSelector((state: RootState) => state.coins);

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

export const useFetchBalances = (): [
  { loading: boolean },
  (currentExchange: Exchange) => Promise<void>,
] => {
  // Hooks
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadReducedBalances] = useLazyReducedBalancesQuery();
  const [loadAllCoins] = useLazyAllCoinsQuery();

  return [
    { loading },
    async (currentExchange: Exchange) => {
      setLoading(true);

      const [balances, coins] = await Promise.all([
        loadReducedBalances(currentExchange.internalId).unwrap(),
        loadAllCoins(currentExchange.exchangeType).unwrap(),
      ]);

      dispatch(setCoins(coins));
      dispatch(setBalances(balances));

      setLoading(false);
    },
  ];
};
