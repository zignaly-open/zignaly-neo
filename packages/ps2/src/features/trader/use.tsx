import { useTraderServicesQuery } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveServiceId } from './store';
import { RootState } from '../store';
import { TraderService } from './types';

export function useTraderServices(): ReturnType<typeof useTraderServicesQuery> {
  return useTraderServicesQuery();
}

export function useSetActiveTradingService(): (serviceId: string) => void {
  const dispatch = useDispatch();
  return (serviceId) => dispatch(setActiveServiceId(serviceId));
}

export function useActiveTradingService(): {
  isLoading: boolean;
  service: TraderService;
} {
  const { activeServiceId } =
    useSelector((state: RootState) => state.trader) || {};

  const { isLoading, data } = useTraderServicesQuery();
  return {
    isLoading,
    service: data.find((x) => x.serviceId === activeServiceId) || data[0],
  };
}
