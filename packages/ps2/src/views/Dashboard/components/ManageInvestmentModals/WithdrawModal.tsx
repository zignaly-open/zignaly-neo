import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import ZModal from '../../../../components/ZModal';
import WithdrawView from './views/Withdraw';
import { DepositModalProps } from './types';

function WithdrawModal({
  close,
  selectedCoin,
  allowedCoins,
  ...props
}: {
  close: () => void;
} & DepositModalProps &
  DialogProps): React.ReactElement {
  const { t } = useTranslation(['withdraw-crypto']);

  return (
    <ZModal wide {...props} close={close} title={t('title')}>
      <WithdrawView allowedCoins={allowedCoins} selectedCoin={selectedCoin} />
    </ZModal>
  );
}

export default WithdrawModal;
