import {
  createColumnHelper,
  ChangeIndicator,
  ZigTable,
  ZigTypography,
  ZigChartMini,
  ZigTablePriceLabel,
  ZigButton,
  ZigPlusIcon,
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
import { getColorForNumber } from '../../../../util/numbers';
import InvestingLayout from '../InvestingSteps/InvestingLayout';
import { ROUTE_DASHBOARD_EDIT_INVESTMENT } from '../../../../routes';
import DepositModal from '../ManageInvestmentModals/DepositModal';
import { Box } from '@mui/material';

const MyDashboard: React.FC = () => {
  const { t } = useTranslation(['my-dashboard', 'table']);
  const { showModal } = useZModal();
  const exchange = useActiveExchange();
  const investmentsEndpoint = useInvestments(exchange?.internalId, {
    skip: !exchange?.internalId,
    // Force refresh on mount otherwise it will use cached value from balance button
    refetchOnMountOrArgChange: true,
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
      columnHelper.accessor(
        (row) =>
          new BigNumber(row.invested)
            .plus(new BigNumber(row.pending))
            .toNumber(),
        {
          header: t('tableHeader.summary.title'),
          id: 'invested',
          meta: { subtitle: t('tableHeader.summary.subtitle') },
          cell: ({ getValue, row: { original } }) => {
            return (
              <BalanceSummary
                prefixId={'portfolio-table'}
                serviceId={original.serviceId.toString()}
                totalValue={getValue().toString()}
                coin={original.ssc}
                profit={new BigNumber(original.pnlSumLc).toFixed()}
                onClickEdit={() => onClickEditInvestment(original)}
              />
            );
          },
          enableHiding: false,
        },
      ),
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
        cell: ({ row: { original } }) => (
          <ServiceName prefixId={'portfolio-table'} service={original} />
        ),
      }),
      columnHelper.accessor('pnl30dPct', {
        header: t('tableHeader.1-mo.title'),
        cell: ({ row: { original } }) => (
          <Box
            minHeight={'125px'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
          >
            {original.pnl30dPct ||
            Object.keys(original.sparklines).length > 1 ? (
              <>
                <ZigChartMini
                  id={`portfolio-table__chart-${original.serviceId}`}
                  midLine
                  data={[0, ...(original.sparklines as number[])]}
                />
                <ChangeIndicator
                  id={`portfolio-table__chart-percentage-${original.serviceId}`}
                  normalized
                  value={new BigNumber(original.pnl30dPct).toFixed()}
                  type='graph'
                />
              </>
            ) : (
              <ZigTypography variant='body2' color='neutral400'>
                {t('tableHeader.1-mo.no-data')}
              </ZigTypography>
            )}
          </Box>
        ),
        sortingFn: 'alphanumeric',
        enableHiding: false,
      }),
      columnHelper.accessor('pnlDailyMeanLc', {
        header: t('tableHeader.dailyAvg-title'),
        cell: ({ getValue, row: { original } }) => (
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <ZigTablePriceLabel
              id={`portfolio-table__dailyAvg-${original.serviceId}`}
              coin={original.ssc}
              value={new BigNumber(getValue()).toFixed()}
              color={getColorForNumber(getValue())}
            />
          </Box>
        ),
        sortingFn: 'alphanumeric',
      }),
      columnHelper.accessor('pnl90dPct', {
        header: t('tableHeader.3-mos-title'),
        cell: ({ getValue, row: { original } }) => (
          <ChangeIndicator
            id={`portfolio-table__pnl90dPct-${original.serviceId}`}
            normalized
            type='default'
            value={new BigNumber(getValue()).toFixed()}
          />
        ),
        sortingFn: 'alphanumeric',
      }),
      columnHelper.accessor('pnl180dPct', {
        header: t('tableHeader.6-mos-title'),
        cell: ({ getValue, row: { original } }) => (
          <ChangeIndicator
            id={`portfolio-table__pnl180dPct-${original.serviceId}`}
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
          <ChangeIndicator
            id={`portfolio-table__pnlPctLc-${original.serviceId}`}
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
                <ZigTypography
                  variant='h1'
                  align={'center'}
                  sx={{ flex: 1 }}
                  id={'my-portfolio__title'}
                >
                  {t('title')}
                </ZigTypography>
                <Box sx={{ flex: '0 0 100px' }}>
                  <ZigButton
                    id={'my-portfolio__deposit'}
                    startIcon={<ZigPlusIcon />}
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
                  prefixId={'portfolio'}
                  initialState={{
                    sorting: [
                      {
                        id: 'invested',
                        desc: true,
                      },
                    ],
                  }}
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
