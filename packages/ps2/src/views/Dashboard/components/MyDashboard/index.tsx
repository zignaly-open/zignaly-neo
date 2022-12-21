import {
  PercentageIndicator,
  PriceLabel,
  ZigChartMini,
  createColumnHelper,
  ZigTable,
  ZigTypography,
} from '@zignaly-open/ui';
import React, { useMemo } from 'react';
import { Heading, Layout, ZigTableWrapper } from './styles';
import { useTranslation } from 'react-i18next';
import {
  useInvestments,
  useSetSelectedInvestment,
} from '../../../../apis/investment/use';
import BigNumber from 'bignumber.js';
import { formatDateFromDays } from './util';
import { Investment } from '../../../../apis/investment/types';
import { BalanceSummary } from '../BalanceSummary';
import EditInvestmentModal from '../ManageInvestmentModals/EditInvestmentModal';
import { ServiceName } from '../ServiceName';
import LayoutContentWrapper from '../../../../components/LayoutContentWrapper';
import { useActiveExchange } from '../../../../apis/user/use';
import { useCoinBalances } from '../../../../apis/coin/use';
import { useZModal } from '../../../../components/ZModal/use';

const MyDashboard: React.FC = () => {
  const { t } = useTranslation(['my-dashboard', 'table']);
  const exchange = useActiveExchange();
  const investmentsEndpoint = useInvestments(exchange?.internalId, {
    skip: !exchange?.internalId,
  });
  const selectInvestment = useSetSelectedInvestment();
  // we do not use the results of this till before the modal
  useCoinBalances();
  const { showModal } = useZModal();

  const onClickEditInvestment = (service: Investment) => {
    selectInvestment(service);
    showModal(EditInvestmentModal, {
      ctaId: 'edit-investment-dashboard',
    });
  };

  const columnHelper = createColumnHelper<Investment>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('invested', {
        header: t('tableHeader.summary.title'),
        meta: { subtitle: t('tableHeader.summary.subtitle') },
        cell: ({ row: { original } }) => {
          const bigNumberInvestment = new BigNumber(original.invested);
          const bigNumberPending = new BigNumber(original.pending);
          const totalValue = bigNumberInvestment.plus(bigNumberPending);
          return (
            <BalanceSummary
              totalValue={totalValue.toFixed()}
              coin={original.ssc}
              profit={new BigNumber(original.pnlSumLc).toFixed()}
              onClickEdit={() => onClickEditInvestment(original)}
            />
          );
        },
        enableHiding: false,
        sortingFn: 'alphanumeric',
      }),
      columnHelper.accessor('serviceName', {
        style: {
          justifyContent: 'flex-start',
          marginLeft: '83px',
          textAlign: 'left',
        },
        header: t('tableHeader.serviceName.title'),
        meta: {
          subtitle: t('tableHeader.serviceName.subtitle'),
        },
        cell: ({ row: { original } }) => <ServiceName service={original} />,
      }),
      columnHelper.accessor('pnl30dPct', {
        header: t('tableHeader.1-mo.title'),
        cell: ({ row: { original } }) =>
          original.pnl30dPct || Object.keys(original.sparklines).length > 1 ? (
            <>
              <ZigChartMini midLine data={original.sparklines} />
              <PercentageIndicator
                normalized
                value={new BigNumber(original.pnl30dPct).toFixed()}
                type='graph'
              />
            </>
          ) : (
            <ZigTypography variant='body2' color='neutral400'>
              {t('tableHeader.1-mo.no-data')}
            </ZigTypography>
          ),
        sortingFn: 'alphanumeric',
      }),
      columnHelper.accessor('pnlDailyMeanLc', {
        header: t('tableHeader.dailyAvg-title'),
        cell: ({ getValue, row: { original } }) => (
          <PriceLabel
            green={new BigNumber(getValue()).gt(0)}
            red={new BigNumber(getValue()).lt(0)}
            coin={original.ssc}
            value={new BigNumber(getValue()).toFixed()}
          />
        ),
        sortingFn: 'alphanumeric',
      }),
      columnHelper.accessor('pnl90dPct', {
        header: t('tableHeader.3-mos-title'),
        cell: ({ getValue }) => (
          <PercentageIndicator
            normalized
            type='default'
            value={new BigNumber(getValue()).toFixed()}
          />
        ),
        sortingFn: 'alphanumeric',
      }),
      columnHelper.accessor('pnl180dPct', {
        header: t('tableHeader.6-mos-title'),
        cell: ({ getValue }) => (
          <PercentageIndicator
            normalized
            type='default'
            value={new BigNumber(getValue()).toFixed()}
          />
        ),
        sortingFn: 'alphanumeric',
      }),
      columnHelper.accessor('pnlPctLc', {
        header: t('tableHeader.all.title'),
        meta: { subtitle: t('tableHeader.all.subtitle') },
        cell: ({ getValue, row: { original } }) => (
          <PercentageIndicator
            type='default'
            normalized
            value={getValue()}
            label={formatDateFromDays(original.periodsLc)}
          />
        ),
        sortingFn: 'alphanumeric',
      }),
    ],
    [t],
  );

  return (
    <Layout>
      <Heading>
        <ZigTypography variant='h1'>{t('title')}</ZigTypography>
      </Heading>
      <LayoutContentWrapper
        endpoint={investmentsEndpoint}
        content={(services: Investment[]) => (
          <ZigTableWrapper>
            <ZigTable
              columns={columns}
              data={services}
              emptyMessage={t('table-search-emptyMessage')}
              columnVisibility
            />
          </ZigTableWrapper>
        )}
      />
    </Layout>
  );
};

export default MyDashboard;
