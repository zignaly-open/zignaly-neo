import { useDispatch, useSelector } from 'react-redux';
import {
  useInvestmentsQuery,
  useInvestmentDetailsQuery,
  useUpdateTakeProfitMutation,
  useUpdateTakeProfitAndInvestMoreMutation,
  useWithdrawInvestmentMutation,
} from './api';
import { useActiveExchange } from '../user/use';
import { Investment } from './types';
import { RootState } from '../store';
import { setSelectedInvestment } from './store';
import { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useExchangeCoins } from '../coins/use';

export const useInvestments = useInvestmentsQuery;

export function useInvestmentDetails(
  serviceId: string,
): ReturnType<typeof useInvestmentsQuery> {
  const exchange = useActiveExchange();
  return useInvestmentDetailsQuery({
    exchangeInternalId: exchange?.internalId,
    serviceId,
  });
}

export function useSetSelectedInvestment(): (service: Investment) => void {
  const dispatch = useDispatch();
  return (service) => dispatch(setSelectedInvestment(service));
}

export function useSelectedInvestment(): Investment {
  return useSelector((state: RootState) => state.dashboard)?.selectedInvestment;
}

export function useCurrentBalance(): { id: string; balance: string } {
  const service = useSelectedInvestment();
  const exchange = useActiveExchange();
  const { data: coins } = useExchangeCoins(exchange?.internalId);

  return useMemo(
    () => ({
      id: service.ssc,
      balance: coins?.[service.ssc]?.balanceFree || '0',
    }),
    [service.ssc, coins],
  );
}

export function useUpdateTakeProfitPercentage(): {
  isLoading: boolean;
  edit: ({
    profitPercentage,
    serviceId,
  }: {
    serviceId: string;
    profitPercentage: number | string;
  }) => Promise<void>;
} {
  const [update, { isLoading }] = useUpdateTakeProfitMutation();
  const exchange = useActiveExchange();
  return {
    isLoading,
    edit: async ({ profitPercentage, serviceId }) => {
      await update({
        profitPercentage,
        serviceId,
        exchangeInternalId: exchange.internalId,
      }).unwrap();
    },
  };
}

export function useUpdateTakeProfitAndInvestMore(): {
  isLoading: boolean;
  edit: ({
    profitPercentage,
    serviceId,
    amount,
  }: {
    serviceId: string;
    amount: BigNumber | number | string;
    profitPercentage: number | string;
  }) => Promise<void>;
} {
  const [update, { isLoading }] = useUpdateTakeProfitAndInvestMoreMutation();
  const exchange = useActiveExchange();
  return {
    isLoading,
    edit: async ({ profitPercentage, serviceId, amount }) => {
      await update({
        profitPercentage,
        serviceId,
        exchangeInternalId: exchange.internalId,
        amount: amount.toString(),
      }).unwrap();
    },
  };
}

export function useWithdrawInvestment(): {
  isLoading: boolean;
  withdraw: ({
    serviceId,
    amount,
  }: {
    serviceId: string;
    amount: BigNumber | number | string;
  }) => Promise<void>;
} {
  const [withdraw, { isLoading }] = useWithdrawInvestmentMutation();
  const exchange = useActiveExchange();
  const service = useSelectedInvestment();
  const { refetch } = useInvestmentDetails(service.serviceId);
  return {
    isLoading,
    withdraw: async ({ serviceId, amount }) => {
      await withdraw({
        serviceId,
        exchangeInternalId: exchange.internalId,
        amount: amount.toString(),
      }).unwrap();
      await refetch();
    },
  };
}
