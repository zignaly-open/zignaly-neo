import {
  AreaChart,
  BalanceSummary,
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
import { useTheme } from 'styled-components';
import { useInvestments } from '../../use';
import BigNumber from 'bignumber.js';
import { formatDateFromDays } from './util';
import { Investment } from '../../types';
import { sortBigNumbers, stringSort } from '../../../../util/numbers';
import { coinsToOperateServices } from 'util/coins';
import Theme from '@zignaly-open/ui/lib/theme/theme';

const MyDashboard: React.FC = () => {
  const { t } = useTranslation('my-dashboard');
  const theme = useTheme() as Theme;
  const { isLoading, data: services, error } = useInvestments();

  // @ts-ignore
  const onClickEditInvestment = (value) => alert();

  const tableColumns = useMemo(
    () => [
      {
        Header: t('my-dashboard.tableHeader.summary.title'),
        accessor: 'summary',
        headerWithFooter: (
          <div>
            <div>{t('my-dashboard.tableHeader.summary.subtitle')}</div>
          </div>
        ),
        Cell: ({
          cell: { value },
        }: {
          cell: {
            value: {
              totalValue: string;
              profit: string;
              service: Investment;
            };
          };
        }) => (
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
          a: { values: { summary: { totalValue: string } } },
          b: { values: { summary: { totalValue: string } } },
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
        accessor: 'serviceName',
        headerWithFooter: (
          <Inline>{t('my-dashboard.tableHeader.serviceName.subtitle')}</Inline>
        ),
        Cell: ({ cell: { value } }: any) => (
          <ServiceName
            name={value.name}
            owner={value.owner}
            currency={value.currency}
            image={value.image}
          />
        ),
        sortType: (
          a: { values: { serviceName: { name: string } } },
          b: { values: { serviceName: { name: string } } },
        ) => stringSort(a.values.serviceName.name, b.values.serviceName.name),
      },
      {
        Header: t('my-dashboard.tableHeader.1-mo.title'),
        accessor: 'chart',
        Cell: ({
          cell: { value },
        }: {
          cell: { value: { data: []; last30Pnl: string } };
        }) =>
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
        Cell: ({
          cell: { value },
        }: {
          cell: {
            value: { dailyAvgPnl: string; currency: string };
          };
        }) => (
          <PriceLabel
            textColor={theme.greenGraph}
            coin={value.currency}
            value={value.dailyAvgPnl}
            stableCoinOperative={coinsToOperateServices.stableCoins.includes(
              value.currency,
            )}
          />
        ),
        sortType: (
          a: { values: { dailyAvg: { dailyAvgPnl: string } } },
          b: { values: { dailyAvg: { dailyAvgPnl: string } } },
        ) =>
          sortBigNumbers(
            a.values.dailyAvg.dailyAvgPnl,
            b.values.dailyAvg.dailyAvgPnl,
          ),
      },
      {
        Header: t('my-dashboard.tableHeader.3-mos-title'),
        accessor: 'threeMonths',
        Cell: ({
          cell: { value },
        }: {
          cell: {
            value: { pnl90dPct: string; currency: string };
          };
        }) => (
          <PercentageIndicator
            type='default'
            value={value.pnl90dPct}
            stableCoinOperative={coinsToOperateServices.stableCoins.includes(
              value.currency,
            )}
          />
        ),
        sortType: (
          a: { values: { threeMonths: { pnl90dPct: string } } },
          b: { values: { threeMonths: { pnl90dPct: string } } },
        ) =>
          sortBigNumbers(
            a.values.threeMonths.pnl90dPct,
            b.values.threeMonths.pnl90dPct,
          ),
      },
      {
        Header: t('my-dashboard.tableHeader.6-mos-title'),
        accessor: 'sixMonths',
        Cell: ({
          cell: { value },
        }: {
          cell: {
            value: { pnl180dPct: string; currency: string };
          };
        }) => (
          <PercentageIndicator
            type='default'
            value={value.pnl180dPct}
            stableCoinOperative={coinsToOperateServices.stableCoins.includes(
              value.currency,
            )}
          />
        ),
        sortType: (
          a: { values: { sixMonths: { pnl180dPct: string } } },
          b: { values: { sixMonths: { pnl180dPct: string } } },
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
        Cell: ({
          cell: { value },
        }: {
          cell: {
            value: { pnlPctLc: string; connectedSince: string };
          };
        }) => (
          <PercentageIndicator
            type={'default'}
            value={value.pnlPctLc}
            label={value.connectedSince}
          />
        ),
        sortType: (
          a: { values: { all: { pnlPctLc: string } } },
          b: { values: { all: { pnlPctLc: string } } },
        ) => sortBigNumbers(a.values.all.pnlPctLc, b.values.all.pnlPctLc),
      },
    ],
    [],
  );

  const createUserTableBodyMemoized = useCallback((service: Investment) => {
    const bigNumberInvestment = new BigNumber(service.invested);
    const bigNumberPending = new BigNumber(service.pending);
    const totalValue = bigNumberInvestment.plus(bigNumberPending);

    return {
      summary: {
        totalValue: totalValue.toFixed(),
        profit: new BigNumber(service.pnlSumLc).toFixed(),
        service,
      },
      serviceName: {
        name: service.serviceName,
        owner: service.ownerName,
        currency: service.ssc,
        image: service.serviceLogo,
      },
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
        connectedSince: formatDateFromDays(service.periodsLc),
      },
    };
  }, []);

  console.error(error);

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
          data={services?.map(createUserTableBodyMemoized)}
          emptyMessage={
            error
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
