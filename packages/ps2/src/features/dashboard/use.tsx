import { setInvestments } from './store';
import { useDispatch } from 'react-redux';
import { useInvestmentsQuery } from './api';
import { useActiveExchange } from '../auth/use';
import { useEffect } from 'react';

export function useInvestments(): ReturnType<typeof useInvestmentsQuery> {
  const dispatch = useDispatch();
  const exchange = useActiveExchange();
  const result = useInvestmentsQuery(exchange?.internalId);
  useEffect(() => {
    dispatch(setInvestments(result.data || undefined));
  }, [result.data]);
  return result;
}
