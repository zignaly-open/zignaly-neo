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
import {
  InvestedInService,
  Investment,
  InvestmentDetails,
  InvestmentServiceDetails,
} from './types';
import { RootState } from '../store';
import { setSelectedInvestment } from './store';
import { useEffect, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useCoinBalances } from '../coin/use';
import { QueryReturnType } from '../../util/queryReturnType';
import { useActiveExchange, useIsAuthenticated } from '../user/use';
import { Service } from '../service/types';
import { serviceToInvestmentServiceDetail } from './util';

export const useInvestments = useInvestmentsQuery;

export const useSingleInvestment = (serviceId: string): Investment => {
  const exchange = useActiveExchange();
  const { data: investments } = useInvestments(exchange?.internalId, {
    skip: !exchange?.internalId,
  });
  return investments?.find((x) => x.serviceId === serviceId);
};

export function useInvestmentDetails(
  serviceId: string,
  options?: { skip: boolean },
): QueryReturnType<InvestmentDetails> {
  const exchange = useActiveExchange();
  return useInvestmentDetailsQuery(
    {
      exchangeInternalId: exchange?.internalId,
      serviceId,
    },
    { ...(options || {}), skip: options?.skip || !exchange?.internalId },
  );
}

export function useSelectInvestment(
  // we support both scenarios, so it's easier for you <3
  service: InvestmentServiceDetails | Service,
): void {
  const dispatch = useDispatch();
  useEffect(() => {
    service &&
      dispatch(
        setSelectedInvestment(
          'serviceId' in service
            ? service
            : serviceToInvestmentServiceDetail(service),
        ),
      );
    return () => {
      dispatch(setSelectedInvestment(null));
    };
  }, [service]);
}

export function useSelectedInvestment(): InvestmentServiceDetails | undefined {
  return useSelector((state: RootState) => state.investment)
    ?.selectedInvestment;
}

export function useIsInvestedInService(
  serviceId: string,
  options?: { skip: boolean },
): {
  isLoading: boolean;
  thisAccount: boolean;
  isError: boolean;
  accounts?: InvestedInService;
  refetch: () => void;
  investedAmount: string;
} {
  const isAuthenticated = useIsAuthenticated();
  const exchange = useActiveExchange();

  const { isLoading, data, refetch, isFetching, isError } =
    useInvestedAmountQuery(serviceId, {
      skip: !isAuthenticated || !exchange?.internalId || options?.skip,
    });

  const invested = isAuthenticated && data?.[exchange?.internalId];

  const investedAmount = new BigNumber(invested?.invested || 0).plus(
    invested?.pending || 0,
  );

  return {
    isLoading: isAuthenticated && (isLoading || isFetching),
    refetch,
    isError,
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
  refetch: () => void;
} {
  const service = useSelectedInvestment();
  const { data: coins, isFetching, refetch } = useCoinBalances();

  return useMemo(
    () => ({
      isFetching,
      id: coin || service?.ssc,
      balance: coins?.[coin || service?.ssc]?.balanceFree || '0',
      refetch,
    }),
    [coin, service?.ssc, coins, isFetching, refetch],
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
        exchangeInternalId: exchange!.internalId,
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
  const { refetch: refetchInvestedState } = useIsInvestedInService(serviceId);
  const exchange = useActiveExchange();

  return {
    isLoading,
    invest: async ({ profitPercentage, amount }) => {
      await update({
        profitPercentage,
        serviceId,
        amount,
        exchangeInternalId: exchange!.internalId,
      }).unwrap();
      refetchInvestedState();
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
    profitPercentage?: number | string;
  }) => Promise<void>;
} {
  const [update, { isLoading }] = useUpdateTakeProfitAndInvestMoreMutation();
  const exchange = useActiveExchange();
  const { refetch: refetchInvestedState } = useIsInvestedInService(serviceId);

  return {
    isLoading,
    edit: async ({ profitPercentage, amount }) => {
      await update({
        profitPercentage,
        serviceId,
        exchangeInternalId: exchange!.internalId,
        amount: amount.toString(),
      }).unwrap();

      refetchInvestedState();
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
        exchangeInternalId: exchange!.internalId,
        amount: amount.toString(),
      }).unwrap();
      refetch();
    },
  };
}
