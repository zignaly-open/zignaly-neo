import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import ZModal from '../../../../components/ZModal';
import DepositView from './views/Deposit';

function InvestModal({
  close,
  ...props
}: {
  close: () => void;
} & DialogProps): React.ReactElement {
  const { t } = useTranslation(['deposit-crypto']);

  return (
    <ZModal wide {...props} close={close} title={t('title')}>
      <DepositView close={close} />
    </ZModal>
  );
}

export default InvestModal;
