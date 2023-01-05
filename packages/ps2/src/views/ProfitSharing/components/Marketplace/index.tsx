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
import { formatLocalizedDistance } from '../../../Dashboard/components/MyDashboard/util';

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
          paddingLeft: '83px',
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
      columnHelper.accessor('invested', {
        header: t('table.assets'),
        meta: {
          subtitle: t('table.nb-investors'),
        },
        cell: (props) => (
          <AssetsInPool
            assetsValue={props.getValue()}
            numberOfInvestors={props.row.original.investors}
          />
        ),
        sortingFn: 'alphanumeric',
      }),
      columnHelper.accessor('pnlPercent90t', {
        header: t('table.n-months-pnl', { count: 3 }),
        meta: {
          subtitle: t('table.account-age'),
        },
        cell: (props) => (
          <PercentageIndicator
            style={{
              fontSize: '18px',
              lineHeight: '28px',
            }}
            value={props.getValue()}
            label={formatLocalizedDistance(
              new Date(),
              new Date(props.row.original.createdAt),
            )}
          />
        ),
        sortingFn: 'alphanumeric',
      }),
      columnHelper.accessor('pnlPercent30t', {
        header: t('table.n-months-pnl', { count: 1 }),
        cell: (props) =>
          +props.getValue() ||
          Object.keys(props.row.original.sparklines).length > 1 ? (
            <>
              <ZigChartMini midLine data={props.row.original.sparklines} />
              <PercentageIndicator value={props.getValue()} type={'graph'} />
            </>
          ) : (
            <ZigTypography variant='body2' color='neutral400'>
              {t('tableHeader.1-mo.no-data')}
            </ZigTypography>
          ),
        sortingFn: 'alphanumeric',
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
              <ZigTypography variant={'h1'}>
                {t('invest-in-services')}
              </ZigTypography>
              <ZigTypography variant={'body1'}>
                {t('invest-in-services-explainer')}
              </ZigTypography>
            </Box>
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
              />
            </TableWrapper>
          </>
        )}
      />
    </PageContainer>
  );
};

export default Marketplace;
