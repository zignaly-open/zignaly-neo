import { Alert } from '@mui/material';
import { useKycStatusesQuery } from 'apis/user/api';
import { KycStatus } from 'apis/user/types';
import { useCurrentUser, useIsAuthenticated } from 'apis/user/use';
import AnchorLink from 'components/AnchorLink';
import React from 'react';
import { ROUTE_KYC } from 'routes';
import { isFeatureOn } from 'whitelabel';
import { Features } from 'whitelabel/type';

const KycBanner = () => {
  const { exchanges } = useCurrentUser();
  const isAuthenticated = useIsAuthenticated();
  const { data: statusesRes } = useKycStatusesQuery(undefined, {
    skip:
      !isAuthenticated ||
      !isFeatureOn(Features.Kyc) ||
      !exchanges?.[0]?.activated,
  });

  if (
    exchanges?.length === 1 &&
    (!exchanges[0].activated ||
      statusesRes?.statuses.some(
        (s) =>
          s.category === 'KYC' &&
          s.level === 1 &&
          [KycStatus.NOT_STARTED, KycStatus.INIT].includes(s.status),
      ))
  ) {
    return (
      <Alert severity='warning' id='kyc-banner'>
        {
          /* eslint-disable-next-line i18next/no-literal-string */
          'Urgent Reminder: KYC Deadline Approaching!'
        }
        <AnchorLink to={ROUTE_KYC}>
          &nbsp;
          {
            /* eslint-disable-next-line i18next/no-literal-string */
            'Pass your KYC'
          }
        </AnchorLink>
      </Alert>
    );
  }

  return null;
};

export default KycBanner;
