import React, { useEffect, useMemo, useState } from 'react';
import {
  useMarketplaceMobileActiveRow,
  useMarketplace,
} from '../../../../apis/marketplace/use';
import { useTranslation } from 'react-i18next';
import {
  PageContainer,
  ChangeIndicator,
  ZigTypography,
  ZigTable,
  createColumnHelper,
  ZigTablePriceLabel,
  filterFns as zigFilterFns,
  ZigFilters,
} from '@zignaly-open/ui';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import LayoutContentWrapper from '../../../../components/LayoutContentWrapper';
import { MarketplaceService } from '../../../../apis/marketplace/types';
import { Investment } from '../../../../apis/investment/types';
import { ServiceName } from '../../../Dashboard/components/ServiceName';
import { marketplaceServiceToInvestmentType } from '../../../../apis/marketplace/util';
import AssetsInPool from '../../../../components/AssetsInPool';
import MarketplaceAction, {
  MobileMarketplaceAction,
} from '../MarketplaceAction';
import { TableWrapper } from './styles';
import ZigChartMiniSuspensed from '../../../../components/ZigChartMiniSuspensed';
import { generatePath, Link } from 'react-router-dom';
import { ROUTE_TRADING_SERVICE } from '../../../../routes';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { usePersistTable } from 'util/hooks/usePersistTable';
import { TableId } from 'apis/settings/types';
import { ZigFiltersType } from '@zignaly-open/ui';
import { filterFns } from '@tanstack/react-table';
// import TopServicesCards from '../TopServicesCards';

const Marketplace = ({ services }: { services: MarketplaceService[] }) => {
  const { t } = useTranslation('marketplace');

  const coins = ['USDT', 'USDC', 'BNB', 'ETH', 'BTC'];

  const defaultFilters: ZigFiltersType = [
    {
      type: 'slider',
      value: [null, null],
      label: t('filters.returns-months', { count: 6 }),
      allowNoMin: true,
      allowNoMax: true,
      min: 0,
      max: 100,
      id: 'returns',
      showInBar: true,
    },
    {
      type: 'select',
      value: null,
      label: t('filters.coin'),
      options: [
        { value: null, label: t('filters.all') },
        ...coins.map((coin) => ({ value: coin, label: coin })),
      ],
      id: 'coin',
      showInBar: true,
    },
    {
      type: 'checkbox',
      label: t('filters.type'),
      options: [
        { value: 'spot', label: t('filters.spot') },
        { value: 'futures', label: t('filters.futures') },
      ],
      value: ['spot', 'futures'],
      id: 'type',
    },
    {
      type: 'slider',
      value: [0, 100],
      label: t('filters.fee'),
      min: 0,
      max: 100,
      id: 'fee',
    },
  ];
  const theme = useTheme();
  const [searchFilter, setSearchFilter] = useState('');
  const tablePersist = usePersistTable(TableId.Marketplace, defaultFilters);

  // Filtering manually instead of via react-table/ZigTable allows having access to the filtered services
  // to display results count.
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      return (
        tablePersist.filters &&
        tablePersist.filters.every((filter) => {
          if (filter.id === 'returns') {
            return zigFilterFns.inNumberRange(
              +service.pnlPercent180t,
              filter.value as [number, number],
            );
          } else if (filter.id === 'coin') {
            return !filter.value || service.ssc === filter.value;
          } else if (filter.id === 'type') {
            const serviceType = service.type.split('_')[1];
            return (filter.value as string[]).includes(serviceType);
          } else if (filter.id === 'fee') {
            return zigFilterFns.inNumberRange(
              service.successFee,
              filter.value as [number, number],
            );
          }
          return true;
        })
      );
    });
  }, [services, tablePersist.filters]);

  const columnHelper = createColumnHelper<MarketplaceService>();
  const [activeRow, setActiveRow] = useMarketplaceMobileActiveRow();
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  useEffect(() => () => setActiveRow(null), []);
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        id: 'service-name',
        header: () => (
          <div id={'marketplace-table__header-service'}>
            {t(md ? 'table.service-name' : 'table.service-name-mobile')}
          </div>
        ),
        style: {
          justifyContent: 'flex-start',
          paddingLeft: md && '88px',
        },
        meta: md && {
          subtitle: (
            <>
              <Box
                textAlign={'left'}
                id={'marketplace-table__header-service-manager'}
              >
                {t('table.manager')}
              </Box>
              <Box
                textAlign={'left'}
                id={'marketplace-table__header-service-currency'}
              >
                {t('table.currency')}
              </Box>
            </>
          ),
        },
        cell: (props) => (
          <ServiceName
            activeLink={md}
            truncateServiceName={!lg}
            size={lg ? 'x-large' : 'large'}
            showCoin={md}
            showOwner={lg}
            prefixId={`marketplace-table`}
            service={
              marketplaceServiceToInvestmentType(
                props.row.original,
              ) as Investment
            }
          />
        ),
      }),
      ...(md
        ? [
            columnHelper.accessor((row) => row.investedUSDT, {
              id: 'investedUSDT',
              header: () => (
                <div id={'marketplace-table__header-assets'}>
                  {t('table.assets')}
                </div>
              ),
              meta: {
                subtitle: (
                  <>
                    <div id={'marketplace-table__header-assets-investors'}>
                      {t('table.nb-investors')}
                    </div>
                    <div id={'marketplace-table__header-assets-age'}>
                      {t('table.account-age')}
                    </div>
                  </>
                ),
              },
              cell: (props) => (
                <Box
                  minWidth={148}
                  id={`marketplace-table__assets-${props.row.original.id}`}
                >
                  <AssetsInPool
                    prefixId={'marketplace-table'}
                    serviceId={props.row.original.id}
                    assetsValue={props.getValue()}
                    numberOfInvestors={props.row.original.investors}
                    createdAt={props.row.original.createdAt}
                  />
                </Box>
              ),
            }),
          ]
        : []),
      columnHelper.accessor((row) => Number(row.pnlPercent180t), {
        id: 'pnlPercent180t',
        header: t(md ? 'table.n-months-pnl' : 'table.n-months-pnl-mobile', {
          count: 6,
        }),
        cell: (props) => (
          <ChangeIndicator
            decimalScale={!md && 0}
            type={md ? 'graph' : 'default'}
            id={`marketplace-table__pnl180t-${props.row.original.id}`}
            style={{
              fontSize: '18px',
              lineHeight: '28px',
            }}
            value={props.getValue()}
          />
        ),
      }),
      ...(lg
        ? [
            columnHelper.accessor((row) => Number(row.pnlPercent90t), {
              id: 'pnlPercent90t',
              header: t('table.n-months-pnl', {
                count: 3,
              }),
              cell: (props) => (
                <ChangeIndicator
                  id={`marketplace-table__pnl90t-${props.row.original.id}`}
                  style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                  }}
                  value={props.getValue()}
                />
              ),
            }),
          ]
        : []),
      columnHelper.accessor((row) => Number(row.pnlPercent30t), {
        id: 'pnlPercent30t',
        header: t(md ? 'table.n-months-pnl' : 'table.n-month-pnl-mobile', {
          count: 1,
        }),
        cell: (props) => (
          <Box
            height={!md ? '90px' : 'unset'}
            minWidth={!md ? '60px' : 'unset'}
          >
            {+props.getValue() ||
            Object.keys(props.row.original.sparklines).length > 1 ? (
              <Box sx={!md && { transform: 'scale(0.9)' }}>
                <ZigChartMiniSuspensed
                  id={`marketplace-table__pnl30t-${props.row.original.id}-chart`}
                  midLine
                  data={[0, ...(props.row.original.sparklines as number[])]}
                />
                {md && (
                  <ChangeIndicator
                    value={props.getValue()}
                    type={'graph'}
                    id={`marketplace-table__pnl30t-${props.row.original.id}-percent`}
                  />
                )}
              </Box>
            ) : (
              <ZigTypography variant='body2' color='neutral400'>
                {t('tableHeader.1-mo.no-data')}
              </ZigTypography>
            )}
          </Box>
        ),
      }),
      ...(!md
        ? [
            columnHelper.accessor((row) => +row.invested, {
              id: 'invested',
              header: () => (
                <div id={'marketplace-table__header-assets'}>
                  {t('table.assets-mobile')}
                </div>
              ),
              cell: (props) => (
                <Box id={`marketplace-table__assets-${props.row.original.id}`}>
                  <ZigTablePriceLabel
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    shorten
                    value={props.getValue()}
                    coin={props.row.original.ssc}
                  />
                </Box>
              ),
            }),
          ]
        : []),
      columnHelper.display({
        header: '',
        id: 'action',
        cell: (props) =>
          md ? (
            <MarketplaceAction service={props.row.original} />
          ) : (
            <MobileMarketplaceAction
              service={props.row.original}
              rowId={props.row.id}
            />
          ),
      }),
      ...(lg
        ? [
            columnHelper.display({
              id: 'link',
              cell: ({ row }) => (
                <Box
                  component={Link}
                  to={generatePath(ROUTE_TRADING_SERVICE, {
                    serviceId: row?.original?.id?.toString(),
                  })}
                  sx={{
                    cursor: 'pointer',
                    alignItems: 'center',
                    flexDirection: 'row',
                    display: 'flex',
                    textAlign: 'start',
                    width: '10px',
                  }}
                  id={`marketplace-table__link-${row.original.id}`}
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
    [t, md, lg],
  );

  return (
    <>
      <Box
        sx={{
          textAlign: 'center',
          mt: 4,
          mb: '50px',
        }}
      >
        <ZigTypography variant={'h1'} id={'marketplace__title'}>
          {t('invest-in-services')}
        </ZigTypography>
        <ZigTypography
          variant={'body1'}
          id={'marketplace__description'}
          color='neutral300'
        >
          {t('invest-in-services-explainer')}
        </ZigTypography>
      </Box>
      <TableWrapper>
        <ZigFilters
          leftComponent={
            <ZigTypography variant='h2'>
              {t('n-profit-sharing-services', {
                count: filteredServices?.length,
              })}
            </ZigTypography>
          }
          filters={tablePersist.filters}
          defaultFilters={defaultFilters}
          onChange={tablePersist.filterTable}
          search={searchFilter}
          onSearchChange={setSearchFilter}
          sx={{ mb: '28px' }}
          label={t('investment-preferences')}
        />
        {/* <TopServicesCards
              services={services
                ?.slice()
                .sort((a, b) => +b.pnlPercent90t - +a.pnlPercent90t)
                .slice(0, 3)}
            /> */}
        <ZigTable
          onRowClick={
            !md
              ? (id: string) => {
                  if (id !== activeRow) setActiveRow(id);
                }
              : undefined
          }
          prefixId={TableId.Marketplace}
          initialState={{
            sorting: tablePersist.sorting ?? [
              {
                id: 'pnlPercent180t',
                desc: true,
              },
            ],
          }}
          columns={columns}
          data={filteredServices}
          emptyMessage={t('table-search-emptyMessage')}
          columnVisibility={false}
          enableSortingRemoval={false}
          state={{ globalFilter: searchFilter }}
          onSortingChange={tablePersist.sortTable}
          getColumnCanGlobalFilter={(column) =>
            ['service-name'].includes(column.id)
          }
          globalFilterFn={(row, columnId, filterValue, addMeta) => {
            return (
              filterFns.includesString(row, columnId, filterValue, addMeta) ||
              row.original.ownerName
                .toLowerCase()
                .includes(filterValue.toLowerCase())
            );
          }}
        />
      </TableWrapper>
    </>
  );
};

const MarketplaceContainer = () => {
  const marketplaceEndpoint = useMarketplace();
  return (
    <PageContainer>
      <LayoutContentWrapper
        endpoint={marketplaceEndpoint}
        content={(services: MarketplaceService[]) => (
          <Marketplace services={services} />
        )}
      />
    </PageContainer>
  );
};

export default MarketplaceContainer;
