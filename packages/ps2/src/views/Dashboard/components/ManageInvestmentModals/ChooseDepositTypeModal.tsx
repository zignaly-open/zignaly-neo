import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import ZModal from '../../../../components/ZModal';
import ChooseDepositType from './views/ChooseDepositType';

function ChooseDepositTypeModal({
  close,
  selectedCoin,
  ctaId,
  ...props
}: {
  close: () => void;
  ctaId: string;
  selectedCoin: string;
} & DialogProps): React.ReactElement {
  const { t } = useTranslation('purchase-deposit-crypto');

  return (
    <ZModal
      wide
      {...props}
      close={close}
      title={t('title', { coin: selectedCoin })}
    >
      <ChooseDepositType coin={selectedCoin} ctaId={ctaId} />
    </ZModal>
  );
}

ChooseDepositTypeModal.trackId = 'choose-deposit-type';

export default ChooseDepositTypeModal;
