import { useAllCoinsQuery, useCoinsQuery } from './api';
import { useActiveExchange } from '../user/use';
import { CoinBalances, CoinDetails } from './types';
import { QueryReturnType } from '../../util/queryReturnType';

export function useCoinBalances(
  convert = false,
): QueryReturnType<CoinBalances> {
  const exchange = useActiveExchange();
  return useCoinsQuery(
    {
      exchangeInternalId: exchange?.internalId,
      convert,
    },
    { skip: !exchange?.internalId },
  );
}

export function useExchangeCoinsList(): QueryReturnType<CoinDetails> {
  const exchange = useActiveExchange();
  return useAllCoinsQuery(exchange?.exchangeType, {
    skip: !exchange?.exchangeType,
  });
}
