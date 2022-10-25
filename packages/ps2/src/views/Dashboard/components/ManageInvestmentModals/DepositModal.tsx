import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import ZModal from '../../../../components/ZModal';
import DepositView from './views/Deposit';
import { DepositModalProps } from './types';

function DepositModal({
  close,
  selectedCoin,
  allowedCoins,
  ...props
}: {
  close: () => void;
} & DepositModalProps &
  DialogProps): React.ReactElement {
  const { t } = useTranslation(['deposit-crypto']);

  return (
    <ZModal wide {...props} close={close} title={t('title')}>
      <DepositView allowedCoins={allowedCoins} selectedCoin={selectedCoin} />
    </ZModal>
  );
}

export default DepositModal;
