import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import ZModal from '../../../../components/ZModal';
import ChooseDepositType from './views/ChooseDepositType';
import DepositView from './views/Deposit';
import { ChooseDepositTypeViews } from './types';

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
  const { t } = useTranslation(['purchase-deposit-crypto', 'deposit-crypto']);

  const [view, setView] = useState<ChooseDepositTypeViews>(
    ChooseDepositTypeViews.ChooseDepositTypeView,
  );

  const views = {
    [ChooseDepositTypeViews.ChooseDepositTypeView]: {
      title: t('purchase-deposit-crypto:title', { coin: selectedCoin }),
      component: () => (
        <ChooseDepositType setView={setView} coin={selectedCoin} />
      ),
    },
    [ChooseDepositTypeViews.DepositView]: {
      title: t('deposit-crypto:title'),
      component: () => (
        <DepositView
          allowedCoins={[selectedCoin]}
          selectedCoin={selectedCoin}
        />
      ),
    },
  };

  const { title, component } =
    views[view in views ? view : ChooseDepositTypeViews.ChooseDepositTypeView];

  return (
    <ZModal wide {...props} close={close} title={title}>
      {component()}
    </ZModal>
  );
}

ChooseDepositTypeModal.trackId = 'choose-deposit-type';

export default ChooseDepositTypeModal;
