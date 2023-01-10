import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Step, WalletDepositModalProps } from './types';
import { DialogProps } from '@mui/material';
import { useCurrentUser } from 'apis/user/use';
import CenteredLoader from 'components/CenteredLoader';
import { useBulkCoinsQuery } from 'apis/coin/api';
import AddUsdtForm from './AddUsdtForm';
import SwapZIGForm from './SwapForm';
import ZModal from 'components/ZModal';

function BuyZigModal({
  coins,
  selectedCoin,
  close,
  ...props
}: WalletDepositModalProps & DialogProps) {
  const { t } = useTranslation('wallet');
  const { exchanges } = useCurrentUser();

  const zignalyExchangeAccounts = exchanges?.filter(
    (e) => e.exchangeName.toLowerCase() === 'zignaly',
  );

  const { data: accountsCoins } = useBulkCoinsQuery({
    exchangeAccounts: zignalyExchangeAccounts.map((a) => a.internalId),
  });

  const exchangeAccounts = useMemo(
    () =>
      accountsCoins?.map((a) => {
        const exchange = exchanges.find(
          (e) => e.internalId === a.exchangeInternalId,
        );
        return {
          exchange,
          balances: a.balances,
        };
      }),
    [accountsCoins],
  );

  useEffect(() => {
    if (!accountsCoins) return;

    if (
      !accountsCoins.find((a) => parseFloat(a.balances.USDT?.balanceFree) > 0)
    ) {
      setStep('deposit');
    } else {
      setStep('swap');
    }
  }, [accountsCoins]);

  const [step, setStep] = useState<Step>(null);

  const PAGE_TITLE = {
    deposit: t('buy.deposit.title', { coin: 'USDT' }),
    confirm: t('buy.confirm'),
    swap: t('buy.title'),
  };

  return (
    <ZModal wide {...props} close={close} title={PAGE_TITLE[step]}>
      {!exchangeAccounts ? (
        <CenteredLoader />
      ) : step === 'deposit' ? (
        <AddUsdtForm
          accountBalances={exchangeAccounts}
          setStep={setStep}
          close={close}
        />
      ) : step === 'swap' ? (
        <SwapZIGForm
          coinFrom='USDT'
          coinTo='ZIG'
          accountsBalances={exchangeAccounts}
          onDepositMore={() => setStep('deposit')}
          setStep={setStep}
          onDone={close}
        />
      ) : null}
    </ZModal>
  );
}

BuyZigModal.trackId = 'wallet-buy';

export default BuyZigModal;
