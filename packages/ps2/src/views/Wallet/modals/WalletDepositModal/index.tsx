import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import { WalletDepositModalProps } from './types';
import WalletDepositForm from './WalletDepositForm';
import ZModal from 'components/ZModal';

function WalletDepositModal({
  close,
  selectedCoin,
  coins,
  ...props
}: {
  close: () => void;
} & WalletDepositModalProps &
  DialogProps): React.ReactElement {
  const { t } = useTranslation(['wallet']);

  return (
    <ZModal wide {...props} close={close} title={t('deposit.title')}>
      <WalletDepositForm coins={coins} selectedCoin={selectedCoin} />
    </ZModal>
  );
}

WalletDepositModal.trackId = 'wallet-deposit';

export default WalletDepositModal;
