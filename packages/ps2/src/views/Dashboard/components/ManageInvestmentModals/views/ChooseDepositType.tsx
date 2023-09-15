import React from 'react';
import { ZigArrowOutIcon } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { BUY_CRYPTO_URL } from '../../../../../util/constants';
import { ChooseDepositTypeViews } from '../types';
import ChooseBetweenTwo from './ChooseBetweenTwo';

const ChooseDepositType: React.FC<{
  coin: string;
  setView: (view: ChooseDepositTypeViews) => void;
}> = ({ coin, setView }) => {
  const { t } = useTranslation('deposit-crypto');
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
          href: BUY_CRYPTO_URL,
          id: 'modal-choose-deposit-type__purchase',
          endIcon: (
            <ZigArrowOutIcon
              width={'9px'}
              height={'9px'}
              style={{ marginBottom: '4px' }}
            />
          ),
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
