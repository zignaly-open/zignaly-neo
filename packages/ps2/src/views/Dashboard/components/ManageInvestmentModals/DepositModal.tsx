import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import ZModal from '../../../../components/ZModal';
import DepositView from './views/Deposit';
import { DepositModalProps } from './types';
import { useZModal, useZRouteModal } from '../../../../components/ZModal/use';
import { useCanDeposit } from '../../../../util/walls/util';
import { Params } from 'react-router-dom';

function DepositModal({
  close,
  onClose,
  selectedCoin,
  allowedCoins,
  ...props
}: {
  // Callback to close invest modal when called from there
  onClose: () => void;
} & DepositModalProps &
  DialogProps): React.ReactElement {
  const checkCanDeposit = useCanDeposit();
  useEffect(() => {
    if (!checkCanDeposit(true)) {
      close();
    }
  }, []);
  const { t } = useTranslation(['deposit-crypto']);

  return (
    <ZModal mobileFullScreen wide {...props} close={close} title={t('title')}>
      <DepositView
        allowedCoins={allowedCoins}
        selectedCoin={selectedCoin}
        close={onClose}
      />
    </ZModal>
  );
}

DepositModal.trackId = 'deposit';

export const useOpenDepositModal = (
  modalRoute?: string,
): ((props?: Partial<DepositModalProps & { onClose: () => void }>) => void) => {
  const showDepositRouteModal = useZRouteModal(modalRoute);
  const checkCanDeposit = useCanDeposit();
  const { showModal } = useZModal({ disableAutoDestroy: true });
  return (props) => {
    if (checkCanDeposit()) {
      if (modalRoute) {
        showDepositRouteModal(props as unknown as Params<string>);
      } else {
        showModal(DepositModal, props);
      }
    }
  };
};

export default DepositModal;
