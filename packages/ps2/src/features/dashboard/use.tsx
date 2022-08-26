import { useDispatch, useSelector } from 'react-redux';
import {
  useInvestmentsQuery,
  useCoinsQuery,
  useInvestmentDetailsQuery,
} from './api';
import { useActiveExchange } from '../auth/use';
import { Coins, Investment, InvestmentDetails } from './types';
import { RootState } from '../store';
import { setSelectedInvestment } from './store';
import { useMemo } from 'react';

export function useInvestments(): ReturnType<typeof useInvestmentsQuery> {
  const exchange = useActiveExchange();
  return useInvestmentsQuery(exchange?.internalId);
}

export function useCoins(): ReturnType<typeof useCoinsQuery> {
  const exchange = useActiveExchange();
  return useCoinsQuery(exchange?.internalId);
}

export function useInvestmentDetails(
  serviceId: string,
): ReturnType<typeof useInvestmentsQuery> {
  const exchange = useActiveExchange();
  return useInvestmentDetailsQuery({
    exchangeInternalId: exchange?.internalId,
    serviceId,
  });
}

// TODO: should be done with caching
export function useStoredCoins(): { isLoading: boolean; data: Coins } {
  const data = useSelector((state: RootState) => state.dashboard)?.coins;
  return { isLoading: !data, data };
}

// TODO: should be done with caching
export function useStoredInvestmentDetails(): {
  isLoading: boolean;
  data: InvestmentDetails;
} {
  const data = useSelector(
    (state: RootState) => state.dashboard,
  )?.selectedInvestmentDetails;
  return { isLoading: !data, data };
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
  const { data: coins } = useStoredCoins();

  return useMemo(
    () => ({
      id: service.ssc,
      balance: coins?.[service.ssc]?.balanceFree || '0',
    }),
    [service.ssc, coins],
  );
}
