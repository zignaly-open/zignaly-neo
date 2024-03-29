import {
  createColumnHelper,
  ChangeIndicator,
  ZigTable,
  ZigTypography,
  ZigTablePriceLabel,
  ZigButton,
  getPrecisionForCoin,
  ZScore,
} from '@zignaly-open/ui';
import { ZigPlusIcon } from '@zignaly-open/ui/icons';
import React, { useEffect, useMemo } from 'react';
import { Heading, Layout, ZigTableWrapper } from './styles';
import { useTranslation } from 'react-i18next';
import { useInvestments } from '../../../../apis/investment/use';
import BigNumber from 'bignumber.js';
import { formatDateFromString } from './util';
import { Investment } from '../../../../apis/investment/types';
import { BalanceSummary } from '../BalanceSummary';
import { ServiceName } from '../ServiceName';
import LayoutContentWrapper from '../../../../components/LayoutContentWrapper';
import { useActiveExchange } from '../../../../apis/user/use';
import { useCoinBalances } from '../../../../apis/coin/use';
import { useZModal, useZRouteModal } from '../../../../components/ZModal/use';
import { getColorForNumber } from '../../../../util/numbers';
import InvestingLayout from '../InvestingSteps/InvestingLayout';
import {
  ROUTE_DASHBOARD_EDIT_INVESTMENT,
  ROUTE_TRADING_SERVICE,
} from '../../../../routes';
import { useOpenDepositModal } from '../ManageInvestmentModals/DepositModal';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import ZigChartMiniSuspensed from '../../../../components/ZigChartMiniSuspensed';
import { generatePath, Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { MobilePortfolioAction } from './MobilePortfolioAction';
import { useMarketplaceMobileActiveRow } from '../../../../apis/marketplace/use';
import { Features } from 'whitelabel/type';
import { isFeatureOn } from 'whitelabel';
import ZScoreModal from 'views/TraderService/components/ZScoreModal';

const MyDashboard: React.FC = () => {
  const { t } = useTranslation(['my-dashboard', 'table']);
  const theme = useTheme();
  const exchange = useActiveExchange();
  const openDepositModal = useOpenDepositModal();
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
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const xl = useMediaQuery(theme.breakpoints.up('xl'));
  const [activeRow, setActiveRow] = useMarketplaceMobileActiveRow();
  useEffect(() => () => setActiveRow(null), []);
  // const isZScoreOn = isFeatureOn(Features.ZScore);
  const isZScoreOn = false;
  const { showModal } = useZModal();

  const columnHelper = createColumnHelper<Investment>();
  const columns = useMemo(
    () => [
      columnHelper.accessor(
        (row) =>
          new BigNumber(row.invested)
            .plus(new BigNumber(row.pending))
            .toNumber(),
        {
          header: t(
            sm
              ? 'tableHeader.summary.title'
              : 'tableHeader.summary.title-mobile',
          ),
          id: 'invested',
          meta: {
            subtitle: t(
              sm
                ? 'tableHeader.summary.subtitle'
                : 'tableHeader.summary.subtitle-mobile',
            ),
          },
          cell: ({ getValue, row: { original } }) => {
            return (
              <BalanceSummary
                prefixId={'portfolio-table'}
                serviceId={original.serviceId.toString()}
                totalValue={getValue().toString()}
                coin={original.ssc}
                profit={new BigNumber(original.pnlSumLc).toFixed()}
                onClickEdit={
                  sm ? () => onClickEditInvestment(original) : undefined
                }
              />
            );
          },
          enableHiding: false,
        },
      ),
      columnHelper.accessor('serviceName', {
        style: {
          justifyContent: 'flex-start',
          marginLeft: sm ? '83px' : '20px',
          textAlign: 'left',
        },
        header: t(
          sm
            ? 'tableHeader.serviceName.title'
            : 'tableHeader.serviceName.title-mobile',
        ),
        meta: sm && {
          subtitle: t('tableHeader.serviceName.subtitle'),
        },
        cell: ({ row: { original } }) => (
          <Box paddingLeft={'4px'}>
            <ServiceName
              activeLink={sm}
              truncateServiceName={!lg}
              size={lg ? 'x-large' : 'large'}
              prefixId={'portfolio-table'}
              service={original}
              showCoin={sm}
              showOwner={lg}
            />
          </Box>
        ),
      }),
      columnHelper.accessor((row) => +row.pnl30dPct, {
        header: t('tableHeader.1-mo.title'),
        id: 'pnl30dPct',
        cell: ({ row: { original } }) => (
          <Box
            minHeight={sm ? '125px' : '93px'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
          >
            {original.pnl30dPct ||
            Object.keys(original.sparklines).length > 1 ? (
              <Box sx={!sm && { transform: 'scale(0.7)' }}>
                <ZigChartMiniSuspensed
                  id={`portfolio-table__chart-${original.serviceId}`}
                  midLine
                  data={[0, ...(original.sparklines as number[])]}
                  precision={getPrecisionForCoin(original.ssc)}
                />
                {sm && (
                  <ChangeIndicator
                    id={`portfolio-table__chart-percentage-${original.serviceId}`}
                    normalized
                    value={new BigNumber(original.pnl30dPct).toFixed()}
                    type='graph'
                  />
                )}
              </Box>
            ) : (
              <ZigTypography
                variant='body2'
                color='neutral400'
                sx={!md && { whiteSpace: 'normal' }}
              >
                {t('tableHeader.1-mo.no-data')}
              </ZigTypography>
            )}
          </Box>
        ),
        sortingFn: 'auto',
        enableHiding: false,
      }),
      ...(!sm
        ? [
            columnHelper.display({
              header: '',
              id: 'action',
              cell: (props) => (
                <MobilePortfolioAction
                  serviceId={props.row.original.serviceId}
                  rowId={props.row.id}
                />
              ),
            }),
          ]
        : []),
      ...(lg
        ? [
            columnHelper.accessor((row) => +row.pnlDailyMeanLc, {
              header: t('tableHeader.dailyAvg-title'),
              cell: ({ getValue, row: { original } }) => (
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <ZigTablePriceLabel
                    id={`portfolio-table__dailyAvg-${original.serviceId}`}
                    coin={original.ssc}
                    value={new BigNumber(getValue()).toFixed()}
                    color={getColorForNumber(getValue())}
                  />
                </Box>
              ),
            }),
          ]
        : []),
      ...(md
        ? [
            ...(xl || !isFeatureOn(Features.ZScore)
              ? [
                  columnHelper.accessor((row) => +row.pnl90dPct, {
                    header: t('tableHeader.3-mos-title'),
                    id: 'pnl90dPct',
                    cell: ({ getValue, row: { original } }) => (
                      <ChangeIndicator
                        id={`portfolio-table__pnl90dPct-${original.serviceId}`}
                        normalized
                        type='default'
                        value={new BigNumber(getValue()).toFixed()}
                      />
                    ),
                    sortingFn: 'auto',
                  }),
                ]
              : []),
            columnHelper.accessor((row) => +row.pnl180dPct, {
              header: t('tableHeader.6-mos-title'),
              id: 'pnl180dPct',
              cell: ({ getValue, row: { original } }) => (
                <ChangeIndicator
                  id={`portfolio-table__pnl180dPct-${original.serviceId}`}
                  normalized
                  type='default'
                  value={new BigNumber(getValue()).toFixed()}
                />
              ),
              sortingFn: 'auto',
            }),
          ]
        : []),

      ...(sm
        ? [
            columnHelper.accessor((row) => +row.pnlPctLc, {
              header: t('tableHeader.all.title'),
              id: 'pnlPctLc',
              meta: { subtitle: t('tableHeader.all.subtitle') },
              cell: ({ getValue, row: { original } }) => {
                return (
                  <ChangeIndicator
                    id={`portfolio-table__pnlPctLc-${original.serviceId}`}
                    type='default'
                    normalized
                    value={getValue()}
                    label={formatDateFromString(original.createdAt)}
                    tooltip={t('tooltip-date', {
                      date: new Date(original.createdAt).toLocaleDateString(),
                    })}
                  />
                );
              },
              sortingFn: 'auto',
            }),
            ...(isZScoreOn && md
              ? [
                  columnHelper.accessor((row) => row.zscore, {
                    id: 'zscore',
                    header: t('tableHeader.zscore'),
                    cell: ({ getValue, row: { original } }) => (
                      <Box id={`portfolio-table__zscore-${original.serviceId}`}>
                        <ZScore
                          value={getValue()}
                          mini={!lg}
                          onClick={() =>
                            showModal(ZScoreModal, {
                              serviceId: original.serviceId,
                            })
                          }
                        />
                      </Box>
                    ),
                  }),
                ]
              : []),
            columnHelper.display({
              id: 'link',
              cell: ({ row }) => (
                <Box
                  component={Link}
                  to={generatePath(ROUTE_TRADING_SERVICE, {
                    serviceId: row?.original?.serviceId?.toString(),
                  })}
                  sx={{
                    width: 1,
                    cursor: 'pointer',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    display: 'flex',
                  }}
                  id={`portfolio-table__link-${row.original.serviceId}`}
                >
                  <ArrowForwardIosIcon
                    sx={{
                      color: theme.palette.links,
                      width: '20px',
                      height: '20px',
                    }}
                  />
                </Box>
              ),
            }),
          ]
        : []),
    ],
    [t, sm, md, lg],
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
                    startIcon={<ZigPlusIcon width={10} height={10} />}
                    sx={{ fontWeight: 600, mb: 1 }}
                    variant={'contained'}
                    onClick={() => openDepositModal()}
                  >
                    {t('action:deposit')}
                  </ZigButton>
                </Box>
              </Heading>
              <ZigTableWrapper>
                <ZigTable
                  onRowClick={
                    !sm
                      ? (id: string) => {
                          if (id !== activeRow) setActiveRow(id);
                        }
                      : undefined
                  }
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
                  columnVisibility={sm}
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
