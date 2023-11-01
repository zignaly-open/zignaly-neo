import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChooseDepositTypeViews } from '../types';
import ChooseBetweenTwo from './ChooseBetweenTwo';
import { useOpenBuyModal } from '../BuyModal';

const ChooseDepositType: React.FC<{
  coin: string;
  setView: (view: ChooseDepositTypeViews) => void;
}> = ({ coin, setView }) => {
  const { t } = useTranslation('deposit-crypto');
  const showBuyModal = useOpenBuyModal();

  return (
    <>
      <ChooseBetweenTwo
        description={t('service-deposit.description', { coin })}
        descriptionProps={{ id: 'modal-choose-deposit-type__description' }}
        cta1={t('service-deposit.buttons.deposit', { coin })}
        cta2={t('service-deposit.buttons.purchase', { coin })}
        button1Props={{
          id: 'modal-choose-deposit-type__deposit',
          onClick: () => setView(ChooseDepositTypeViews.DepositView),
        }}
        button2Props={{
          onClick: () => showBuyModal(),
          id: 'modal-choose-deposit-type__purchase',
          sx: { padding: '8px 20px' },
        }}
        explainer1={t('service-deposit.transfer-crypto', { coin })}
        explainer1Props={{ id: 'modal-choose-deposit-type__transfer-crypto' }}
        explainer2={t('service-deposit.buy-crypto', { coin })}
        explainer2Props={{ id: 'modal-choose-deposit-type__buy-crypto' }}
      />
    </>
  );
};

export default ChooseDepositType;
