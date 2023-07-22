import { useMemo } from 'react';
import { UserAccessLevel as Level } from '../../apis/user/types';
import {
  useIsAuthenticated,
  useLogout,
  useUserAccessLevel,
} from '../../apis/user/use';
import { isFeatureOn } from '../../whitelabel';
import { Features } from '../../whitelabel/type';
import { useTranslation } from 'react-i18next';
import AlertModal, {
  AlertModalProps,
} from '../../components/ZModal/modals/AlertModal';
import { useZModal } from '../../components/ZModal/use';
import { ROUTE_KYC } from '../../routes';
import { useNavigate } from 'react-router-dom';

const usePerformLevelCheck = (
  levelThreshold: Level,
): ((onlyCheck?: boolean) => boolean) => {
  const isAuthenticated = useIsAuthenticated();
  const accessLevel = useUserAccessLevel();
  const { t } = useTranslation(['error']);
  const { showModal } = useZModal();
  const logout = useLogout();
  const navigate = useNavigate();

  const errorLevelMapping = useMemo<
    Partial<Record<Level, { modal: typeof AlertModal; props: AlertModalProps }>>
  >(
    () => ({
      [Level.Banned]: {
        modal: AlertModal,
        props: {
          title: t('access.banned.title'),
          okLabel: t('access.banned.action'),
          description: t('access.banned.description'),
          okAction: () => logout(),
        },
      },
      [Level.NotVerified]: {
        modal: AlertModal,
        props: {
          title: t('access.mail-not-verified.title'),
          okLabel: t('access.mail-not-verified.action'),
          description: t('access.mail-not-verified.description'),
          okAction: () => logout(),
        },
      },
      [Level.KycPending]: {
        modal: AlertModal,
        props: {
          title: t('access.kyc-pending.title'),
          okLabel: t('access.kyc-pending.action'),
          description: t('access.kyc-pending.description'),
          okAction: () => navigate(ROUTE_KYC),
        },
      },
      // [Level.NoSubscription]: {
      //   modal: AlertModal,
      //   props: {
      //     title: t('access.banned.title'),
      //     description: t('access.banned.title'),
      //     okAction: () =>
      //       window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
      //   },
      // },
      [Level.Frozen]: {
        modal: AlertModal,
        props: {
          title: t('access.frozen.title'),
          description: t('access.frozen.description'),
          okLabel: t('access.frozen.action'),
        },
      },
      [Level.KycExpired]: {
        modal: AlertModal,
        props: {
          title: t('access.kyc-expired.title'),
          description: t('access.kyc-expired.description'),
          okLabel: t('access.kyc-expired.action'),
          okAction: () => navigate(ROUTE_KYC),
        },
      },
      // [Level.SubscriptionExpired]: {
      //   modal: AlertModal,
      //   props: {
      //     title: t('access.banned.title'),
      //     description: t('access.banned.description'),
      //     okAction: () =>
      //       window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
      //   },
      // },
    }),
    [t, logout],
  );

  return (onlyCheck = false) => {
    if (!isFeatureOn(Features.AccessLevels)) return true;
    for (const l of Object.keys(Level)) {
      if (!isAuthenticated || !accessLevel) {
        // Do nothing here
      } else if (levelThreshold < +l) {
        // Do nothing, means we do not need so high of a level
      } else if (accessLevel < +l && errorLevelMapping[l]) {
        !onlyCheck &&
          showModal(errorLevelMapping[l].modal, errorLevelMapping[l].props);
        return false;
      }
    }
    return true;
  };
};
export const useCanLogIn = () => usePerformLevelCheck(Level.Banned);

export const useCanInsertCoupon = () => usePerformLevelCheck(Level.Frozen);

export const useCanDeposit = () => usePerformLevelCheck(Level.Normal);

export const useCanInvestIn = () => usePerformLevelCheck(Level.Normal);

export const useCanInvestOut = () => usePerformLevelCheck(Level.KycExpired);

export const useCanWithdraw = () =>
  usePerformLevelCheck(Level.SubscriptionExpired);
