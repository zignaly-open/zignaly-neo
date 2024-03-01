import React, { useCallback, useMemo, useRef } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { ZigArrowOutIcon } from '@zignaly-open/ui/icons';
import { UserAccessLevel as Level } from '../../apis/user/types';
import {
  useIsAuthenticated,
  useLogout,
  useUserAccessLevel,
} from '../../apis/user/use';
import { isFeatureOn, whitelabel } from '../../whitelabel';
import { Features } from '../../whitelabel/type';
import { useTranslation } from 'react-i18next';
import AlertModal, {
  AlertModalProps,
} from '../../components/ZModal/modals/AlertModal';
import { useZModal } from '../../components/ZModal/use';
import { ROUTE_KYC, ROUTE_SUBSCRIPTIONS } from '../../routes';
import SubscriptionLevelAccessErrorModal from './SubscriptionLevelAccessErrorModal';

type LevelMapping =
  | false
  | {
      modal: typeof AlertModal | typeof SubscriptionLevelAccessErrorModal;
      props: AlertModalProps;
    };

const usePerformLevelCheck = (
  levelThreshold: Level,
  onClose?: () => void,
): ((onlyCheck?: boolean) => boolean) => {
  const isAuthenticated = useIsAuthenticated();
  const accessLevel = useUserAccessLevel();
  const { t } = useTranslation(['error']);
  const { showModal, destroyModal } = useZModal();
  const logout = useLogout();
  const navigate = useNavigate();
  const kycEnabled = isFeatureOn(Features.Kyc);
  const subscriptionsEnabled = isFeatureOn(Features.Subscriptions);
  const modalId = useRef('');

  const closeAndNavigate = useCallback(
    (path: string) => {
      // Close modal manually
      destroyModal(modalId.current);
      // If we have a modal open, close it (in case disableAutoDestroy is on)
      onClose?.();
      // Navigate to the path
      navigate(path);
    },
    [navigate, destroyModal, onClose],
  );

  const errorLevelMapping = useMemo<Partial<Record<Level, LevelMapping>>>(
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
      [Level.NotVerified]: kycEnabled && {
        modal: AlertModal,
        props: {
          title: t('access.mail-not-verified.title'),
          okLabel: t('access.mail-not-verified.action'),
          description: t('access.mail-not-verified.description'),
          okAction: () => logout(),
        },
      },
      [Level.KycPending]: kycEnabled && {
        modal: AlertModal,
        props: {
          title: t('access.kyc-pending.title'),
          okLabel: t('access.kyc-pending.action'),
          description: t('access.kyc-pending.description'),
          okAction: () => closeAndNavigate(generatePath(ROUTE_KYC)),
        },
      },
      [Level.NoSubscription]: subscriptionsEnabled && {
        modal: SubscriptionLevelAccessErrorModal,
        props: {
          title: t('access.no-subscription.title'),
          description: t('access.no-subscription.description'),
          cta1: t('access.no-subscription.cta-1'),
          cta2: t('access.no-subscription.cta-2'),
          explainer1: t('access.no-subscription.explainer-1'),
          explainer2: t('access.no-subscription.explainer-2'),
          button1Props: {
            id: 'modal-access.no-subscription__redeem',
            onClick: () => {
              closeAndNavigate(generatePath(ROUTE_SUBSCRIPTIONS));
            },
          },
          button2Props: {
            // if we have the subscription feature on but we don't have this configured...
            // too bad
            href: whitelabel.links?.subscriptionPurchaseLink,
            id: 'modal-access.no-subscription__purchase',
            endIcon: (
              <ZigArrowOutIcon
                width={'9px'}
                height={'9px'}
                style={{ marginBottom: '4px' }}
              />
            ),
            sx: { padding: '8px 20px' },
          },
        },
      },
      [Level.Frozen]: {
        modal: AlertModal,
        props: {
          title: t('access.frozen.title'),
          description: t('access.frozen.description'),
          okLabel: t('access.frozen.action'),
        },
      },
      [Level.KycExpired]: kycEnabled && {
        modal: AlertModal,
        props: {
          title: t('access.kyc-expired.title'),
          description: t('access.kyc-expired.description'),
          okLabel: t('access.kyc-expired.action'),
          okAction: () => closeAndNavigate(generatePath(ROUTE_KYC)),
        },
      },
      [Level.SubscriptionExpired]: subscriptionsEnabled && {
        modal: SubscriptionLevelAccessErrorModal,
        props: {
          title: t('access.expired-subscription.title'),
          description: t('access.expired-subscription.description'),
          cta1: t('access.expired-subscription.cta-1'),
          cta2: t('access.expired-subscription.cta-2'),
          explainer1: t('access.expired-subscription.explainer-1'),
          explainer2: t('access.expired-subscription.explainer-2'),
          button1Props: {
            id: 'modal-access.expired-subscription__redeem',
            onClick: () => {
              closeAndNavigate(generatePath(ROUTE_SUBSCRIPTIONS));
            },
          },
          button2Props: {
            // if we have the subscription feature on but we don't have this configured...
            // too bad
            href: whitelabel.links?.subscriptionPurchaseLink,
            id: 'modal-access.expired-subscription__purchase',
            endIcon: (
              <ZigArrowOutIcon
                width={'9px'}
                height={'9px'}
                style={{ marginBottom: '4px' }}
              />
            ),
            sx: { padding: '8px 20px' },
          },
        },
      },
    }),
    [t, logout],
  );

  return (onlyCheck = false) => {
    if (!isFeatureOn(Features.AccessLevels)) return true;
    for (const l of Object.keys(Level)) {
      if (!isAuthenticated || !accessLevel) {
        // Do nothing here
      } else if (levelThreshold <= +l) {
        // Do nothing, means we do not need so high of a level
      } else if (accessLevel <= +l && errorLevelMapping[l]) {
        if (!onlyCheck) {
          const modal = showModal(
            errorLevelMapping[l].modal,
            errorLevelMapping[l].props,
          );
          modalId.current = modal.id;
        }
        return false;
      }
    }
    return true;
  };
};

const createUseAccessCheck = (level: Level) => (onClose?: () => void) =>
  usePerformLevelCheck(level, onClose);

export const useCanLogIn = createUseAccessCheck(Level.KycPending);
export const useCanInsertCoupon = createUseAccessCheck(Level.NoSubscription);
export const useCanDeposit = createUseAccessCheck(Level.Normal);
export const useCanInvestIn = createUseAccessCheck(Level.Normal);
export const useCanCreateService = createUseAccessCheck(Level.Normal);
export const useCanInvestOut = createUseAccessCheck(Level.KycPending);
export const useCanWithdraw = createUseAccessCheck(Level.KycPending);

export const withModalRequiresAuthentication = <
  T extends { close: () => void },
>(
  Component: React.FC<T>,
): React.FC<T> => {
  return (props) => {
    const isAuthenticated = useIsAuthenticated();
    if (isAuthenticated) {
      return <Component {...props} />;
    } else {
      props.close();
      return null;
    }
  };
};
