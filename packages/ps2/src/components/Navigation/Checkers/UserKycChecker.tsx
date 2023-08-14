import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (shouldCheck) {
      setIntervalValue(
        setInterval(() => {
          loadUser()
            .unwrap()
            .then(
              (user) => !user.KYCMonitoring && toast.info(t('kyc-updated')),
            );
        }, KYC_CHECK_INTERVAL),
      );
    }
    return () => clearInterval(interval);
  }, [shouldCheck]);

  return null;
};

export default UserKycChecker;
