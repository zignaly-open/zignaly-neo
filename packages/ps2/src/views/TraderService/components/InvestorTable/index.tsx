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
import { sortBigNumbers } from '../../../../util/numbers';
import { connectionStateName } from '../ConnectionStateLabel/types';

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
        sortType: (a, b) =>
          sortBigNumbers(a.values.investment, b.values.investment),
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
        sortType: (a, b) =>
          sortBigNumbers(a.values.pnlPctLc, b.values.pnlPctLc),
      },
      {
        Header: t('tableHeader.P&LTotal'),
        accessor: 'pnlTotal',
        Cell: ({ cell: { value } }) => (
          <PriceLabel coin={service?.ssc ?? 'USDT'} value={parseFloat(value)} />
        ),
        sortType: (a, b) =>
          sortBigNumbers(a.values.pnlTotal, b.values.pnlTotal),
      },
      {
        Header: t('tableHeader.totalFeesPaid'),
        accessor: 'totalFeesPaid',
        Cell: ({ cell: { value } }) => (
          <PriceLabel coin={service?.ssc ?? 'USDT'} value={parseFloat(value)} />
        ),
        sortType: (a, b) =>
          sortBigNumbers(a.values.totalFeesPaid, b.values.totalFeesPaid),
      },
      {
        Header: t('tableHeader.successFee'),
        accessor: 'successFee',
      },
      {
        Header: t('tableHeader.feesZIG'),
        accessor: 'feesInZig',
        Cell: ({ cell: { value } }) => <YesNo value={value} />,
        sortType: (a, b) => +a.values.feesInZig - +b.values.feesInZig,
      },
      {
        Header: t('tableHeader.status'),
        accessor: 'status',
        Cell: ({ cell: { value } }) => <ConnectionStateLabel stateId={value} />,
        sortType: (a, b) =>
          t(connectionStateName[a.values.status])?.localeCompare(
            t(connectionStateName[b.values.status]),
          ),
      },
    ],
    [t],
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
