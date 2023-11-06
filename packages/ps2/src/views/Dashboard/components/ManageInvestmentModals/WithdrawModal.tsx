import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import ZModal from '../../../../components/ZModal';
import WithdrawForm from './forms/WithdrawForm';
import { useZModal } from '../../../../components/ZModal/use';
import { useCanWithdraw } from '../../../../util/walls/util';

export type Step = '' | 'confirm' | 'success';

type WithdrawModalProps = {
  close: () => void;
  selectedCoin: string;
};

function WithdrawModal({
  close,
  selectedCoin,
  ...props
}: WithdrawModalProps & DialogProps): React.ReactElement {
  const [step, setStep] = useState<Step>('');
  const { t } = useTranslation(['withdraw-crypto']);

  return (
    <ZModal
      id={'withdraw-modal'}
      wide
      {...props}
      close={close}
      mobileFullScreen
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

export const useOpenWithdrawModal = (): ((
  props?: Partial<WithdrawModalProps>,
) => void) => {
  const checkCanWithdraw = useCanWithdraw();
  const { showModal } = useZModal({ disableAutoDestroy: true });
  return (props) => {
    if (checkCanWithdraw()) {
      showModal(WithdrawModal, props);
    }
  };
};

// No default export to enforce the usage of the hook
// export default WithdrawModal;
