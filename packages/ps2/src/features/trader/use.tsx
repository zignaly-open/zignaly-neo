import {
  useTraderServiceDetailsQuery,
  useTraderServiceInvestorsQuery,
  useTraderServiceManagementQuery,
  useTraderServicesQuery,
} from './api';
import { useDispatch } from 'react-redux';
import { setActiveServiceId } from './store';

export function useTraderServices(): ReturnType<typeof useTraderServicesQuery> {
  return useTraderServicesQuery();
}

export function useSetActiveTradingService(): (serviceId: string) => void {
  const dispatch = useDispatch();
  return (serviceId) => dispatch(setActiveServiceId(serviceId));
}

export const useTraderServiceInvestors = (
  serviceId: string,
): ReturnType<typeof useTraderServiceInvestorsQuery> => {
  return useTraderServiceInvestorsQuery(serviceId);
};

export function useTradingServiceManagement(
  serviceId: string,
): ReturnType<typeof useTraderServiceManagementQuery> {
  return useTraderServiceManagementQuery(serviceId);
}

export function useTradingServiceDetails(
  serviceId: string,
): ReturnType<typeof useTraderServiceDetailsQuery> {
  return useTraderServiceDetailsQuery(serviceId);
}
