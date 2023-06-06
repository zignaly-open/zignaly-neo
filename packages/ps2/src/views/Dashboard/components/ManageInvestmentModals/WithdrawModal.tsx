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
      id={'withdraw-modal'}
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
      onGoBack={
        step === 'confirm'
          ? () => {
              setStep('');
            }
          : undefined
      }
    >
      <WithdrawForm
        setStep={setStep}
        step={step}
        selectedCoin={selectedCoin}
        close={close}
      />
    </ZModal>
  );
}

WithdrawModal.trackId = 'withdraw';

export default WithdrawModal;
