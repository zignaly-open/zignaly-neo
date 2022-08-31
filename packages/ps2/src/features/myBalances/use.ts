import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useLazyReducedBalancesQuery, useLazyAllCoinsQuery } from './api';
import { Exchange } from '../auth/types';
import { ShowFnOutput, useModal } from 'mui-modal-provider';
import DepositModal from './components/DepositModal';
import { CoinBalance, Coins } from './types';

export const useSelectMyBalances = (): object => {
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
};

export const useSelectedMyBalancesCoins = (): object => {
  return useSelector((state: RootState) => state.myBalances.coins);
};

export const useSelectedMyBalancesByCoin = (coinId: string): CoinBalance => {
  return useSelector((state: RootState) => state.myBalances.balances[coinId]);
};

export const useDeposit = () => {
  const { showModal } = useModal();

  return [
    async () => {
      let modal: ShowFnOutput<void>;
      await new Promise<void>(() => {
        modal = showModal(DepositModal, {
          close: () => modal.hide(),
        });
      });
    },
  ];
};

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
      await Promise.all([
        loadReducedBalances(currentExchange.internalId).unwrap(),
      ]);
    },
  ];
};
