import { useAllCoinsQuery, useCoinsQuery, useDepositInfoQuery } from './api';
import { useActiveExchange } from '../user/use';
import { CoinBalances, CoinDetails, DepositInfo } from './types';
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
