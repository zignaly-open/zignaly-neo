import {
  useTraderServiceBalanceQuery,
  useTraderServiceDetailsQuery,
  useTraderServiceInvestorsQuery,
  useTraderServiceManagementQuery,
  useTraderServiceTransferFundsMutation,
  useTraderServiceUpdateScaMinimumMutation,
} from './api';
import { useDispatch, useSelector } from 'react-redux';
import {
  GraphChartType,
  GraphTimeframe,
  TraderService,
  TransferPayload,
} from './types';
import { RootState } from '../store';
import { useIsAuthenticated } from '../user/use';
import { useTitle } from 'react-use';
import { useTranslation } from 'react-i18next';
import { setChartTimeframe, setChartType } from './store';

export function useTraderServices(): TraderService[] | undefined {
  return useSelector((store: RootState) => store.service.traderServices);
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
  const { isFetching: isLoadingManagement } =
    useTraderServiceManagement(serviceId);
  return [
    async (minimum) => {
      await update({ minimum, serviceId }).unwrap();
    },
    { isLoading: isLoading || isLoadingManagement },
  ];
}

export function useTraderServiceTransferFunds(
  serviceId: string,
): [(payload: TransferPayload) => Promise<void>, { isLoading: boolean }] {
  const [update, { isLoading }] = useTraderServiceTransferFundsMutation();
  const { isFetching: isLoadingManagement } =
    useTraderServiceBalance(serviceId);
  return [
    async (payload) => {
      await update({ ...payload, serviceId }).unwrap();
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

export function useChartConfig(): {
  chartType: GraphChartType;
  chartTimeframe: GraphTimeframe;
  setChartType: (v: GraphChartType) => void;
  setChartTimeframe: (v: GraphTimeframe) => void;
} {
  const { chartType, chartTimeframe } = useSelector(
    (store: RootState) => store.service,
  );
  const dispatch = useDispatch();
  return {
    chartType: chartType || GraphChartType.pnl_ssc,
    chartTimeframe: chartTimeframe || GraphTimeframe['30d'],
    setChartType: (v) => dispatch(setChartType(v)),
    setChartTimeframe: (v) => dispatch(setChartTimeframe(v)),
  };
}
