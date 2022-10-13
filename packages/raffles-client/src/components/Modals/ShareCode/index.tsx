import React from 'react';
import { useQuery } from '@apollo/client';
import { Box } from '@mui/system';
import { PriceLabel, Table, Typography } from '@zignaly-open/ui';
import { TableProps } from '@zignaly-open/ui/lib/components/display/Table/types';
import { GET_USER_CODES, GET_USER_CODES_REDEMPTIONS } from 'queries/codes';
import { useTranslation } from 'react-i18next';
import DialogContainer from '../DialogContainer';
import { ShareCodeProps, UserCodes, UserCodesRedemptions } from './types';
import { StyledTable } from './styles';
import { format } from 'date-fns';

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
      Header: t('benefits-you'),
      accessor: 'rewardDirect',
      Cell: ({ cell: { value } }) => <PriceLabel value={value} coin='ZIG' />,
    },
    {
      Header: t('benefits-invited'),
      accessor: 'benefitDirect',
      Cell: ({ cell: { value } }) => <PriceLabel value={value} coin='ZIG' />,
    },
    {
      Header: t('current-redemptions'),
      accessor: 'currentRedemptions',
    },
    {
      Header: t('maximum-redemptions'),
      accessor: 'maximumRedemptions',
      Cell: ({ cell: { value } }) => value || 'N/A',
    },
    {
      Header: t('expiration-date'),
      accessor: 'expirationDate',
      Cell: ({ cell: { value } }) => value || 'N/A',
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
      Header: t('benefits-you'),
      accessor: 'invitedBenefit',
      Cell: ({ cell: { value } }) => <PriceLabel value={value} coin='ZIG' />,
    },
    {
      Header: t('benefits-invited'),
      accessor: 'inviterBenefit',
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
          />
        </StyledTable>
      )}
      <Box mt={4} mb={3}>
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
          />
        </StyledTable>
      )}
    </DialogContainer>
  );
};
export default ShareCode;
