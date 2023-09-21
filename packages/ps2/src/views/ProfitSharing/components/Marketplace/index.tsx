import React, { useMemo, useState } from 'react';
import { useMarketplace } from '../../../../apis/marketplace/use';
import { useTranslation } from 'react-i18next';
import {
  PageContainer,
  ChangeIndicator,
  ZigTypography,
  ZigTable,
  createColumnHelper,
  ZigTablePriceLabel,
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
// import TopServicesCards from '../TopServicesCards';

const Marketplace: React.FC = () => {
  const marketplaceEndpoint = useMarketplace();
  const { t } = useTranslation('marketplace');
  const theme = useTheme();
  const columnHelper = createColumnHelper<MarketplaceService>();
  const [showActionMobileRow, setShowActionMobileRow] = useState<string>('-1');
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const columns = useMemo(
    () =>
      md
        ? [
            columnHelper.accessor('name', {
              id: 'service-name',
              header: () => (
                <div id={'marketplace-table__header-service'}>
                  {t('table.service-name')}
                </div>
              ),
              style: {
                justifyContent: 'flex-start',
                paddingLeft: '88px',
              },
              meta: {
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
                  prefixId={`marketplace-table`}
                  service={
                    marketplaceServiceToInvestmentType(
                      props.row.original,
                    ) as Investment
                  }
                />
              ),
            }),
            columnHelper.accessor('investedUSDT', {
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
              sortingFn: 'alphanumeric',
            }),
            columnHelper.accessor((row) => Number(row.pnlPercent180t), {
              id: 'pnlPercent180t',
              header: t('table.n-months-pnl', { count: 6 }),
              cell: (props) => (
                <ChangeIndicator
                  id={`marketplace-table__pnl180t-${props.row.original.id}`}
                  style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                  }}
                  value={props.getValue()}
                />
              ),
            }),
            columnHelper.accessor((row) => Number(row.pnlPercent90t), {
              id: 'pnlPercent90t',
              header: t('table.n-months-pnl', { count: 3 }),
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
            columnHelper.accessor((row) => Number(row.pnlPercent30t), {
              id: 'pnlPercent30t',
              header: t('table.n-months-pnl', { count: 1 }),
              cell: (props) => (
                <>
                  {+props.getValue() ||
                  Object.keys(props.row.original.sparklines).length > 1 ? (
                    <>
                      <ZigChartMiniSuspensed
                        id={`marketplace-table__pnl30t-${props.row.original.id}-chart`}
                        midLine
                        data={[
                          0,
                          ...(props.row.original.sparklines as number[]),
                        ]}
                      />
                      <ChangeIndicator
                        value={props.getValue()}
                        type={'graph'}
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
            columnHelper.display({
              header: '',
              id: 'action',
              cell: (props) => (
                <MarketplaceAction service={props.row.original} />
              ),
            }),
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
        : [
            columnHelper.accessor('name', {
              id: 'service-name',
              header: () => (
                <div id={'marketplace-table__header-service'}>
                  {t('table.service-name-mobile')}
                </div>
              ),
              style: {
                justifyContent: 'flex-start',
              },
              cell: (props) => (
                <ServiceName
                  activeLink={false}
                  truncateServiceName
                  coinImageSize={'large'}
                  showCoin={false}
                  showOwner={false}
                  prefixId={`marketplace-table`}
                  service={
                    marketplaceServiceToInvestmentType(
                      props.row.original,
                    ) as Investment
                  }
                />
              ),
            }),
            columnHelper.accessor((row) => Number(row.pnlPercent90t), {
              id: 'pnlPercent90t',
              header: t('table.n-months-pnl-mobile', { count: 3 }),
              cell: (props) => (
                <ChangeIndicator
                  type={'default'}
                  id={`marketplace-table__pnl90t-${props.row.original.id}`}
                  style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                  }}
                  value={props.getValue()}
                />
              ),
            }),
            columnHelper.accessor((row) => Number(row.pnlPercent30t), {
              id: 'pnlPercent30t',
              header: t('table.n-month-pnl-mobile', { count: 1 }),
              cell: (props) => (
                <>
                  {+props.getValue() ||
                  Object.keys(props.row.original.sparklines).length > 1 ? (
                    <>
                      <ZigChartMiniSuspensed
                        id={`marketplace-table__pnl30t-${props.row.original.id}-chart`}
                        midLine
                        data={[
                          0,
                          ...(props.row.original.sparklines as number[]),
                        ]}
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
            columnHelper.accessor('invested', {
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
              sortingFn: 'alphanumeric',
            }),
            columnHelper.display({
              header: '',
              id: 'action',
              cell: (props) => (
                <MobileMarketplaceAction
                  service={props.row.original}
                  rowId={props.row.id}
                />
              ),
            }),
          ],
    [t, md],
  );

  return (
    <PageContainer>
      <LayoutContentWrapper
        endpoint={marketplaceEndpoint}
        content={(services: MarketplaceService[]) => (
          <>
            <Box
              sx={{
                textAlign: 'center',
                mt: 4,
                mb: 4,
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
            {/* <TopServicesCards
              services={services
                ?.slice()
                .sort((a, b) => +b.pnlPercent90t - +a.pnlPercent90t)
                .slice(0, 3)}
            /> */}
            <TableWrapper>
              <ZigTable
                onRowClick={
                  !md
                    ? (id: string) => {
                        if (id !== activeRow) setActiveRow(id);
                      }
                    : undefined
                }
                prefixId={'marketplace'}
                initialState={{
                  sorting: [
                    {
                      id: md ? 'pnlPercent180t' : 'pnlPercent90t',
                      desc: true,
                    },
                  ],
                }}
                columns={columns}
                data={services}
                emptyMessage={t('table-search-emptyMessage')}
                columnVisibility={false}
                enableSortingRemoval={false}
              />
            </TableWrapper>
          </>
        )}
      />
    </PageContainer>
  );
};

export default Marketplace;
