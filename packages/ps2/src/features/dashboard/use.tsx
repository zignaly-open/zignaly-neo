import { setInvestments } from './store';
import { useDispatch } from 'react-redux';
import { useInvestmentsQuery } from './api';
import { useActiveExchange } from '../auth/use';
import { useEffect } from 'react';
import { Investment } from './types';

export function useInvestments(): {
  isLoading: boolean;
  data: Investment[] | undefined;
} {
  const dispatch = useDispatch();
  const exchange = useActiveExchange();
  const { isLoading, data } = useInvestmentsQuery(exchange?.internalId);
  useEffect(() => {
    dispatch(setInvestments(data || undefined));
  }, [data]);
  return { isLoading, data };
}
