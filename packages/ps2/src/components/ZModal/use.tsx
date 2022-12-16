import { ShowFnOutput, useModal, UseModalOptions } from 'mui-modal-provider';
import { useCallback } from 'react';

export function useZModal(options?: UseModalOptions) {
  const { showModal, ...etc } = useModal(options);
  const ourShowModal = useCallback(
    (
      Component: ComponentType & { trackId?: string },
      props: undefined | (Record<string, unknown> & { ctaId?: string }),
    ) => {
      const { ctaId, ...modalProps } = props || {};
      const trackId = (
        Component.trackId || Component.name?.replace(/Modal$/, '')
      ).toLocaleLowerCase();
      trackId && track({ hash: trackId, userId, ctaId });
      const modal: ShowFnOutput<void> = showModal(Component, {
        ...modalProps,
        close: () => modal.destroy(),
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
