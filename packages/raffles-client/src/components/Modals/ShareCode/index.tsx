import React from 'react';
import { useQuery } from '@apollo/client';
import { Box } from '@mui/system';
import {
  ColumnDef,
  Typography,
  ZigTable,
  ZigTablePriceLabel,
} from '@zignaly-open/ui';
import { GET_USER_CODES, GET_USER_CODES_REDEMPTIONS } from 'queries/codes';
import { useTranslation } from 'react-i18next';
import DialogContainer from '../DialogContainer';
import { ShareCodeProps } from './types';
import { StyledTable } from './styles';
import { format } from 'date-fns';

const formatPerc = (value: number) => (value ? `${value * 100}%` : 'N/A');
const formatDate = (value: string) =>
  value ? `${format(new Date(value), 'yyyy-MM-dd hh:mma')} UTC` : 'N/A';

const ShareCode = (props: ShareCodeProps) => {
  const { t } = useTranslation('share-code');
  const { data: dataCodes } = useQuery(GET_USER_CODES);
  const { data: dataCodesRedemptions } = useQuery(GET_USER_CODES_REDEMPTIONS);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnsCodes: ColumnDef<typeof dataCodes.userCodes[number], any>[] = [
    {
      header: t('code'),
      accessorKey: 'code',
    },
    {
      header: t('direct-reward'),
      accessorKey: 'rewardDirect',
      cell: ({ getValue }) =>
        getValue() ? (
          <ZigTablePriceLabel value={getValue()} coin='ZIG' />
        ) : (
          'N/A'
        ),
    },
    {
      header: t('reward-benefits'),
      accessorKey: 'rewardFactor',
      cell: ({ getValue }) => formatPerc(getValue()),
    },
    {
      header: t('reward-deposits'),
      accessorKey: 'rewardDepositFactor',
      cell: ({ getValue }) => formatPerc(getValue()),
    },
    {
      header: t('max-rewards'),
      accessorKey: 'maxTotalRewards',
      cell: ({ getValue }) =>
        getValue() ? (
          <ZigTablePriceLabel value={getValue()} coin='ZIG' />
        ) : (
          'N/A'
        ),
    },
    {
      header: t('direct-benefits'),
      accessorKey: 'benefitDirect',
      cell: ({ getValue }) =>
        getValue() ? (
          <ZigTablePriceLabel value={getValue()} coin='ZIG' />
        ) : (
          'N/A'
        ),
    },
    {
      header: t('balance-benefits'),
      accessorKey: 'benefitBalanceFactor',
      cell: ({ getValue }) => formatPerc(getValue()),
    },
    {
      header: t('deposit-benefits'),
      accessorKey: 'benefitDepositFactor',
      cell: ({ getValue }) => formatPerc(getValue()),
    },
    {
      header: t('max-benefit'),
      accessorKey: 'maxTotalBenefits',
      cell: ({ getValue }) =>
        getValue() ? (
          <ZigTablePriceLabel value={getValue()} coin='ZIG' />
        ) : (
          'N/A'
        ),
    },
    {
      header: t('current-redemptions'),
      accessorKey: 'currentRedemptions',
    },
    {
      header: t('maximum-redemptions'),
      accessorKey: 'maxRedemptions',
      cell: ({ getValue }) => getValue() || 'N/A',
    },
    {
      header: t('min-balance'),
      accessorKey: 'reqMinimumBalance',
      cell: ({ getValue }) =>
        getValue() ? (
          <ZigTablePriceLabel value={getValue()} coin='ZIG' />
        ) : (
          'N/A'
        ),
    },
    {
      header: t('min-deposit'),
      accessorKey: 'reqMinimumDeposit',
      cell: ({ getValue }) =>
        getValue ? <ZigTablePriceLabel value={getValue()} coin='ZIG' /> : 'N/A',
    },
    {
      header: t('only-deposit-from'),
      accessorKey: 'reqDepositFrom',
      cell: ({ getValue }) => formatDate(getValue()),
    },
    {
      header: t('min-auction-bids'),
      accessorKey: 'reqAuctionBids',
      cell: ({ getValue }) => getValue() || 'N/A',
    },
    {
      header: t('wallet'),
      accessorKey: 'reqWalletType',
      cell: ({ getValue }) =>
        getValue()
          ? getValue().charAt(0).toUpperCase() + getValue().slice(1)
          : 'N/A',
    },
    {
      header: t('expiration-date'),
      accessorKey: 'endDate',
      cell: ({ getValue }) => formatDate(getValue()),
    },
  ];

  const columnsCodesRedemptions: ColumnDef<
    typeof dataCodes.userCodes[number],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >[] = [
    {
      header: t('date'),
      accessorKey: 'redemptionDate',
      cell: ({ getValue }) => format(new Date(getValue()), 'PP'),
    },
    {
      header: t('code'),
      accessorKey: 'code',
    },
    {
      header: t('your-reward'),
      accessorKey: 'inviterBenefit',
      cell: ({ getValue }) => (
        <ZigTablePriceLabel value={getValue()} coin='ZIG' />
      ),
    },
    {
      header: t('your-friend-benefits'),
      accessorKey: 'invitedBenefit',
      cell: ({ getValue }) => (
        <ZigTablePriceLabel value={getValue()} coin='ZIG' />
      ),
    },
    {
      header: t('user'),
      accessorKey: 'invited.username',
      cell: ({ getValue, row: { original } }) =>
        getValue() || `${t('user')}#${original.invited.id}`,
    },
    {
      header: t('address'),
      accessorKey: 'invited.shortAddress',
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
          <ZigTable
            prefixId={'share-code'}
            columns={columnsCodes}
            data={dataCodes.userCodes}
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
          <ZigTable
            prefixId={'share-code-redemptions'}
            columns={columnsCodesRedemptions}
            data={dataCodesRedemptions.userCodesRedemptions}
            initialState={{
              sorting: [
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
