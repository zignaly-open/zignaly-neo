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

const Marketplace: React.FC = () => {
  const marketplaceEndpoint = useMarketplace();
  const { t } = useTranslation('marketplace');

  const columnHelper = createColumnHelper<MarketplaceService>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        id: 'service-name',
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
          <Box
            minWidth={148}
            id={`marketplace-table__assets-${props.row.original.id}`}
          >
            <AssetsInPool
              prefixId={'marketplace-table'}
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
          <Box id={`marketplace-table__pnl90t-${props.row.original.id}`}>
            <PercentageIndicator
              style={{
                fontSize: '18px',
                lineHeight: '28px',
              }}
              value={props.getValue()}
            />
          </Box>
        ),
      }),
      columnHelper.accessor((row) => Number(row.pnlPercent30t), {
        id: 'pnlPercent30t',
        header: t('table.n-months-pnl', { count: 1 }),
        cell: (props) => (
          <Box id={`marketplace-table__pnl30t-${props.row.original.id}`}>
            {+props.getValue() ||
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
            )}
          </Box>
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
              <ZigTypography variant={'h1'} id={'marketplace__title'}>
                {t('invest-in-services')}
              </ZigTypography>
              <ZigTypography variant={'body1'} id={'marketplace__description'}>
                {t('invest-in-services-explainer')}
              </ZigTypography>
            </Box>
            <TableWrapper>
              <ZigTable
                prefixId={'marketplace'}
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
