import React, { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { Layout, InvestorCounts } from './styles';
import {
  UserIcon,
  Typography,
  Table,
  PriceLabel,
  PercentageIndicator,
} from '@zignaly-open/ui';
import { coinsToOperateServices } from '../../../../util/coins';
import { TableProps } from '@zignaly-open/ui/lib/components/display/Table/types';
import { InvestorTableDataType } from './types';
import {
  useTraderServiceInvestors,
  useServiceDetails,
  useTraderServiceManagement,
} from '../../use';
import { Investor } from '../../types';
import ConnectionStateLabel from '../ConnectionStateLabel';
import { YesNo } from './atoms';
import CenteredLoader from '../../../../components/CenteredLoader';

const ServiceInvestorsContainer: React.FC<{ serviceId: string }> = ({
  serviceId,
}) => {
  const {
    isLoading: isLoadingInvestors,
    data: investors,
    isError,
  } = useTraderServiceInvestors(serviceId);
  const { isLoading: isLoadingService, data: service } =
    useServiceDetails(serviceId);
  const { isLoading: isLoadingManagement, data: management } =
    useTraderServiceManagement(serviceId);

  const { t } = useTranslation('investors');

  const columns: TableProps<InvestorTableDataType>['columns'] = useMemo(
    () => [
      {
        Header: t('investors.tableHeader.email'),
        accessor: 'email',
      },
      {
        Header: t('investors.tableHeader.userId'),
        accessor: 'userId',
      },
      {
        Header: t('investors.tableHeader.investment'),
        accessor: 'investment',
        Cell: ({ cell: { value } }) => (
          <PriceLabel
            stableCoinOperative={checkStableCoinOperate}
            coin={service?.ssc ?? 'USDT'}
            value={value.toFixed()}
          />
        ),
      },
      {
        Header: t('investors.tableHeader.P&L'),
        accessor: 'pnl',
        Cell: ({ cell: { value } }) => (
          <PriceLabel
            stableCoinOperative={checkStableCoinOperate}
            coin={service?.ssc ?? 'USDT'}
            value={parseFloat(value.pnlNetLc)}
            bottomElement={<PercentageIndicator value={value.pnlPctLc} />}
          />
        ),
      },
      {
        Header: t('investors.tableHeader.P&LTotal'),
        accessor: 'pnlTotal',
        Cell: ({ cell: { value } }) => (
          <PriceLabel
            stableCoinOperative={checkStableCoinOperate}
            coin={service?.ssc ?? 'USDT'}
            value={parseFloat(value)}
          />
        ),
      },
      {
        Header: t('investors.tableHeader.totalFeesPaid'),
        accessor: 'totalFeesPaid',
        Cell: ({ cell: { value } }) => (
          <PriceLabel
            stableCoinOperative={checkStableCoinOperate}
            coin={service?.ssc ?? 'USDT'}
            value={parseFloat(value)}
          />
        ),
      },
      {
        Header: t('investors.tableHeader.successFee'),
        accessor: 'successFee',
      },
      {
        Header: t('investors.tableHeader.feesZIG'),
        accessor: 'feesInZig',
        Cell: ({ cell: { value } }) => <YesNo value={value} />,
      },
      {
        Header: t('investors.tableHeader.status'),
        accessor: 'status',
        Cell: ({ cell: { value } }) => <ConnectionStateLabel stateId={value} />,
      },
    ],
    [],
  );

  const checkStableCoinOperate = useMemo(
    () => coinsToOperateServices.stableCoins.includes(service?.ssc ?? 'USDT'),
    [service?.ssc],
  );

  return (
    <Layout>
      {investors && (
        <InvestorCounts>
          <UserIcon width={'17px'} height={'20px'} color={'#65647E'} />
          <Typography variant={'h3'} color={'avatarBack'}>
            {t('investors.number-of-investors', { count: investors?.length })}
          </Typography>
        </InvestorCounts>
      )}

      {isLoadingInvestors || isLoadingService || isLoadingManagement ? (
        <CenteredLoader />
      ) : (
        <Table
          type={'pagedWithData'}
          columns={columns}
          data={investors?.map((investor: Investor) => ({
            email: investor.email,
            userId: investor.userId,
            investment: new BigNumber(investor.invested).plus(
              new BigNumber(investor.pending),
            ),
            pnl: {
              pnlNetLc: investor.pnlNetLc,
              pnlPctLc: investor.pnlPctLc,
            },
            pnlTotal: investor.pnlNetAt,
            totalFeesPaid: investor.sfOwnerAt,
            successFee: `${management.successFee}%`,
            feesInZig: investor.payZig,
            status: investor.accountType,
          }))}
          hideOptionsButton={false}
          emptyMessage={isError ? t('investors.failed-to-load') : undefined}
          isUserTable={false}
        />
      )}
    </Layout>
  );
};

export default ServiceInvestorsContainer;
