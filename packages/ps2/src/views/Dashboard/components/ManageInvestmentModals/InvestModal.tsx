import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelectedInvestment } from '../../../../apis/investment/use';
import { useServiceDetails } from '../../../../apis/service/use';
import { useCoinBalances } from '../../../../apis/coin/use';
import InvestView from './views/Invest';
import { InvestmentViews, UseModalReturn } from './types';

export function useInvestModalContent({
  close,
}: {
  close: () => void;
}): UseModalReturn {
  const service = useSelectedInvestment();
  const { isLoading: isLoadingService } = useServiceDetails(
    service?.serviceId,
    { skip: !service },
  );
  const { isLoading: isLoadingCoins } = useCoinBalances();
  const { t } = useTranslation('edit-investment');
  const isLoading = isLoadingService || isLoadingCoins || !service;
  const [view, setView] = useState(InvestmentViews.Investment);

  return {
    title: t(
      view === InvestmentViews.InvestmentSuccess
        ? 'modalSuccess.title'
        : 'invest-modal.invest-with',
    ),
    onGoBack:
      view === InvestmentViews.InvestmentConfirm
        ? () => setView(InvestmentViews.Investment)
        : undefined,
    component: () =>
      !isLoading && <InvestView close={close} view={view} setView={setView} />,
  };
}
