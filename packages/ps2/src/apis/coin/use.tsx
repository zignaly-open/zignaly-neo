import { useCoinsQuery } from './api';
import { useActiveExchange } from '../user/use';
import { Coins } from './types';
import { QueryReturnType } from '../../util/queryReturnType';

export function useActiveExchangeCoins(): QueryReturnType<Coins> {
  const exchange = useActiveExchange();
  return useCoinsQuery(exchange?.internalId, { skip: !!exchange?.internalId });
}
