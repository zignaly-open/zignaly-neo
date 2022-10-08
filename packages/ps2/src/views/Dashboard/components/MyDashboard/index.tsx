import {
  AreaChart,
  PercentageIndicator,
  PriceLabel,
  Table,
  Typography,
} from '@zignaly-open/ui';
import React, { useCallback, useMemo } from 'react';
import { Heading, Inline, Layout } from './styles';
import { useTranslation } from 'react-i18next';
import {
  useInvestments,
  useSetSelectedInvestment,
} from '../../../../apis/investment/use';
import BigNumber from 'bignumber.js';
import { formatDateFromDays } from './util';
import { Investment } from '../../../../apis/investment/types';
import { sortBigNumbers, stringSort } from '../../../../util/numbers';
import { BalanceSummary } from '../BalanceSummary';
import { ShowFnOutput, useModal } from 'mui-modal-provider';
import EditInvestmentModal from '../EditInvestmentModal';
import { TableProps } from '@zignaly-open/ui/lib/components/display/Table/types';
import { DashboardTableDataType } from './types';
import { ServiceName } from '../ServiceName';
import LayoutContentWrapper from '../../../../components/LayoutContentWrapper';
import { useActiveExchange } from '../../../../apis/user/use';
import { useCoinBalances } from '../../../../apis/coin/use';

const MyDashboard: React.FC = () => {
  const { t } = useTranslation(['my-dashboard', 'table']);
  const exchange = useActiveExchange();
  const investmentsEndpoint = useInvestments(exchange?.internalId, {
    skip: !exchange?.internalId,
  });
  const selectInvestment = useSetSelectedInvestment();
  // we do not use the results of this till before the modal
  useCoinBalances();
  const { showModal } = useModal();

  const onClickEditInvestment = (service: Investment) => {
    selectInvestment(service);
    const modal: ShowFnOutput<void> = showModal(EditInvestmentModal, {
      close: () => modal.hide(),
    });
  };

  const tableColumns: TableProps<DashboardTableDataType>['columns'] = useMemo(
    () => [
      {
        Header: t('tableHeader.summary.title'),
        accessor: 'summary',
        headerWithFooter: (
          <div>
            <div>{t('tableHeader.summary.subtitle')}</div>
          </div>
        ),
        Cell: ({ cell: { value } }) => (
          <BalanceSummary
            totalValue={value.totalValue}
            coin={value.service.ssc}
            profit={value.profit}
            onClickEdit={() => onClickEditInvestment(value.service)}
          />
        ),
        sortType: (a, b) =>
          sortBigNumbers(
            a.values.summary.totalValue,
            b.values.summary.totalValue,
          ),
      },
      {
        Header: () => <Inline>{t('tableHeader.serviceName.title')}</Inline>,
        accessor: 'service',
        headerWithFooter: (
          <Inline>{t('tableHeader.serviceName.subtitle')}</Inline>
        ),
        Cell: ({ cell: { value } }) => <ServiceName service={value} />,
        sortType: (a, b) =>
          stringSort(
            a.values.service.serviceName,
            b.values.service.serviceName,
          ),
      },
      {
        Header: t('tableHeader.1-mo.title'),
        accessor: 'chart',
        Cell: ({ cell: { value } }) =>
          parseFloat(value.last30Pnl) || Object.keys(value.data).length > 1 ? (
            <>
              <AreaChart variant='small' data={value.data} />
              <PercentageIndicator
                normalized
                value={value.last30Pnl}
                type={'graph'}
              />
            </>
          ) : (
            <Typography variant={'body2'} color={'neutral400'}>
              {t('tableHeader.1-mo.no-data')}
            </Typography>
          ),
      },
      {
        Header: t('tableHeader.dailyAvg-title'),
        accessor: 'dailyAvg',
        Cell: ({ cell: { value } }) => (
          <PriceLabel
            green={+value.dailyAvgPnl > 0}
            red={+value.dailyAvgPnl < 0}
            coin={value.currency}
            value={value.dailyAvgPnl}
          />
        ),
        sortType: (a, b) =>
          sortBigNumbers(
            a.values.dailyAvg.dailyAvgPnl,
            b.values.dailyAvg.dailyAvgPnl,
          ),
      },
      {
        Header: t('tableHeader.3-mos-title'),
        accessor: 'threeMonths',
        Cell: ({ cell: { value } }) => (
          <PercentageIndicator
            normalized
            type='default'
            value={value.pnl90dPct}
          />
        ),
        sortType: (a, b) =>
          sortBigNumbers(
            a.values.threeMonths.pnl90dPct,
            b.values.threeMonths.pnl90dPct,
          ),
      },
      {
        Header: t('tableHeader.6-mos-title'),
        accessor: 'sixMonths',
        Cell: ({ cell: { value } }) => (
          <PercentageIndicator
            normalized
            type='default'
            value={value.pnl180dPct}
          />
        ),
        sortType: (a, b) =>
          sortBigNumbers(
            a.values.sixMonths.pnl180dPct,
            b.values.sixMonths.pnl180dPct,
          ),
      },
      {
        Header: t('tableHeader.all.title'),
        accessor: 'all',
        headerWithFooter: (
          <div>
            <div>{t('tableHeader.all.subtitle')}</div>
          </div>
        ),
        Cell: ({ cell: { value } }) => (
          <PercentageIndicator
            type={'default'}
            normalized
            value={value.pnlPctLc}
            label={formatDateFromDays(value.periodsLc)}
          />
        ),
        sortType: (a, b) =>
          sortBigNumbers(a.values.all.pnlPctLc, b.values.all.pnlPctLc),
      },
    ],
    [],
  );

  const bodyMapper = useCallback(
    (service: Investment): DashboardTableDataType => {
      const bigNumberInvestment = new BigNumber(service.invested);
      const bigNumberPending = new BigNumber(service.pending);
      const totalValue = bigNumberInvestment.plus(bigNumberPending);

      return {
        summary: {
          totalValue: totalValue.toFixed(),
          profit: new BigNumber(service.pnlSumLc).toFixed(),
          service,
        },
        service,
        chart: {
          data: service.sparklines,
          last30Pnl: new BigNumber(service.pnl30dPct).toFixed(),
        },
        dailyAvg: {
          dailyAvgPnl: new BigNumber(service.pnlDailyMeanLc).toFixed(),
          currency: service.ssc,
        },
        threeMonths: {
          pnl90dPct: new BigNumber(service.pnl90dPct).toFixed(),
          currency: service.ssc,
        },
        sixMonths: {
          pnl180dPct: new BigNumber(service.pnl180dPct).toFixed(),
          currency: service.ssc,
        },
        all: {
          pnlPctLc: new BigNumber(service.pnlPctLc).toFixed(),
          periodsLc: service.periodsLc,
        },
      };
    },
    [],
  );

  return (
    <Layout>
      <Heading>
        <Typography variant='h1' color={'neutral000'}>
          {t('title')}
        </Typography>
      </Heading>
      <LayoutContentWrapper
        endpoint={investmentsEndpoint}
        content={(services: Investment[]) => (
          <Table
            columns={tableColumns}
            data={services?.map(bodyMapper)}
            emptyMessage={t('table-search-emptyMessage')}
            hideOptionsButton={true}
            isUserTable={true}
          />
        )}
      />
    </Layout>
  );
};

export default MyDashboard;
