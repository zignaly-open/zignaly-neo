import React, { useMemo } from 'react';
import { useMarketplace } from '../../../../apis/marketplace/use';
import { useTranslation } from 'react-i18next';
import {
  PageContainer,
  PercentageIndicator,
  ZigTypography,
  ZigTable,
  createColumnHelper,
  ZigChartMini,
} from '@zignaly-open/ui';
import { Box } from '@mui/material';
import LayoutContentWrapper from '../../../../components/LayoutContentWrapper';
import { MarketplaceService } from '../../../../apis/marketplace/types';
import { Investment } from '../../../../apis/investment/types';
import { ServiceName } from '../../../Dashboard/components/ServiceName';
import { marketplaceServiceToInvestmentType } from '../../../../apis/marketplace/util';
import AssetsInPool from '../../../../components/AssetsInPool';
import MarketplaceAction from '../MarketplaceAction';
import { TableWrapper } from './styles';
// import TopServicesCards from '../TopServicesCards';

const Marketplace: React.FC = () => {
  const marketplaceEndpoint = useMarketplace();
  const { t } = useTranslation('marketplace');

  const columnHelper = createColumnHelper<MarketplaceService>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: t('table.service-name'),
        style: {
          justifyContent: 'flex-start',
          paddingLeft: '88px',
        },
        meta: {
          subtitle: (
            <>
              <Box textAlign={'left'}>{t('table.manager')}</Box>
              <Box textAlign={'left'}>{t('table.currency')}</Box>
            </>
          ),
        },
        cell: (props) => (
          <ServiceName
            service={
              marketplaceServiceToInvestmentType(
                props.row.original,
              ) as Investment
            }
          />
        ),
      }),
      columnHelper.accessor('investedUSDT', {
        header: t('table.assets'),
        meta: {
          subtitle: (
            <>
              <div>{t('table.nb-investors')}</div>
              <div>{t('table.account-age')}</div>
            </>
          ),
        },
        cell: (props) => (
          <Box minWidth={148}>
            <AssetsInPool
              assetsValue={props.getValue()}
              numberOfInvestors={props.row.original.investors}
              createdAt={props.row.original.createdAt}
            />
          </Box>
        ),
        sortingFn: 'alphanumeric',
      }),
      columnHelper.accessor((row) => Number(row.pnlPercent90t), {
        id: 'pnlPercent90t',
        header: t('table.n-months-pnl', { count: 3 }),
        cell: (props) => (
          <PercentageIndicator
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
        cell: (props) =>
          +props.getValue() ||
          Object.keys(props.row.original.sparklines).length > 1 ? (
            <>
              <ZigChartMini
                midLine
                data={[0, ...(props.row.original.sparklines as number[])]}
              />
              <PercentageIndicator value={props.getValue()} type={'graph'} />
            </>
          ) : (
            <ZigTypography variant='body2' color='neutral400'>
              {t('tableHeader.1-mo.no-data')}
            </ZigTypography>
          ),
      }),
      columnHelper.display({
        header: '',
        id: 'action',
        cell: (props) => <MarketplaceAction service={props.row.original} />,
      }),
    ],
    [t],
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
              <ZigTypography variant='h1' lineHeight='42px'>
                {t('invest-in-services')}
              </ZigTypography>
              <ZigTypography variant={'body1'} color='neutral300'>
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
                initialState={{
                  sorting: [
                    {
                      id: 'pnlPercent90t',
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
