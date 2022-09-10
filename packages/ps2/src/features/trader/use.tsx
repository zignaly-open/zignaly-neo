import {
  useLazyTraderServicesQuery,
  useTraderServiceBalanceQuery,
  useTraderServiceDetailsQuery,
  useTraderServiceInvestorsQuery,
  useTraderServiceManagementQuery,
} from './api';
import { useDispatch } from 'react-redux';
import { setActiveServiceId } from './store';
import { TraderService } from './types';
import { useCurrentUser } from '../auth/use';
import { useEffect } from 'react';

export function useTraderServices(): {
  data: TraderService[];
  isLoading: boolean;
} {
  const [load, { data, isLoading }] = useLazyTraderServicesQuery();
  const user = useCurrentUser();
  useEffect(() => {
    user?.userId && load();
  }, [user?.userId]);
  return { data, isLoading };
}

export function useSetActiveTraderService(): (serviceId: string) => void {
  const dispatch = useDispatch();
  return (serviceId) => dispatch(setActiveServiceId(serviceId));
}

export const useTraderServiceInvestors = (
  serviceId: string,
): ReturnType<typeof useTraderServiceInvestorsQuery> => {
  return useTraderServiceInvestorsQuery(serviceId);
};

export function useTraderServiceManagement(
  serviceId: string,
): ReturnType<typeof useTraderServiceManagementQuery> {
  return useTraderServiceManagementQuery(serviceId);
}

export function useTraderServiceDetails(
  serviceId: string,
): ReturnType<typeof useTraderServiceDetailsQuery> {
  return useTraderServiceDetailsQuery(serviceId);
}

export function useTraderServiceBalance(
  serviceId: string,
): ReturnType<typeof useTraderServiceBalanceQuery> {
  return useTraderServiceBalanceQuery(serviceId);
}
