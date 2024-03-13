import React, { useCallback, useEffect, useRef } from 'react';
import { KYC_CHECK_INTERVAL } from './constants';
import { useToast } from '../../../util/hooks/useToast';
import { useTranslation } from 'react-i18next';
import { useCurrentUser, useIsAuthenticated } from '../../../apis/user/use';
import {
  useLazyKycStatusesQuery,
  useLazyUserQuery,
} from '../../../apis/user/api';
import { isFeatureOn } from 'whitelabel';
import { Features } from 'whitelabel/type';
import { useDispatch } from 'react-redux';
import { setUser } from 'apis/user/store';

const UserKycChecker: React.FC = () => {
  const toast = useToast();
  const { KYCMonitoring: isPending } = useCurrentUser();
  const isAuthenticated = useIsAuthenticated();
  const { t } = useTranslation([
    ...(isFeatureOn(Features.Kyc) ? ['kyc'] : []),
    'common',
  ]);
  const [loadUser] = useLazyUserQuery();
  const [loadKyc] = useLazyKycStatusesQuery();
  const shouldCheck = isAuthenticated && isPending && isFeatureOn(Features.Kyc);
  const dispatch = useDispatch();

  const oldStatusesSerialized = useRef<string>();

  const getStatuses = useCallback(() => {
    return loadKyc()
      .unwrap()
      .then(({ statuses, kycMonitoring }) => ({
        statusesSerialized: statuses.map((x) => x.status || '').join(''),
        statuses,
        shouldCheck: kycMonitoring,
      }));
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout = null;

    (async () => {
      const pollKyc = () => {
        timeoutId = setTimeout(async () => {
          if (!isAuthenticated) return;
          const newStatus = await getStatuses();

          if (newStatus.statusesSerialized !== oldStatusesSerialized.current) {
            oldStatusesSerialized.current = newStatus.statusesSerialized;
            toast.info(t('common:kyc-updated'));
            const userData = await loadUser().unwrap();
            dispatch(setUser(userData));
          }

          if (newStatus.shouldCheck) {
            pollKyc();
          }
        }, KYC_CHECK_INTERVAL);
      };

      if (!shouldCheck) return;
      const { statusesSerialized } = await getStatuses();
      oldStatusesSerialized.current = statusesSerialized;
      pollKyc();
    })();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [shouldCheck]);

  return null;
};

export default UserKycChecker;
