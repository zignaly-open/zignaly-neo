import { Alert } from '@mui/material';
import { useTraderServices } from 'apis/service/use';
import { useKycStatusesQuery } from 'apis/user/api';
import { KycStatus } from 'apis/user/types';
import { useCurrentUser, useIsAuthenticated } from 'apis/user/use';
import AnchorLink from 'components/AnchorLink';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ROUTE_KYC } from 'routes';
import { isFeatureOn } from 'whitelabel';
import { Features } from 'whitelabel/type';

const KycBanner = () => {
  const { t } = useTranslation('kyc');
  const { data: traderServices, isLoading: isLoadingServices } =
    useTraderServices();
  const { exchanges } = useCurrentUser();
  const isAuthenticated = useIsAuthenticated();
  const { data: statusesRes } = useKycStatusesQuery(undefined, {
    skip:
      !isAuthenticated ||
      !isFeatureOn(Features.Kyc) ||
      !exchanges?.[0].activated,
  });

  if (
    exchanges?.length === 1 &&
    (!exchanges[0].activated ||
      statusesRes?.statuses.some(
        (s) =>
          s.category === 'KYC' &&
          s.level === 1 &&
          [KycStatus.NOT_STARTED, KycStatus.INIT].includes(s.status),
      )) &&
    !isLoadingServices &&
    !traderServices?.length
  ) {
    return (
      <Alert severity='warning' id='kyc-banner'>
        <Trans
          i18nKey='reminder'
          t={t}
          components={[<AnchorLink to={ROUTE_KYC} key='1' />]}
        />
      </Alert>
    );
  }

  return null;
};

export default KycBanner;
