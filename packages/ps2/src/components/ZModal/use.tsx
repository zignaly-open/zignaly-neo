import { ShowFnOutput, useModal, UseModalOptions } from 'mui-modal-provider';
import { ComponentType, useCallback } from 'react';
import { track } from '@zignaly-open/tracker';
import { useCurrentUser } from '../../apis/user/use';
import AlertModal, { AlertModalProps } from './modals/AlertModal';
import ConfirmModal, { ConfirmModalProps } from './modals/ConfirmModal';

export function useZModal(options?: UseModalOptions) {
  const { showModal, ...etc } = useModal(options);
  const { userId } = useCurrentUser();
  const ourShowModal = useCallback(
    (
      Component: ComponentType & { trackId?: string },
      props?: Record<string, unknown> & { ctaId?: string },
    ) => {
      const { ctaId, ...modalProps } = props || {};
      const trackId = Component.trackId?.toLocaleLowerCase();
      trackId && track({ hash: trackId, userId, ctaId });
      const modal: ShowFnOutput<void> = showModal(Component, {
        ...modalProps,
        close: () => {
          track({ userId });
          modal.destroy();
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
