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
import { TableProps } from '@zignaly-open/ui/lib/components/display/Table/types';
import { InvestorTableDataType } from './types';
import {
  useTraderServiceInvestors,
  useServiceDetails,
  useTraderServiceManagement,
} from '../../../../apis/service/use';
import {
  Investor,
  TraderServiceManagement,
} from '../../../../apis/service/types';
import ConnectionStateLabel from '../ConnectionStateLabel';
import { YesNo } from './atoms';
import LayoutContentWrapper from '../../../../components/LayoutContentWrapper';

const ServiceInvestorsContainer: React.FC<{ serviceId: string }> = ({
  serviceId,
}) => {
  const investorsEndpoint = useTraderServiceInvestors(serviceId);
  const serviceDetailsEndpoint = useServiceDetails(serviceId);
  const managementEndpoint = useTraderServiceManagement(serviceId);

  const { data: service } = serviceDetailsEndpoint;

  const { t } = useTranslation('investors');

  const columns: TableProps<InvestorTableDataType>['columns'] = useMemo(
    () => [
      {
        Header: t('tableHeader.email'),
        accessor: 'email',
      },
      {
        Header: t('tableHeader.userId'),
        accessor: 'userId',
      },
      {
        Header: t('tableHeader.investment'),
        accessor: 'investment',
        Cell: ({ cell: { value } }) => (
          <PriceLabel coin={service?.ssc ?? 'USDT'} value={value.toFixed()} />
        ),
      },
      {
        Header: t('tableHeader.P&L'),
        accessor: 'pnl',
        Cell: ({ cell: { value } }) => (
          <PriceLabel
            coin={service?.ssc ?? 'USDT'}
            value={parseFloat(value.pnlNetLc)}
            bottomElement={<PercentageIndicator value={value.pnlPctLc} />}
          />
        ),
      },
      {
        Header: t('tableHeader.P&LTotal'),
        accessor: 'pnlTotal',
        Cell: ({ cell: { value } }) => (
          <PriceLabel coin={service?.ssc ?? 'USDT'} value={parseFloat(value)} />
        ),
      },
      {
        Header: t('tableHeader.totalFeesPaid'),
        accessor: 'totalFeesPaid',
        Cell: ({ cell: { value } }) => (
          <PriceLabel coin={service?.ssc ?? 'USDT'} value={parseFloat(value)} />
        ),
      },
      {
        Header: t('tableHeader.successFee'),
        accessor: 'successFee',
      },
      {
        Header: t('tableHeader.feesZIG'),
        accessor: 'feesInZig',
        Cell: ({ cell: { value } }) => <YesNo value={value} />,
      },
      {
        Header: t('tableHeader.status'),
        accessor: 'status',
        Cell: ({ cell: { value } }) => <ConnectionStateLabel stateId={value} />,
      },
    ],
    [],
  );

  return (
    <Layout>
      <LayoutContentWrapper
        endpoint={[
          investorsEndpoint,
          managementEndpoint,
          serviceDetailsEndpoint,
        ]}
        content={([investors, management]: [
          Investor[],
          TraderServiceManagement,
        ]) => (
          <>
            <InvestorCounts>
              <UserIcon width={'17px'} height={'20px'} color={'#65647E'} />
              <Typography variant={'h3'} color={'almostWhite'}>
                {t('number-of-investors', {
                  count: investors?.length,
                })}
              </Typography>
            </InvestorCounts>

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
              emptyMessage={t('no-investors')}
              isUserTable={false}
            />
          </>
        )}
      />
    </Layout>
  );
};

export default ServiceInvestorsContainer;
