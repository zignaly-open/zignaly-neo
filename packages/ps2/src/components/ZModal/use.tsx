import { ShowFnOutput, useModal, UseModalOptions } from 'mui-modal-provider';
import { useCallback } from 'react';
import { track } from '@zignaly-open/tracker';
import { useCurrentUser } from '../../apis/user/use';

export function useZModal(options?: UseModalOptions) {
  const { showModal, ...etc } = useModal(options);
  const { userId } = useCurrentUser();
  const ourShowModal = useCallback(
    (Component, props?) => {
      const trackId = (
        Component.trackId || Component.name?.replace(/Modal$/, '')
      ).toLocaleLowerCase();
      trackId && track({ hash: trackId, userId });
      const modal: ShowFnOutput<void> = showModal(Component, {
        ...props,
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
