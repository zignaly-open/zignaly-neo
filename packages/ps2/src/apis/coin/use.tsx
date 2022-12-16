import {
  useAllCoinsQuery,
  useCoinsQuery,
  useDepositInfoQuery,
  useTransactionsHistoryQuery,
} from './api';
import { useActiveExchange } from '../user/use';
import { CoinBalances, CoinDetails, DepositInfo } from './types';
import { QueryReturnType } from '../../util/queryReturnType';
import useInfinitePaginatedQuery from 'util/hooks/useInfinitePaginatedQuery';
import { useUpdateEffect } from 'react-use';

export function useCoinBalances(options?: {
  convert?: boolean;
  refetch?: boolean;
}): QueryReturnType<CoinBalances> {
  const { convert = false, refetch = false } = options || {};
  const exchange = useActiveExchange();
  return useCoinsQuery(
    {
      exchangeInternalId: exchange?.internalId,
      convert,
    },
    { skip: !exchange?.internalId, refetchOnMountOrArgChange: refetch || 30 },
  );
}

export function useExchangeCoinsList(): QueryReturnType<CoinDetails> {
  const exchange = useActiveExchange();
  return useAllCoinsQuery(exchange?.exchangeType, {
    skip: !exchange?.exchangeType,
  });
}

export function useTransactionsHistory(
  filters: {
    limit?: number;
    type?: string;
  } = {},
) {
  const exchange = useActiveExchange();
  const infinitePaginatedQuery = useInfinitePaginatedQuery(
    useTransactionsHistoryQuery,
    {
      exchangeInternalId: exchange?.internalId,
      ...filters,
    },
  );

  return infinitePaginatedQuery;
}

export function useDepositInfo(
  coinId: string,
  networkId: string,
): QueryReturnType<DepositInfo> {
  const exchange = useActiveExchange();
  return useDepositInfoQuery(
    {
      coinId,
      networkId,
      exchangeId: exchange.internalId,
    },
    { skip: !coinId || !networkId || !exchange.internalId },
  );
}
