import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import ZModal from '../../../../components/ZModal';
import SwapCoinsForm from './SwapCoinsForm';
import { CoinBalance, CoinDetail } from '../../../../apis/coin/types';

export type Step = '' | 'confirm';
export const coinsAllowedToSwap = ['BUSD', 'USDT', 'BTC', 'ETH', 'BNB'];

function SwapCoinsModal({
  close,
  selectedCoin,
  ...props
}: {
  close: () => void;
  selectedCoin: { coin: string; balance: CoinBalance & CoinDetail };
} & DialogProps): React.ReactElement {
  const [step, setStep] = useState<Step>('');
  const { t } = useTranslation(['swap-coins']);

  return (
    <ZModal
      id={'withdraw-modal'}
      wide
      {...props}
      close={close}
      title={t(step === 'confirm' ? 'confirmation.title' : 'title')}
      onGoBack={
        step === 'confirm'
          ? () => {
              setStep('');
            }
          : undefined
      }
    >
      <SwapCoinsForm
        selectedCoin={selectedCoin}
        setStep={setStep}
        step={step}
        close={close}
      />
    </ZModal>
  );
}

SwapCoinsModal.trackId = 'swap-coins';

export default SwapCoinsModal;