import {
  useAllCoinsQuery,
  useCoinsQuery,
  useDepositInfoQuery,
  useQuoteAssetsCoinQuery,
  useConvertPreviewQuery,
} from './api';
import { CoinBalances, CoinDetails, DepositInfo } from './types';
import { QueryReturnType } from 'util/queryReturnType';
import { useActiveExchange } from '../user/use';
import { useBalanceQuery } from '../user/api';

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
export function useQuoteAssetsCoin(
  coinId: string,
): QueryReturnType<Array<string>> {
  const exchange = useActiveExchange();
  return useQuoteAssetsCoinQuery(
    {
      exchangeInternalId: exchange?.internalId,
      coinId,
    },
    { skip: !exchange?.internalId || !coinId },
  );
}

export function useConvertPreview(data: {
  from: string;
  to: string;
  amount: string;
}): QueryReturnType<{
  side: string;
  lastPrice: number;
  estimatedAmount: number;
  min: number;
}> {
  return useConvertPreviewQuery(
    {
      from: data.from,
      to: data.to,
      qty: data.amount || '1',
    },
    { skip: !data.from || !data.to },
  );
}

export function useExchangeCoinsList(): QueryReturnType<CoinDetails> {
  const exchange = useActiveExchange();
  return useAllCoinsQuery(exchange?.exchangeType, {
    skip: !exchange?.exchangeType,
  });
}

export function useRefetchBalance() {
  const exchange = useActiveExchange();
  // Trigger balance update to be sure that balance widget matches transactions data
  useBalanceQuery(
    {
      exchangeInternalId: exchange?.internalId,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !exchange?.internalId,
    },
  );
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
      exchangeId: exchange?.internalId,
    },
    { skip: !coinId || !networkId || !exchange?.internalId },
  );
}
