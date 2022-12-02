import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import ZModal from '../../../../components/ZModal';
import WithdrawForm from './forms/WithdrawForm';

export type Step = '' | 'confirm' | 'success';

function WithdrawModal({
  close,
  selectedCoin,
  ...props
}: {
  close: () => void;
  selectedCoin: string;
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
          ? 'confirmation.title'
          : step === 'confirm'
          ? 'confirmation.title'
          : 'title',
      )}
    >
      <WithdrawForm
        setStep={setStep}
        selectedCoin={selectedCoin}
        close={close}
      />
    </ZModal>
  );
}

export default WithdrawModal;
