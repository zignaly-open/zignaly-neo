import {
  AreaChart,
  Loader,
  PercentageIndicator,
  PriceLabel,
  ServiceName,
  Table,
  Typography,
} from '@zignaly-open/ui';
import React, { useCallback, useMemo } from 'react';
import { Center, Heading, Inline, Layout } from './styles';
import { useTranslation } from 'react-i18next';
import { useCoins, useInvestments, useSetSelectedInvestment } from '../../use';
import BigNumber from 'bignumber.js';
import { formatDateFromDays } from './util';
import { Investment } from '../../types';
import { sortBigNumbers, stringSort } from '../../../../util/numbers';
import { coinsToOperateServices } from 'util/coins';
import { getServiceLogo } from '../../../../util/images';
import { BalanceSummary } from '../BalanceSummary';
import { ShowFnOutput, useModal } from 'mui-modal-provider';
import EditInvestmentModal from '../EditInvestmentModal';
import { TableProps } from '@zignaly-open/ui/lib/components/display/Table/types';
import { DashboardTableDataType } from './types';

const MyDashboard: React.FC = () => {
  const { t } = useTranslation(['my-dashboard', 'table']);
  const { isLoading, data: services, error } = useInvestments();
  const selectInvestment = useSetSelectedInvestment();
  useCoins();
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
        Header: t('my-dashboard.tableHeader.summary.title'),
        accessor: 'summary',
        headerWithFooter: (
          <div>
            <div>{t('my-dashboard.tableHeader.summary.subtitle')}</div>
          </div>
        ),
        Cell: ({ cell: { value } }) => (
          <BalanceSummary
            stableCoinOperative={coinsToOperateServices.stableCoins.includes(
              value.service.ssc,
            )}
            totalValue={value.totalValue}
            symbol={value.service.ssc}
            profit={value.profit}
            onClickEdit={() => onClickEditInvestment(value.service)}
          />
        ),
        sortType: (
          a: { values: DashboardTableDataType },
          b: { values: DashboardTableDataType },
        ) =>
          sortBigNumbers(
            a.values.summary.totalValue,
            b.values.summary.totalValue,
          ),
      },
      {
        Header: () => (
          <Inline>{t('my-dashboard.tableHeader.serviceName.title')}</Inline>
        ),
        accessor: 'service',
        headerWithFooter: (
          <Inline>{t('my-dashboard.tableHeader.serviceName.subtitle')}</Inline>
        ),
        Cell: ({ cell: { value } }) => (
          <ServiceName
            heading={value.serviceName}
            subtitle={
              <>
                {t('table:table.serviceName-by')} {value.ownerName}
              </>
            }
            cryptoName={value.ssc}
            image={getServiceLogo(value.serviceLogo)}
          />
        ),
        sortType: (
          a: { values: DashboardTableDataType },
          b: { values: DashboardTableDataType },
        ) =>
          stringSort(
            a.values.service.serviceName,
            b.values.service.serviceName,
          ),
      },
      {
        Header: t('my-dashboard.tableHeader.1-mo.title'),
        accessor: 'chart',
        Cell: ({ cell: { value } }) =>
          parseFloat(value.last30Pnl) || Object.keys(value.data).length > 1 ? (
            <>
              <AreaChart variant='small' data={value.data} />
              <PercentageIndicator value={value.last30Pnl} type={'graph'} />
            </>
          ) : (
            <Typography variant={'body2'} color={'neutral400'}>
              {t('my-dashboard.tableHeader.1-mo.no-data')}
            </Typography>
          ),
      },
      {
        Header: t('my-dashboard.tableHeader.dailyAvg-title'),
        accessor: 'dailyAvg',
        Cell: ({ cell: { value } }) => (
          <PriceLabel
            green
            coin={value.currency}
            value={value.dailyAvgPnl}
            stableCoinOperative={coinsToOperateServices.stableCoins.includes(
              value.currency,
            )}
          />
        ),
        sortType: (
          a: { values: DashboardTableDataType },
          b: { values: DashboardTableDataType },
        ) =>
          sortBigNumbers(
            a.values.dailyAvg.dailyAvgPnl,
            b.values.dailyAvg.dailyAvgPnl,
          ),
      },
      {
        Header: t('my-dashboard.tableHeader.3-mos-title'),
        accessor: 'threeMonths',
        Cell: ({ cell: { value } }) => (
          <PercentageIndicator
            type='default'
            value={value.pnl90dPct}
            stableCoinOperative={coinsToOperateServices.stableCoins.includes(
              value.currency,
            )}
          />
        ),
        sortType: (
          a: { values: DashboardTableDataType },
          b: { values: DashboardTableDataType },
        ) =>
          sortBigNumbers(
            a.values.threeMonths.pnl90dPct,
            b.values.threeMonths.pnl90dPct,
          ),
      },
      {
        Header: t('my-dashboard.tableHeader.6-mos-title'),
        accessor: 'sixMonths',
        Cell: ({ cell: { value } }) => (
          <PercentageIndicator
            type='default'
            value={value.pnl180dPct}
            stableCoinOperative={coinsToOperateServices.stableCoins.includes(
              value.currency,
            )}
          />
        ),
        sortType: (
          a: { values: DashboardTableDataType },
          b: { values: DashboardTableDataType },
        ) =>
          sortBigNumbers(
            a.values.sixMonths.pnl180dPct,
            b.values.sixMonths.pnl180dPct,
          ),
      },
      {
        Header: t('my-dashboard.tableHeader.all.title'),
        accessor: 'all',
        headerWithFooter: (
          <div>
            <div>{t('my-dashboard.tableHeader.all.subtitle')}</div>
          </div>
        ),
        Cell: ({ cell: { value } }) => (
          <PercentageIndicator
            type={'default'}
            value={value.pnlPctLc}
            label={formatDateFromDays(value.periodsLc)}
          />
        ),
        sortType: (
          a: { values: DashboardTableDataType },
          b: { values: DashboardTableDataType },
        ) => sortBigNumbers(a.values.all.pnlPctLc, b.values.all.pnlPctLc),
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
          {t('my-dashboard.title')}
        </Typography>
      </Heading>
      {isLoading && !services ? (
        <Center>
          <Loader
            color={'#fff'}
            width={'40px'}
            height={'40px'}
            ariaLabel={t('my-dashboard.loading-arialLabel')}
          />
        </Center>
      ) : (
        <Table
          columns={tableColumns}
          data={services?.map(bodyMapper)}
          emptyMessage={
            !error
              ? t('my-dashboard.table-search-emptyMessage')
              : t('my-dashboard.something-went-wrong')
          }
          hideOptionsButton={true}
          isUserTable={true}
        />
      )}
    </Layout>
  );
};

export default MyDashboard;
