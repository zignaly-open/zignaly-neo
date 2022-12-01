import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import ZModal from '../../../../components/ZModal';
import WithdrawForm from './forms/WithdrawForm';
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
  const [isConfirmation, setIsConfirmation] = useState(false);
  const { t } = useTranslation(['withdraw-crypto']);

  return (
    <ZModal
      wide
      {...props}
      close={close}
      title={t(isConfirmation ? 'confirmation.title' : 'title')}
    >
      <WithdrawForm
        isConfirmation={isConfirmation}
        setIsConfirmation={setIsConfirmation}
        selectedCoin={selectedCoin}
      />
    </ZModal>
  );
}

export default WithdrawModal;
