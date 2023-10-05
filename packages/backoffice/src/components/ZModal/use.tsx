import { ShowFnOutput, useModal } from 'mui-modal-provider';
import { ComponentType, useCallback } from 'react';
import AlertModal, { AlertModalProps } from './modals/AlertModal';
import TypeTextConfirmModal, {
  TypeTextConfirmModalProps,
} from './modals/TypeTextConfirmModal';
import { UseZModalOptions } from './types';

export function useZModal(options?: UseZModalOptions) {
  const { customClose, ...modalOptions } = options || {};
  const { showModal, ...etc } = useModal(modalOptions);
  const ourShowModal = useCallback(
    (
      Component: ComponentType & { trackId?: string },
      props?: Record<string, unknown>,
    ) => {
      const { ...modalProps } = props || {};
      const modal: ShowFnOutput<void> = showModal(Component, {
        ...modalProps,
        close: () => {
          customClose ? customClose(modal) : modal.destroy();
        },
      });
      return modal;
    },
    [showModal],
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

export function useZTypeWordConfirm(): (
  props: TypeTextConfirmModalProps,
) => ShowFnOutput<void> {
  const { showModal } = useZModal();
  return (props) => showModal(TypeTextConfirmModal, props);
}
