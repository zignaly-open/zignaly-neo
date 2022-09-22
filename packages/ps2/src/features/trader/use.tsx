import {
  useTraderServiceBalanceQuery,
  useTraderServiceDetailsQuery,
  useTraderServiceInvestorsQuery,
  useTraderServiceManagementQuery,
  useTraderServiceTransferFundsMutation,
  useTraderServiceUpdateScaMinimumMutation,
} from './api';
import { useSelector } from 'react-redux';
import { TraderService, TransferPayload } from './types';
import { RootState } from '../store';
import { useIsAuthenticated } from '../auth/use';
import { useTitle } from 'react-use';
import { useTranslation } from 'react-i18next';

export function useTraderServices(): TraderService[] | undefined {
  return useSelector((store: RootState) => store.trader.traderServices);
}

export function useIsServiceOwner(serviceId: string) {
  const traderServices = useTraderServices();
  const isAuthenticated = useIsAuthenticated();
  return (
    isAuthenticated &&
    traderServices?.some((s: TraderService) => s.serviceId === serviceId)
  );
}

export function useFirstOwnedService(): TraderService | null {
  const traderServices = useTraderServices();
  const isAuthenticated = useIsAuthenticated();
  return (isAuthenticated && traderServices[0]) || null;
}

export const useTraderServiceInvestors = useTraderServiceInvestorsQuery;

export const useTraderServiceManagement = useTraderServiceManagementQuery;

export const useServiceDetails = useTraderServiceDetailsQuery;

export const useTraderServiceBalance = useTraderServiceBalanceQuery;

export function useTraderServiceUpdateMinimum(
  serviceId: string,
): [(minimum: string) => Promise<void>, { isLoading: boolean }] {
  const [update, { isLoading }] = useTraderServiceUpdateScaMinimumMutation();
  const { isFetching: isLoadingManagement, refetch } =
    useTraderServiceManagement(serviceId);
  return [
    async (minimum) => {
      await update({ minimum, serviceId }).unwrap();
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
      await update({ ...payload, serviceId }).unwrap();
      await refetch();
    },
    { isLoading: isLoading || isLoadingManagement },
  ];
}

export function useTraderServiceTitle(
  translationKey: string,
  serviceId: string,
): void {
  const { data: service } = useServiceDetails(serviceId);
  const { t } = useTranslation('pages');

  useTitle(
    service
      ? t(translationKey, { serviceName: service.name })
      : t('trading-services'),
  );
}
