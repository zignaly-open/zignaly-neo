import { useDispatch, useSelector } from 'react-redux';
import {
  useInvestmentsQuery,
  useInvestmentDetailsQuery,
  useUpdateTakeProfitMutation,
  useUpdateTakeProfitAndInvestMoreMutation,
  useWithdrawInvestmentMutation,
  useInvestedAmountQuery,
  useInvestInServiceMutation,
} from './api';
import { useActiveExchange, useIsAuthenticated } from '../user/use';
import {
  InvestedInService,
  InvestmentDetails,
  InvestmentServiceDetails,
} from './types';
import { RootState } from '../store';
import { setSelectedInvestment } from './store';
import { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useCoinBalances } from '../coin/use';
import { QueryReturnType } from '../../util/queryReturnType';

export const useInvestments = useInvestmentsQuery;

export function useInvestmentDetails(
  serviceId: string,
): QueryReturnType<InvestmentDetails> {
  const exchange = useActiveExchange();
  return useInvestmentDetailsQuery({
    exchangeInternalId: exchange?.internalId,
    serviceId,
  });
}

export function useSetSelectedInvestment(): (
  service: InvestmentServiceDetails,
) => void {
  const dispatch = useDispatch();
  return (service) => dispatch(setSelectedInvestment(service));
}

export function useSelectedInvestment(): InvestmentServiceDetails {
  return useSelector((state: RootState) => state.investment)
    ?.selectedInvestment;
}

export function useIsInvestedInService(
  serviceId: string,
  options?: { skip: boolean },
): {
  isLoading: boolean;
  thisAccount: boolean;
  accounts?: InvestedInService;
  refetch: () => void;
  investedAmount: string;
} {
  const isAuthenticated = useIsAuthenticated();
  const exchange = useActiveExchange();

  const { isLoading, data, refetch, isFetching } = useInvestedAmountQuery(
    serviceId,
    {
      skip: !isAuthenticated || !exchange?.internalId || options?.skip,
    },
  );

  const invested = isAuthenticated && data?.[exchange?.internalId];

  const investedAmount = new BigNumber(invested?.invested || 0).plus(
    invested?.pending || 0,
  );

  return {
    isLoading: isAuthenticated && (isLoading || isFetching),
    refetch,
    thisAccount: investedAmount.gt(0),
    accounts: data,
    investedAmount: investedAmount.toString(),
  };
}

export function useInvestedAccountsCount(
  serviceId: string,
  options?: { skip: boolean },
): number {
  const isAuthenticated = useIsAuthenticated();
  const isInvested = useIsInvestedInService(serviceId, options);

  return (
    (isAuthenticated && Object.keys(isInvested.accounts || {}).length) || 0
  );
}

export function useCurrentBalance(coin?: string): {
  id: string;
  balance: string;
  isFetching: boolean;
} {
  const service = useSelectedInvestment();
  const { data: coins, isFetching } = useCoinBalances();

  return useMemo(
    () => ({
      isFetching,
      id: coin || service?.ssc,
      balance: coins?.[coin || service?.ssc]?.balanceFree || '0',
    }),
    [coin, service?.ssc, coins, isFetching],
  );
}

export function useUpdateTakeProfitPercentage(serviceId: string): {
  isLoading: boolean;
  edit: ({
    profitPercentage,
  }: {
    profitPercentage: number | string;
  }) => Promise<void>;
} {
  const [update, { isLoading }] = useUpdateTakeProfitMutation();
  const exchange = useActiveExchange();
  return {
    isLoading,
    edit: async ({ profitPercentage }) => {
      await update({
        profitPercentage,
        serviceId,
        exchangeInternalId: exchange.internalId,
      }).unwrap();
    },
  };
}

export function useInvestInService(serviceId: string): {
  isLoading: boolean;
  invest: ({
    profitPercentage,
    amount,
  }: {
    profitPercentage: number | string;
    amount: string;
  }) => Promise<void>;
} {
  const [update, { isLoading }] = useInvestInServiceMutation();
  const { refetch } = useCoinBalances();
  const { refetch: refetchInvestedState } = useIsInvestedInService(serviceId);
  const exchange = useActiveExchange();

  return {
    isLoading,
    invest: async ({ profitPercentage, amount }) => {
      await update({
        profitPercentage,
        serviceId,
        amount,
        exchangeInternalId: exchange.internalId,
      }).unwrap();
      refetchInvestedState();
      refetch(); // TODO: proper cache invalidation
    },
  };
}

export function useUpdateTakeProfitAndInvestMore(serviceId: string): {
  isLoading: boolean;
  edit: ({
    profitPercentage,
    amount,
  }: {
    amount: BigNumber | number | string;
    profitPercentage: number | string;
  }) => Promise<void>;
} {
  const [update, { isLoading }] = useUpdateTakeProfitAndInvestMoreMutation();
  const exchange = useActiveExchange();
  const { refetch } = useCoinBalances();
  const { refetch: refetchInvestedState } = useIsInvestedInService(serviceId);
  return {
    isLoading,
    edit: async ({ profitPercentage, amount }) => {
      await update({
        profitPercentage,
        serviceId,
        exchangeInternalId: exchange.internalId,
        amount: amount.toString(),
      }).unwrap();
      refetchInvestedState();
      refetch(); // TODO: proper cache invalidation
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
