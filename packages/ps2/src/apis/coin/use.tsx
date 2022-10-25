import { useAllCoinsQuery, useCoinsQuery } from './api';
import { useActiveExchange } from '../user/use';
import { CoinBalances, CoinDetails } from './types';
import { QueryReturnType } from '../../util/queryReturnType';

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
