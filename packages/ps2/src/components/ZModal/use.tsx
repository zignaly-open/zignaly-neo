import { ShowFnOutput, useModal } from 'mui-modal-provider';
import { useCallback } from 'react';

export function useZModal() {
  const { showModal, ...etc } = useModal();
  const ourShowModal = useCallback(
    (Component, props?) => {
      const modal: ShowFnOutput<void> = showModal(Component, {
        ...props,
        close: () => modal.destroy(),
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
