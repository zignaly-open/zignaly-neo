import React, { useCallback, useEffect, useRef, useState } from 'react';
import { KYC_CHECK_INTERVAL } from './constants';
import { useToast } from '../../../util/hooks/useToast';
import { useTranslation } from 'react-i18next';
import { useCurrentUser, useIsAuthenticated } from '../../../apis/user/use';
import {
  useLazyKycStatusesQuery,
  useLazyUserQuery,
} from '../../../apis/user/api';

const UserKycChecker: React.FC = () => {
  const toast = useToast();
  const { KYCMonitoring: isPending } = useCurrentUser();
  const isAuthenticated = useIsAuthenticated();
  const { t } = useTranslation('common');
  const [loadUser] = useLazyUserQuery();
  const [loadKyc] = useLazyKycStatusesQuery();
  const [interval, setIntervalValue] = useState(null as NodeJS.Timer);
  const shouldCheck = isAuthenticated && isPending;

  const oldStatus = useRef<string>();

  const getStatuses = useCallback(() => {
    return loadKyc()
      .unwrap()
      .then(({ status }) => status.map((x) => x.status || '').join(''));
  }, []);

  const pollKyc = useCallback(async () => {
    setTimeout(async () => {
      const newStatus = await getStatuses();
      if (newStatus === oldStatus.current) {
        pollKyc();
      } else {
        oldStatus.current = newStatus;
        toast.info(t('kyc-updated'));
        loadUser();
      }
    }, KYC_CHECK_INTERVAL);
  }, [oldStatus]);

  useEffect(() => {
    shouldCheck &&
      getStatuses().then((s) => {
        oldStatus.current = s;
        pollKyc();
      });
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
