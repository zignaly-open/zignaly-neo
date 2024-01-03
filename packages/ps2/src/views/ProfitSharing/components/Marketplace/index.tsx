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
  ZScore,
  ZigRisk,
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
import { TableId } from 'apis/settings/types';
import { usePersistTable } from 'apis/settings/use';
import MarketplaceFilters from '../MarketplaceFilters';
import {
  useFilteredServices,
  useReturnsPeriod,
  useServiceFilters,
} from '../MarketplaceFilters/use';
// import TopServicesCards from '../TopServicesCards';

const sx = {
  changeIndicator: {
    fontSize: '18px',
    lineHeight: '28px',
  },
};

const Marketplace = ({ services }: { services: MarketplaceService[] }) => {
  const { t } = useTranslation(['marketplace', 'table']);
  const theme = useTheme();
  const columnHelper = createColumnHelper<MarketplaceService>();
  const [activeRow, setActiveRow] = useMarketplaceMobileActiveRow();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const xl = useMediaQuery(theme.breakpoints.up('xl'));
  const [searchFilter, setSearchFilter] = useState('');
  const defaultFilters = useServiceFilters(services);
  const tablePersist = usePersistTable(TableId.Marketplace, defaultFilters);
  const filteredServices = useFilteredServices(
    services,
    tablePersist.filters,
    searchFilter,
  );
  const returnsPeriod = tablePersist.filters.find(
    (f) => f.id === 'pnlPeriod',
  )?.value;

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
            size={lg ? 'x-large' : sm ? 'large' : 'small'}
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
      ...(lg
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
                <Box id={`marketplace-table__assets-${props.row.original.id}`}>
                  <AssetsInPool
                    prefixId={'marketplace-table'}
                    serviceId={props.row.original.id}
                    assetsValue={props.getValue()}
                    numberOfInvestors={props.row.original.investors}
                    createdAt={props.row.original.createdAt}
                    shorten={!xl}
                  />
                </Box>
              ),
            }),
          ]
        : []),
      ...(xl || returnsPeriod === 'pnlPercent180t'
        ? [
            columnHelper.accessor((row) => Number(row.pnlPercent180t), {
              id: 'pnlPercent180t',
              header: t(
                md ? 'table.n-months-pnl' : 'table.n-months-pnl-mobile',
                {
                  count: 6,
                },
              ),
              cell: (props) => (
                <ChangeIndicator
                  decimalScale={xl ? undefined : 0}
                  type={'default'}
                  id={`marketplace-table__pnl180t-${props.row.original.id}`}
                  style={sx.changeIndicator}
                  value={props.getValue()}
                />
              ),
            }),
          ]
        : []),
      ...(xl || returnsPeriod === 'pnlPercent90t'
        ? [
            columnHelper.accessor((row) => Number(row.pnlPercent90t), {
              id: 'pnlPercent90t',
              header: t(
                md ? 'table.n-months-pnl' : 'table.n-months-pnl-mobile',
                {
                  count: 3,
                },
              ),
              cell: (props) => (
                <ChangeIndicator
                  decimalScale={xl ? undefined : 0}
                  type={'default'}
                  id={`marketplace-table__pnl90t-${props.row.original.id}`}
                  style={sx.changeIndicator}
                  value={props.getValue()}
                />
              ),
            }),
          ]
        : []),
      ...(lg || returnsPeriod === 'pnlPercent30t'
        ? [
            columnHelper.accessor((row) => Number(row.pnlPercent30t), {
              id: 'pnlPercent30t',
              header: t(
                md ? 'table.n-months-pnl' : 'table.n-months-pnl-mobile',
                {
                  count: 1,
                },
              ),
              cell: (props) => (
                <>
                  {+props.getValue() ||
                  Object.keys(props.row.original.sparklines).length > 1 ? (
                    <>
                      {lg && (
                        <ZigChartMiniSuspensed
                          id={`marketplace-table__pnl30t-${props.row.original.id}-chart`}
                          midLine
                          data={[
                            0,
                            ...(props.row.original.sparklines as number[]),
                          ]}
                        />
                      )}
                      <ChangeIndicator
                        value={props.getValue()}
                        style={lg ? null : sx.changeIndicator}
                        type={lg ? 'graph' : 'default'}
                        decimalScale={xl ? undefined : 0}
                        id={`marketplace-table__pnl30t-${props.row.original.id}-percent`}
                      />
                    </>
                  ) : (
                    <ZigTypography variant='body2' color='neutral400'>
                      {t('tableHeader.1-mo.no-data')}
                    </ZigTypography>
                  )}
                </>
              ),
            }),
          ]
        : []),
      ...(!lg && sm
        ? [
            columnHelper.accessor((row) => +row.invested, {
              id: 'investedUSDT',
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
      columnHelper.accessor((row) => row.zscore, {
        id: 'zscore',
        header: () => (
          <div id={'marketplace-table__header-zscore'}>{t('table.zscore')}</div>
        ),
        cell: (props) => (
          <Box id={`marketplace-table__zscore-${props.row.original.id}`}>
            <ZScore value={props.getValue()} mini={!sm} />
          </Box>
        ),
      }),
      columnHelper.accessor((row) => row.zrisk, {
        id: 'zrisk',
        header: () => (
          <div id={'marketplace-table__header-zrisk'}>{t('table.risk')}</div>
        ),
        cell: (props) => (
          <Box id={`marketplace-table__zrisk-${props.row.original.id}`}>
            <ZigRisk value={props.getValue()} />
          </Box>
        ),
      }),
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
    [t, sm, md, lg, xl, returnsPeriod],
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
      <MarketplaceFilters
        resultsCount={filteredServices?.length}
        filters={tablePersist.filters}
        defaultFilters={defaultFilters}
        onFiltersChange={tablePersist.filterTable}
        onSearchChange={setSearchFilter}
        searchFilter={searchFilter}
      />
      {/* <TopServicesCards
              services={services
                ?.slice()
                .sort((a, b) => +b.pnlPercent90t - +a.pnlPercent90t)
                .slice(0, 3)}
              /> */}
      {filteredServices && (
        <TableWrapper>
          <ZigTable
            onRowClick={
              !md
                ? (id: string) => {
                    if (id !== activeRow) setActiveRow(id);
                  }
                : undefined
            }
            prefixId={TableId.Marketplace}
            columns={columns}
            data={filteredServices}
            emptyMessage={t('table-search-empty-message')}
            columnVisibility={false}
            enableSortingRemoval={false}
            initialState={{
              sorting: [
                {
                  id: 'zscore',
                  desc: true,
                },
              ],
            }}
            sorting={tablePersist.sorting}
            onSortingChange={tablePersist.sortTable}
          />
        </TableWrapper>
      )}
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
