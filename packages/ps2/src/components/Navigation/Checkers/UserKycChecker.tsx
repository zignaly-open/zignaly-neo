import React, { useCallback, useEffect, useState } from 'react';
import { KYC_CHECK_INTERVAL } from './constants';
import { useToast } from '../../../util/hooks/useToast';
import { useTranslation } from 'react-i18next';
import { useCurrentUser, useIsAuthenticated } from '../../../apis/user/use';
import { useLazyUserQuery } from '../../../apis/user/api';

const UserKycChecker: React.FC = () => {
  const toast = useToast();
  const { KYCMonitoring: isPending } = useCurrentUser();
  const isAuthenticated = useIsAuthenticated();
  const { t } = useTranslation('common');
  const [loadUser] = useLazyUserQuery();
  const [interval, setIntervalValue] = useState(null as NodeJS.Timer);
  const shouldCheck = isAuthenticated && isPending;

  const pollKyc = useCallback(() => {
    loadUser()
      .unwrap()
      .then(({ KYCMonitoring: needsKyc }) =>
        !needsKyc
          ? toast.info(t('kyc-updated'))
          : setTimeout(pollKyc, KYC_CHECK_INTERVAL),
      );
  }, []);

  useEffect(() => {
    shouldCheck && pollKyc();
  }, [shouldCheck]);

  useEffect(() => {
    if (shouldCheck) {
      setIntervalValue(setInterval(() => {}, KYC_CHECK_INTERVAL));
    }
    return () => clearInterval(interval);
  }, [shouldCheck, interval]);

  return null;
};

export default UserKycChecker;
