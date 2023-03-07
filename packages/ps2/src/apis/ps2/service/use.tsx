import {
  useTraderServiceBalanceQuery,
  useTraderServiceDetailsQuery,
  useTraderServiceGraphQuery,
  useTraderServiceInvestorsQuery,
  useTraderServiceManagementQuery,
  useTraderServicesQuery,
  useTraderServiceTransferFundsMutation,
  useTraderServiceUpdateScaMinimumMutation,
} from './api';
import { useDispatch, useSelector } from 'react-redux';
import { format, parse, subDays } from 'date-fns';
import {
  GraphChartType,
  GraphTimeframe,
  GraphTimeframeDayLength,
  Service,
  TraderService,
  TraderServiceChartProcessed,
  TransferPayload,
} from './types';
import { RootState } from '../../store';
import { useIsAuthenticated } from '../user/use';
import { useTitle } from 'react-use';
import { useTranslation } from 'react-i18next';
import { setChartTimeframe, setChartType } from './store';
import { useMemo } from 'react';
import { formatMonthDay } from '../../../views/Dashboard/components/MyDashboard/util';

export function useTraderServices() {
  const isAuthenticated = useIsAuthenticated();
  return useTraderServicesQuery(null, {
    skip: !isAuthenticated,
  });
}

export function useIsServiceOwner(serviceId: string): boolean | undefined {
  const isAuthenticated = useIsAuthenticated();

  const { data: traderServices } = useTraderServices();
  return (
    isAuthenticated &&
    traderServices?.some((s: TraderService) => s.serviceId === serviceId)
  );
}

export function useFirstOwnedService(): TraderService | null {
  const { data: traderServices } = useTraderServices();
  return (traderServices && traderServices[0]) || null;
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
    chartType: chartType || GraphChartType.pnl_pct_compound,
    chartTimeframe: chartTimeframe || GraphTimeframe['30d'],
    setChartType: (v) => dispatch(setChartType(v)),
    setChartTimeframe: (v) => dispatch(setChartTimeframe(v)),
  };
}

export function useChartData({
  service,
  chartType,
  chartTimeframe,
}: {
  chartType: GraphChartType;
  chartTimeframe: GraphTimeframe;
  service: Service;
}) {
  const { data, isLoading, isFetching, isError } = useTraderServiceGraphQuery({
    id: service.id,
    period: chartTimeframe,
    chart: chartType,
  });

  const chartData = useMemo<TraderServiceChartProcessed>(() => {
    const chart = { ...(data?.data || {}) };
    const now = new Date();
    for (
      let i = -1 * (GraphTimeframeDayLength[chartTimeframe] || 0);
      i < 0;
      i++
    ) {
      const key = format(subDays(now, -1 * i), 'yyyy-MM-dd');
      if (typeof chart[key] !== 'undefined') {
        break;
      } else {
        chart[key] = 0;
      }
    }

    const dates = Object.entries(chart).sort(([a], [b]) => a.localeCompare(b));
    const graph = dates?.map(([date, value]) => ({
      x: formatMonthDay(parse(date, 'yyyy-MM-dd', Date.now())),
      y: value,
    }));

    return {
      summary: data?.summary,
      percentDiff: [GraphChartType.investors, GraphChartType.sbt_ssc].includes(
        chartType,
      )
        ? data?.summaryPct
        : undefined,
      migrationDate: data?.migration_date,
      migrationIndex: dates.findIndex(([x]) => x === data?.migration_date),
      data: graph,
    };
  }, [data?.data]);

  return { data: chartData, isLoading, isFetching, isError };
}
