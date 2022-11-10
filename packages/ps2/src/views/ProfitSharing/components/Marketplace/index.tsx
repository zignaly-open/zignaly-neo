import React, { useCallback, useMemo } from 'react';
import { useMarketplace } from '../../../../apis/marketplace/use';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  PageContainer,
  Table,
  AreaChart,
  PercentageIndicator,
  sortByValue,
} from '@zignaly-open/ui';
import { formatDistance } from 'date-fns';
import { Box } from '@mui/material';
import LayoutContentWrapper from '../../../../components/LayoutContentWrapper';
import { MarketplaceService } from '../../../../apis/marketplace/types';
import { Investment } from '../../../../apis/investment/types';
import { TableProps } from '@zignaly-open/ui/lib/components/display/Table/types';
import { Inline } from '../../../Dashboard/components/MyDashboard/styles';
import { ServiceName } from '../../../Dashboard/components/ServiceName';
import { MarketplaceTableDataType } from './types';
import { marketplaceServiceToInvestmentType } from '../../../../apis/marketplace/util';
import AssetsInPool from '../AssetsInPool';
import MarketplaceAction from '../MarketplaceAction';

const initialStateTable = {
  sortBy: [
    {
      id: '90d',
      desc: true,
    },
  ],
};

const Marketplace: React.FC = () => {
  const marketplaceEndpoint = useMarketplace();
  const { t } = useTranslation('marketplace');

  const tableColumns: TableProps<MarketplaceTableDataType>['columns'] = useMemo(
    () => [
      {
        Header: t('table.service-name'),
        style: {
          justifyContent: 'flex-start',
          paddingLeft: '67px',
        },
        accessor: 'service',
        headerWithFooter: (
          <>
            <Box textAlign={'left'}>{t('table.manager')}</Box>
            <Box textAlign={'left'}>{t('table.currency')}</Box>
          </>
        ),
        Cell: ({ cell: { value } }) => (
          <ServiceName
            service={marketplaceServiceToInvestmentType(value) as Investment} // it's fine it's fine
          />
        ),
        sortType: (a, b) =>
          a.values.service.name?.localeCompare(b.values.service.name),
      },
      {
        Header: () => t('table.assets'),
        accessor: 'assets',
        headerWithFooter: <Inline>{t('table.nb-investors')}</Inline>,
        Cell: ({ cell: { value } }) => (
          <AssetsInPool
            assetsValue={value.invested}
            numberOfInvestors={value.investors}
          />
        ),
        sortType: (a, b) =>
          sortByValue(a.values.assets.invested, b.values.assets.invested),
      },
      {
        Header: t('table.n-months', { count: 3 }),
        accessor: '90d',
        headerWithFooter: <Inline>{t('table.account-age')}</Inline>,
        Cell: ({ cell: { value } }) => (
          <>
            <PercentageIndicator
              style={{
                fontSize: '18px',
                lineHeight: '28px',
              }}
              value={value.roi}
              label={formatDistance(new Date(), new Date(value.createdAt))}
            />
          </>
        ),
        sortType: (a, b) =>
          sortByValue(a.values['90d'].roi || 0, b.values['90d'].roi || 0),
      },
      {
        Header: t('table.n-months', { count: 1 }),
        accessor: '30d',
        Cell: ({ cell: { value } }) =>
          +value.pnl30d || Object.keys(value.data).length > 1 ? (
            <>
              <AreaChart midLine variant='small' data={value.data} />
              <PercentageIndicator value={value.pnl30d} type={'graph'} />
            </>
          ) : (
            <Typography variant={'body2'} color={'neutral400'}>
              {t('tableHeader.1-mo.no-data')}
            </Typography>
          ),
        sortType: (a, b) =>
          sortByValue(a.values['30d'].pnl30d || 0, b.values['30d'].pnl30d || 0),
      },
      {
        Header: '',
        accessor: 'actionService',
        Cell: ({ cell: { value } }) => <MarketplaceAction service={value} />,
      },
    ],
    [],
  );

  const bodyMapper = useCallback(
    (service: MarketplaceService): MarketplaceTableDataType => {
      return {
        service,
        '30d': {
          pnl30d: service.pnlPercent30t,
          data: service.sparklines,
        },
        '90d': {
          roi: service.pnlPercent30t,
          createdAt: service.createdAt,
        },
        assets: {
          invested: service.invested,
          investors: service.investors,
        },
        actionService: service,
      };
    },
    [],
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
              <Typography variant={'h1'} component={'h1'}>
                {t('invest-in-services')}
              </Typography>
              <Typography variant={'body1'} color={'neutral200'}>
                {t('invest-in-services-explainer')}
              </Typography>
            </Box>
            <Table
              initialState={initialStateTable}
              columns={tableColumns}
              data={services?.map(bodyMapper)}
              emptyMessage={t('table-search-emptyMessage')}
              hideOptionsButton={true}
              isUserTable={true}
            />
          </>
        )}
      />
    </PageContainer>
  );
};

export default Marketplace;
