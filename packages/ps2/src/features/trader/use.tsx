import {
  useLazyTraderServicesQuery,
  useTraderServiceBalanceQuery,
  useTraderServiceDetailsQuery,
  useTraderServiceInvestorsQuery,
  useTraderServiceManagementQuery,
  useTraderServiceTransferFundsMutation,
  useTraderServiceUpdateScaMinimumMutation,
} from './api';
import { useDispatch } from 'react-redux';
import { setActiveServiceId } from './store';
import { TraderService, TransferPayload } from './types';
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

export function useTraderServiceUpdateMinimum(
  serviceId: string,
): [(minimum: string) => Promise<void>, { isLoading: boolean }] {
  const [update, { isLoading }] = useTraderServiceUpdateScaMinimumMutation();
  const { isFetching: isLoadingManagement, refetch } =
    useTraderServiceManagement(serviceId);
  return [
    async (minimum) => {
      await update({ minimum, serviceId });
      await refetch();
    },
    { isLoading: isLoading || isLoadingManagement },
  ];
}

export function useTraderServiceTransferFunds(
  serviceId: string,
): [(payload: TransferPayload) => Promise<void>, { isLoading: boolean }] {
  const [update, { isLoading }] = useTraderServiceTransferFundsMutation();
  const { isFetching: isLoadingManagement, refetch } =
    useTraderServiceBalance(serviceId);
  return [
    async (payload) => {
      await update({ ...payload, serviceId });
      await refetch();
    },
    { isLoading: isLoading || isLoadingManagement },
  ];
}
