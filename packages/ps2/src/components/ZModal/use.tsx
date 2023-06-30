import { ShowFnOutput, useModal } from 'mui-modal-provider';
import { ComponentType, useCallback } from 'react';
import { track } from '@zignaly-open/tracker';
import { useCurrentUser } from '../../apis/user/use';
import AlertModal, { AlertModalProps } from './modals/AlertModal';
import ConfirmModal, { ConfirmModalProps } from './modals/ConfirmModal';
import TypeTextConfirmModal, {
  TypeTextConfirmModalProps,
} from './modals/TypeTextConfirmModal';
import { generatePath, Params, useNavigate } from 'react-router-dom';
import { UseZModalOptions } from './types';

export function useZModal(options?: UseZModalOptions) {
  const { customClose, ...modalOptions } = options || {};
  const { showModal, ...etc } = useModal(modalOptions);
  const { userId } = useCurrentUser();
  const ourShowModal = useCallback(
    (
      Component: ComponentType & { trackId?: string },
      props?: Record<string, unknown> & { ctaId?: string },
    ) => {
      const { ctaId, ...modalProps } = props || {};
      const trackId = Component.trackId?.toLocaleLowerCase();
      trackId && track({ hash: trackId, userId, ctaId, modal: true });
      const modal: ShowFnOutput<void> = showModal(Component, {
        ...modalProps,
        ctaId,
        close: () => {
          trackId && track({ userId });
          customClose ? customClose(modal) : modal.destroy();
        },
      });
      return modal;
    },
    [showModal, userId],
  );

  return {
    ...etc,
    showModal: ourShowModal,
    originalShowModal: showModal,
  };
}

export function useZRouteModal(
  route: string,
): (params?: Params<string>) => void {
  const navigate = useNavigate();
  return useCallback(
    (params) => navigate(generatePath(route, params || {})),
    [],
  );
}

export function useZAlert(): (props: AlertModalProps) => ShowFnOutput<void> {
  const { showModal } = useZModal();
  return (props) => showModal(AlertModal, props);
}

export function useZConfirm(): (
  props: ConfirmModalProps,
) => ShowFnOutput<void> {
  const { showModal } = useZModal();
  return (props) => showModal(ConfirmModal, props);
}

export function useZTypeWordConfirm(): (
  props: TypeTextConfirmModalProps,
) => ShowFnOutput<void> {
  const { showModal } = useZModal();
  return (props) => showModal(TypeTextConfirmModal, props);
}
