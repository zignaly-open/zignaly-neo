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
import { KycStatus } from 'apis/user/types';
import { useZAlert } from 'components/ZModal/use';
import { useNavigate } from 'react-router-dom';
import { ROUTE_KYC } from 'routes';
import { useTraderServices } from 'apis/service/use';
import { junkyard } from 'util/junkyard';
import { differenceInDays } from 'date-fns';

const UserKycChecker: React.FC = () => {
  const toast = useToast();
  const { KYCMonitoring: isPending, exchanges } = useCurrentUser();
  const { data: traderServices, isLoading: isLoadingServices } =
    useTraderServices();
  const isAuthenticated = useIsAuthenticated();
  const { t } = useTranslation([
    ...(isFeatureOn(Features.Kyc) ? ['kyc'] : []),
    'common',
  ]);
  const [loadUser] = useLazyUserQuery();
  const [loadKyc] = useLazyKycStatusesQuery();
  const shouldCheck =
    isAuthenticated &&
    isPending &&
    isFeatureOn(Features.Kyc) &&
    !isLoadingServices;

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

  const showAlert = useZAlert();
  const navigate = useNavigate();

  useEffect(() => {
    // Ignore double renders in strict mode
    let ignore = false;
    let timeoutId: NodeJS.Timeout = null;

    (async () => {
      const pollKyc = () => {
        timeoutId = setTimeout(async () => {
          if (!isAuthenticated) return;
          const newStatus = await getStatuses();

          if (newStatus.statusesSerialized !== oldStatusesSerialized.current) {
            oldStatusesSerialized.current = newStatus.statusesSerialized;
            toast.info(t('common:kyc-updated'));
            loadUser();
          }

          if (newStatus.shouldCheck) {
            pollKyc();
          }
        }, KYC_CHECK_INTERVAL);
      };

      if (ignore || !shouldCheck) return;
      const statusesRes = await getStatuses();
      oldStatusesSerialized.current = statusesRes.statusesSerialized;

      const kycPushedDate = junkyard.get('kycPushed');

      if (
        statusesRes.statuses.some(
          (s) =>
            s.category === 'KYC' &&
            s.level === 1 &&
            [KycStatus.NOT_STARTED, KycStatus.INIT].includes(s.status),
        ) &&
        (!kycPushedDate ||
          differenceInDays(new Date(), new Date(kycPushedDate)) >= 1) &&
        !traderServices.length &&
        exchanges.length === 1
      ) {
        junkyard.set('kycPushed', new Date().toISOString());
        showAlert({
          title: t('modal-push.title'),
          okLabel: t('modal-push.ok'),
          description: t('modal-push.description'),
          okAction: () => {
            navigate(ROUTE_KYC);
          },
        });
      }

      pollKyc();
    })();

    return () => {
      ignore = true;
      clearTimeout(timeoutId);
    };
  }, [shouldCheck]);

  return null;
};

export default UserKycChecker;
