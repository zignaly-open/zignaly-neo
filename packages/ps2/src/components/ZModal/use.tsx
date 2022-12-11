import { ShowFnOutput, useModal, UseModalOptions } from 'mui-modal-provider';
import { useCallback } from 'react';

export function useZModal(options?: UseModalOptions) {
  const { showModal, ...etc } = useModal(options);
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
