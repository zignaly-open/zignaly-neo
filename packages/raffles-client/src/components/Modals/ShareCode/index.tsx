import React from 'react';
import { useQuery } from '@apollo/client';
import { Box } from '@mui/system';
import { PriceLabel, Table, Typography } from '@zignaly-open/ui';
import { TableProps } from '@zignaly-open/ui/lib/components/display/Table/types';
import {
  GET_USER_CODES,
  GET_USER_CODES_REDEMPTIONS,
} from 'config/apollo/queries';
import { useTranslation } from 'react-i18next';
import DialogContainer from '../DialogContainer';
import { ShareCodeProps, UserCodes, UserCodesRedemptions } from './types';
import { StyledTable } from './styles';
import { format } from 'date-fns';

const formatPerc = (value: number) => (value ? `${value * 100}%` : 'N/A');
const formatDate = (value: string) =>
  value ? `${format(new Date(value), 'yyyy-MM-dd hh:mma')} UTC` : 'N/A';

const ShareCode = (props: ShareCodeProps) => {
  const { t } = useTranslation('share-code');
  const { data: dataCodes } = useQuery(GET_USER_CODES);
  const { data: dataCodesRedemptions } = useQuery(GET_USER_CODES_REDEMPTIONS);

  const columnsCodes: TableProps<UserCodes>['columns'] = [
    {
      Header: t('code'),
      accessor: 'code',
    },
    {
      Header: t('direct-reward'),
      accessor: 'rewardDirect',
      Cell: ({ cell: { value } }) => <PriceLabel value={value} coin='ZIG' />,
    },
    {
      Header: t('reward-benefits'),
      accessor: 'rewardFactor',
      Cell: ({ cell: { value } }) => formatPerc(value),
    },
    {
      Header: t('reward-deposits'),
      accessor: 'rewardDepositFactor',
      Cell: ({ cell: { value } }) => formatPerc(value),
    },
    {
      Header: t('max-rewards'),
      accessor: 'maxTotalRewards',
      Cell: ({ cell: { value } }) =>
        value ? <PriceLabel value={value} coin='ZIG' /> : 'N/A',
    },
    {
      Header: t('direct-benefits'),
      accessor: 'benefitDirect',
      Cell: ({ cell: { value } }) => <PriceLabel value={value} coin='ZIG' />,
    },
    {
      Header: t('balance-benefits'),
      accessor: 'benefitBalanceFactor',
      Cell: ({ cell: { value } }) => formatPerc(value),
    },
    {
      Header: t('deposit-benefits'),
      accessor: 'benefitDepositFactor',
      Cell: ({ cell: { value } }) => formatPerc(value),
    },
    {
      Header: t('max-benefit'),
      accessor: 'maxTotalBenefits',
      Cell: ({ cell: { value } }) =>
        value ? <PriceLabel value={value} coin='ZIG' /> : 'N/A',
    },
    {
      Header: t('current-redemptions'),
      accessor: 'currentRedemptions',
    },
    {
      Header: t('maximum-redemptions'),
      accessor: 'maxRedemptions',
      Cell: ({ cell: { value } }) => value || 'N/A',
    },
    {
      Header: t('min-balance'),
      accessor: 'reqMinimumBalance',
      Cell: ({ cell: { value } }) =>
        value ? <PriceLabel value={value} coin='ZIG' /> : 'N/A',
    },
    {
      Header: t('min-deposit'),
      accessor: 'reqMinimumDeposit',
      Cell: ({ cell: { value } }) =>
        value ? <PriceLabel value={value} coin='ZIG' /> : 'N/A',
    },
    {
      Header: t('only-deposit-from'),
      accessor: 'reqDepositFrom',
      Cell: ({ cell: { value } }) => formatDate(value),
    },
    {
      Header: t('min-auction-bids'),
      accessor: 'reqAuctionBids',
      Cell: ({ cell: { value } }) => value || 'N/A',
    },
    {
      Header: t('wallet'),
      accessor: 'reqWalletType',
      Cell: ({ cell: { value } }) =>
        value ? value.charAt(0).toUpperCase() + value.slice(1) : 'N/A',
    },
    {
      Header: t('expiration-date'),
      accessor: 'endDate',
      Cell: ({ cell: { value } }) => formatDate(value),
    },
  ];

  const columnsCodesRedemptions: TableProps<UserCodesRedemptions>['columns'] = [
    {
      Header: t('date'),
      accessor: 'redemptionDate',
      Cell: ({ cell: { value } }) => format(new Date(value), 'PP'),
    },
    {
      Header: t('code'),
      accessor: 'code',
    },
    {
      Header: t('your-reward'),
      accessor: 'inviterBenefit',
      Cell: ({ cell: { value } }) => <PriceLabel value={value} coin='ZIG' />,
    },
    {
      Header: t('your-friend-benefits'),
      accessor: 'invitedBenefit',
      Cell: ({ cell: { value } }) => <PriceLabel value={value} coin='ZIG' />,
    },
    {
      Header: t('user'),
      accessor: 'invited.username',
      Cell: ({ cell: { value }, data, row }) =>
        value || `${t('user')}#${data[row.index].invited.id}`,
    },
    {
      Header: t('address'),
      accessor: 'invited.shortAddress',
    },
  ];

  return (
    <DialogContainer
      fullWidth={true}
      maxWidth={'lg'}
      title={t('share-code')}
      {...props}
    >
      <Box textAlign='center'>
        <Typography variant='body1' color='neutral200' weight='regular'>
          {t('share-code-info')}
        </Typography>
      </Box>
      <Box my={3}>
        <Typography variant='h3' color='neutral200' weight='regular'>
          {t('your-codes')}
        </Typography>
      </Box>
      {dataCodes && (
        <StyledTable>
          <Table
            columns={columnsCodes}
            data={dataCodes.userCodes}
            isUserTable={false}
            hideOptionsButton={false}
            defaultHiddenColumns={[
              'rewardFactor',
              'maxTotalRewards',
              'benefitBalanceFactor',
              'maxTotalBenefits',
              'reqMinimumBalance',
              'reqMinimumDeposit',
              'reqDepositFrom',
              'reqAuctionBids',
              'reqWalletType',
              'endDate',
            ]}
          />
        </StyledTable>
      )}
      <Box mt={5} mb={3}>
        <Typography variant='h3' color='neutral200' weight='regular'>
          {t('your-codes-redemptions')}
        </Typography>
      </Box>
      {dataCodesRedemptions && (
        <StyledTable>
          <Table
            columns={columnsCodesRedemptions}
            data={dataCodesRedemptions.userCodesRedemptions}
            isUserTable={false}
            hideOptionsButton={false}
            initialState={{
              sortBy: [
                {
                  id: 'redemptionDate',
                  desc: true,
                },
              ],
            }}
          />
        </StyledTable>
      )}
    </DialogContainer>
  );
};
export default ShareCode;
