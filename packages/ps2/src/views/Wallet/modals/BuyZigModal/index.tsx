import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import { WalletDepositModalProps } from './types';
import ZModal from 'components/ZModal';
import BuyZIGForm from './BuyZIGForm';

function BuyZigModal({
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
      <BuyZIGForm />
    </ZModal>
  );
}

BuyZigModal.trackId = 'wallet-buy';

export default BuyZigModal;
