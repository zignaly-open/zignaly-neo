import { useQuery } from '@apollo/client';
import { Box } from '@mui/system';
import { InputText, PriceLabel, Table, Typography } from '@zignaly-open/ui';
import { TableProps } from '@zignaly-open/ui/lib/components/display/Table/types';
import useCurrentUser from 'hooks/useCurrentUser';
import { GET_USER_CODES, GET_USER_CODES_REDEMPTIONS } from 'queries/codes';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import DialogContainer from '../DialogContainer';
import { ShareCodeProps, UserCodes, UserCodesRedemptions } from './types';

const ShareCode = (props: ShareCodeProps) => {
  const { t } = useTranslation('referral');
  const { user } = useCurrentUser();
  const { data: dataCodes } = useQuery(GET_USER_CODES);
  const { data: dataCodesRedemptions } = useQuery(GET_USER_CODES_REDEMPTIONS);
  console.log(dataCodes, dataCodesRedemptions);

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
      Header: t('code'),
      accessor: 'code',
    },
    {
      Header: t('benefits-inviter'),
      accessor: 'benefitsInviter',
    },
    {
      Header: t('benefits-invited'),
      accessor: 'benefitsInvited',
    },
    {
      Header: t('current-redemptions'),
      accessor: 'currentRedemptions',
    },
    {
      Header: t('maximum-redemptions'),
      accessor: 'maximumRedemptions',
    },
    {
      Header: t('expiration-date'),
      accessor: 'expirationDate',
    },
  ];

  // const data = useMemo(() => codes.map((c) => ({})), [codes]);

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
        <Table
          columns={columnsCodes}
          data={dataCodes.userCodes}
          isUserTable={false}
          hideOptionsButton={false}
        />
      )}
      <Box my={3}>
        <Typography variant='h3' color='neutral200' weight='regular'>
          {t('your-codes-redemptions')}
        </Typography>
      </Box>
      {dataCodesRedemptions && (
        <Table
          columns={columnsCodesRedemptions}
          data={dataCodesRedemptions.userCodesRedemptions}
          isUserTable={false}
          hideOptionsButton={false}
        />
      )}
    </DialogContainer>
  );
};
export default ShareCode;
