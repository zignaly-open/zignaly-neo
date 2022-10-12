import { useQuery } from '@apollo/client';
import { Box } from '@mui/system';
import { InputText, Table, Typography } from '@zignaly-open/ui';
import { TableProps } from '@zignaly-open/ui/lib/components/display/Table/types';
import useCurrentUser from 'hooks/useCurrentUser';
import { GET_USER_CODES } from 'queries/codes';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import DialogContainer from '../DialogContainer';
import { ShareCodeProps } from './types';

const ShareCode = (props: ShareCodeProps) => {
  const { t } = useTranslation('referral');
  const { user } = useCurrentUser();
  const { data } = useQuery(GET_USER_CODES);
  console.log(data);

  type Test = {
    coin: string;
  };

  const columns: TableProps<Test>['columns'] = [
    {
      Header: t('code'),
      accessor: 'code',
    },
    {
      Header: t('benefits-inviter'),
      accessor: 'rewardDirect',
    },
    {
      Header: t('benefits-invited'),
      accessor: 'benefitDirect',
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

  const columns2: TableProps<Test>['columns'] = [
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
      maxWidth={'sm'}
      title={t('share-code')}
      {...props}
    >
      <Box textAlign='center'>
        <Typography variant='body1' color='neutral200' weight='regular'>
          {t('not-enough-info')}
        </Typography>
      </Box>
      {data && (
        <Table
          columns={columns}
          data={data.userCodes}
          isUserTable={false}
          hideOptionsButton={false}
        />
      )}
    </DialogContainer>
  );
};
export default ShareCode;
