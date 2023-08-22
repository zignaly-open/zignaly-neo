import React, { useCallback, useEffect, useRef } from 'react';
import { KYC_CHECK_INTERVAL } from './constants';
import { useToast } from '../../../util/hooks/useToast';
import { useTranslation } from 'react-i18next';
import { useCurrentUser, useIsAuthenticated } from '../../../apis/user/use';
import {
  useLazyKycStatusesQuery,
  useLazyUserQuery,
} from '../../../apis/user/api';

type StatusType = { statusSerialized: string; shouldCheck: boolean };

const UserKycChecker: React.FC = () => {
  const toast = useToast();
  const { KYCMonitoring: isPending } = useCurrentUser();
  const isAuthenticated = useIsAuthenticated();
  const { t } = useTranslation('common');
  const [loadUser] = useLazyUserQuery();
  const [loadKyc] = useLazyKycStatusesQuery();
  const shouldCheck = isAuthenticated && isPending;

  const oldStatus = useRef<StatusType>();

  const getStatuses = useCallback(() => {
    return loadKyc()
      .unwrap()
      .then(({ status, KYCMonitoring }) => ({
        statusSerialized: status.map((x) => x.status || '').join(''),
        shouldCheck: KYCMonitoring,
      }));
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout = null;

    (async () => {
      const pollKyc = () => {
        timeoutId = setTimeout(async () => {
          const newStatus = await getStatuses();

          if (
            newStatus.statusSerialized !== oldStatus.current.statusSerialized
          ) {
            oldStatus.current = newStatus;
            toast.info(t('kyc-updated'));
            loadUser();
          }

          if (newStatus.shouldCheck) {
            pollKyc();
          }
        }, KYC_CHECK_INTERVAL);
      };

      if (shouldCheck) {
        oldStatus.current = await getStatuses();
        pollKyc();
      }
    })();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [shouldCheck]);

  return null;
};

export default UserKycChecker;
