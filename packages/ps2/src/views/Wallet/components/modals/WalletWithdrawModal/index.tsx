import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import WalletWithdrawForm from './WalletWithdrawForm';
import ZModal from 'components/ZModal';
import { WalletCoins } from 'apis/wallet/types';

export type Step = '' | 'confirm' | 'success';

function WalletWithdrawModal({
  close,
  selectedCoin,
  coins,
  ...props
}: {
  close: () => void;
  selectedCoin: string;
  coins: WalletCoins;
} & DialogProps): React.ReactElement {
  const [step, setStep] = useState<Step>('');
  const { t } = useTranslation(['withdraw-crypto']);

  return (
    <ZModal
      wide
      {...props}
      close={close}
      title={t(
        step === 'success'
          ? 'success.title'
          : step === 'confirm'
          ? 'confirmation.title'
          : 'title',
      )}
    >
      <WalletWithdrawForm
        setStep={setStep}
        selectedCoin={selectedCoin}
        close={close}
        coins={coins}
      />
    </ZModal>
  );
}

WalletWithdrawModal.trackId = 'withdraw';

export default WalletWithdrawModal;
