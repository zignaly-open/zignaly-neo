import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ChooseDepositType from './views/ChooseDepositType';
import DepositView from './views/Deposit';
import { ChooseDepositTypeViews, UseModalReturn } from './types';

export function useDepositModalContent(
  selectedCoin: string,
  close: () => void,
): UseModalReturn {
  const { t } = useTranslation('deposit-crypto');

  const [view, setView] = useState<ChooseDepositTypeViews>(
    ChooseDepositTypeViews.ChooseDepositTypeView,
  );

  const views = {
    [ChooseDepositTypeViews.ChooseDepositTypeView]: {
      title: t('service-deposit.title', { coin: selectedCoin }),
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
          close={close}
        />
      ),
    },
  };

  const { title, component } =
    views[view in views ? view : ChooseDepositTypeViews.ChooseDepositTypeView];
  return { title, component };
}
