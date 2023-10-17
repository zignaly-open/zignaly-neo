import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ChooseDepositType from './views/ChooseDepositType';
import DepositView from './views/Deposit';
import {
  ChooseDepositTypeViews,
  ConfirmSwapDataType,
  ConvertPreviewType,
  UseModalReturn,
} from './types';
import SwapDepositPurchase from './views/SwapDepositPurchase';
import { useActiveExchange } from '../../../../apis/user/use';
import { useCoinBalances } from '../../../../apis/coin/use';
import { ZigTypography } from '@zignaly-open/ui';
import { allowedDeposits } from '../../../../util/coins';
import SwapCoinsConfirmForm from '../../../Balance/components/SwapCoinsModal/SwapCoinsConfirmForm';
import { useOpenInvestDepositModal } from './InvestDepositModal';

export function useDepositModalContent({
  coin,
  serviceId,
  refetchBalance,
  close,
}: {
  coin: string;
  serviceId?: string;
  refetchBalance: () => void;
  close: () => void;
}): UseModalReturn {
  const { t } = useTranslation(['deposit-crypto', 'swap-coins']);
  const { exchangeType, internalId } = useActiveExchange();
  const { data: balances, isLoading: isLoadingBalances } = useCoinBalances({
    convert: true,
  });
  const [convertPreviewData, setConvertPreviewData] =
    useState<ConvertPreviewType>();
  const [confirmSwapData, setConfirmSwapData] = useState<ConfirmSwapDataType>();
  const coinOptionsAllowedSwapFrom = useMemo(() => {
    if (!balances) return [];

    return Object.entries(balances)
      .map(([c, balance]) => ({
        value: c,
        coin: c,
        available: balance?.balanceFree || 0,
        availableInUsd: balance?.balanceFreeUSDT || 0,
        label: <ZigTypography>{c}</ZigTypography>,
      }))
      .filter(
        (c) => allowedDeposits.spot.includes(c.coin) && c.availableInUsd >= 10,
      );
  }, [balances]);
  const showSwap =
    exchangeType === 'spot' && coinOptionsAllowedSwapFrom.length !== 0;

  const [view, setView] = useState<ChooseDepositTypeViews>();
  useEffect(() => {
    showSwap
      ? setView(ChooseDepositTypeViews.SwapDepositView)
      : setView(ChooseDepositTypeViews.ChooseDepositTypeView);
  }, [showSwap]);
  const openInvestModal = useOpenInvestDepositModal();

  type ViewDefinition = {
    title: string;
    component: () => JSX.Element;
    onGoBack?: () => void;
    modalWidth?: number;
  };

  const views: Record<ChooseDepositTypeViews, ViewDefinition> = {
    [ChooseDepositTypeViews.ChooseDepositTypeView]: {
      title: t('service-deposit.title', { coin }),
      component: () => <ChooseDepositType setView={setView} coin={coin} />,
    },
    [ChooseDepositTypeViews.DepositView]: {
      title: t('deposit-crypto:title'),
      component: () => (
        <DepositView allowedCoins={[coin]} selectedCoin={coin} close={close} />
      ),
    },
    [ChooseDepositTypeViews.SwapDepositView]: {
      title: t('service-swap.title', { coin }),
      component: () => (
        <SwapDepositPurchase
          isLoadingBalances={isLoadingBalances}
          coinOptionsAllowedSwapFrom={coinOptionsAllowedSwapFrom}
          setView={setView}
          coin={coin}
          setConvertPreviewData={setConvertPreviewData}
          setConfirmSwapData={setConfirmSwapData}
        />
      ),
      modalWidth: 720,
    },
    [ChooseDepositTypeViews.SwapConfirmView]: {
      title: t('service-swap.confirm-swap-title', { coin }),
      component: () => (
        <SwapCoinsConfirmForm
          refetchBalance={refetchBalance}
          rate={
            convertPreviewData?.side === 'buy'
              ? 1 / convertPreviewData.lastPrice
              : convertPreviewData.lastPrice
          }
          close={() => {
            close();
            openInvestModal(serviceId);
          }}
          internalId={internalId}
          toCoin={coin}
          {...confirmSwapData}
        />
      ),
      onGoBack: () => setView(ChooseDepositTypeViews.SwapDepositView),
      modalWidth: 620,
    },
  };

  const { title, component, onGoBack, modalWidth } =
    views[view in views ? view : ChooseDepositTypeViews.ChooseDepositTypeView];
  return { title, component, onGoBack, view, modalWidth };
}
