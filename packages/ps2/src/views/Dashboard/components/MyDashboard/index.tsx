import {
  createColumnHelper,
  PercentageIndicator,
  PriceLabel,
  ZigTable,
  ZigTypography,
  ZigChartMini,
  ZigButton,
} from '@zignaly-open/ui';
import React, { useMemo } from 'react';
import { Heading, Layout, ZigTableWrapper } from './styles';
import { useTranslation } from 'react-i18next';
import { useInvestments } from '../../../../apis/investment/use';
import BigNumber from 'bignumber.js';
import { formatDateFromDays } from './util';
import { Investment } from '../../../../apis/investment/types';
import { BalanceSummary } from '../BalanceSummary';
import { ServiceName } from '../ServiceName';
import LayoutContentWrapper from '../../../../components/LayoutContentWrapper';
import { useActiveExchange } from '../../../../apis/user/use';
import { useCoinBalances } from '../../../../apis/coin/use';
import { useZModal, useZRouteModal } from '../../../../components/ZModal/use';
import { differenceInDays } from 'date-fns';
import InvestingLayout from '../InvestingSteps/InvestingLayout';
import { ROUTE_DASHBOARD_EDIT_INVESTMENT } from '../../../../routes';
import { Add } from '@mui/icons-material';
import DepositModal from '../ManageInvestmentModals/DepositModal';
import { Box } from '@mui/material';

const MyDashboard: React.FC = () => {
  const { t } = useTranslation(['my-dashboard', 'table']);
  const { showModal } = useZModal();
  const exchange = useActiveExchange();
  const investmentsEndpoint = useInvestments(exchange?.internalId, {
    skip: !exchange?.internalId,
  });
  useCoinBalances();
  const showEditInvestmentModal = useZRouteModal(
    ROUTE_DASHBOARD_EDIT_INVESTMENT,
  );

  const onClickEditInvestment = (service: Investment) =>
    showEditInvestmentModal({ serviceId: service.serviceId });
  const calculateServiceAge = (createdAt: string) =>
    differenceInDays(new Date(), new Date(createdAt)).toString();

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
              id={`portfolio-row__edit-${original.serviceId}`}
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
              <ZigChartMini
                midLine
                data={[0, ...(original.sparklines as number[])]}
              />
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
            label={formatDateFromDays(calculateServiceAge(original.createdAt))}
            labelTooltip={t('tooltip-date', {
              date: new Date(original.createdAt).toLocaleDateString(),
            })}
          />
        ),
        sortingFn: 'alphanumeric',
      }),
    ],
    [t],
  );

  return (
    <Layout>
      <LayoutContentWrapper
        unmountOnRefetch
        endpoint={investmentsEndpoint}
        content={(services: Investment[]) =>
          investmentsEndpoint?.currentData?.length ? (
            <>
              <Heading>
                <Box sx={{ flex: '0 0 100px' }} />
                <ZigTypography variant='h1' align={'center'} sx={{ flex: 1 }}>
                  {t('title')}
                </ZigTypography>
                <Box sx={{ flex: '0 0 100px' }}>
                  <ZigButton
                    id={'my-portfolio__deposit'}
                    startIcon={<Add />}
                    sx={{ fontWeight: 600, mb: 1 }}
                    variant={'contained'}
                    onClick={() =>
                      showModal(DepositModal, {
                        ctaId: 'account-menu-deposit',
                      })
                    }
                  >
                    {t('action:deposit')}
                  </ZigButton>
                </Box>
              </Heading>
              <ZigTableWrapper>
                <ZigTable
                  prefixId={'dashboard'}
                  columns={columns}
                  data={services}
                  emptyMessage={t('table-search-emptyMessage')}
                  columnVisibility
                />
              </ZigTableWrapper>
            </>
          ) : (
            <InvestingLayout />
          )
        }
      />
    </Layout>
  );
};

export default MyDashboard;
