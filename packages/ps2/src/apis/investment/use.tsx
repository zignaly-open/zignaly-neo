import { useDispatch, useSelector } from 'react-redux';
import {
  useInvestmentsQuery,
  useInvestmentDetailsQuery,
  useUpdateTakeProfitMutation,
  useUpdateTakeProfitAndInvestMoreMutation,
  useWithdrawInvestmentMutation,
  useInvestedAmountQuery,
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

export function useIsInvestedInService(serviceId: string): {
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
      skip: !isAuthenticated,
    },
  );

  const invested = data?.[exchange.internalId];

  return {
    isLoading: isLoading || isFetching,
    refetch,
    thisAccount: !!invested,
    accounts: data,
    investedAmount: invested?.invested || '0',
  };
}

export function useCurrentBalance(): { id: string; balance: string } {
  const service = useSelectedInvestment();
  const { data: coins } = useCoinBalances();

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
