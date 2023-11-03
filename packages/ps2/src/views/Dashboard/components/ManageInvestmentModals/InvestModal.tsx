import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelectedInvestment } from '../../../../apis/investment/use';
import { useServiceDetails } from '../../../../apis/service/use';
import { useCoinBalances } from '../../../../apis/coin/use';
import InvestView from './views/Invest';
import { InvestmentViews, UseModalReturn } from './types';
import { useUpdateEffect } from 'react-use';
import { track } from '@zignaly-open/tracker';
import { useCurrentUser } from '../../../../apis/user/use';

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
  const { userId } = useCurrentUser();
  const { isLoading: isLoadingCoins } = useCoinBalances();
  const { t } = useTranslation('edit-investment');
  const isLoading = isLoadingService || isLoadingCoins || !service;
  const [view, setView] = useState(InvestmentViews.Investment);

  // poor man's router
  useUpdateEffect(() => {
    track({
      hash: {
        [InvestmentViews.Investment]: 'invest',
        [InvestmentViews.InvestmentSuccess]: 'invest-success',
      }[view],
      userId,
    });
  }, [view]);

  return {
    title: t(
      view === InvestmentViews.InvestmentSuccess
        ? 'modalSuccess.title'
        : 'invest-modal.invest-with',
    ),
    view,
    mobileFullScreen: true,
    component: () =>
      !isLoading && <InvestView close={close} view={view} setView={setView} />,
  };
}
