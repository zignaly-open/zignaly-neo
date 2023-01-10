import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { ZigTypography } from '@zignaly-open/ui';
import { DepositFormData, Step, WalletDepositModalProps } from './types';
import { Box, DialogProps } from '@mui/material';
import { useToast } from 'util/hooks/useToast';
import ExchangesTooltip from './atoms/ExchangesTooltip';
import { useActivateExchange, useCurrentUser } from 'apis/user/use';
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
  const toast = useToast();
  const [showDeposit, setShowDeposit] = useState(false);
  // const [reloadBalance, setReloadBalance] = useState(null);
  const { exchanges } = useCurrentUser();

  const [page, setPage] = useState('');

  const { control, watch } = useForm<DepositFormData>({
    defaultValues: {},
  });

  const zignalyExchangeAccounts = exchanges?.filter(
    (e) => e.exchangeName.toLowerCase() === 'zignaly',
  );
  const zignalyExchangeAccountsActivated = zignalyExchangeAccounts.filter(
    (e) => e.activated,
  );

  useActivateExchange(
    zignalyExchangeAccounts.find((a) => !a.activated)?.internalId,
  );

  const { data } = useBulkCoinsQuery({
    exchangeAccounts: zignalyExchangeAccountsActivated.map((a) => a.internalId),
  });
  const exchangeAccounts = useMemo(
    () =>
      data?.map((a) => {
        const exchange = exchanges.find(
          (e) => e.internalId === a.exchangeInternalId,
        );
        return {
          exchange,
          balances: a.balances,
        };
      }),
    [data],
  );

  useEffect(() => {
    if (
      data &&
      !data.find((a) => parseFloat(a.balances.USDT.balanceFree) > 0)
    ) {
      setPage('deposit');
    }
  }, [data]);

  // const fetchBalances = async () => {
  //   if (!zignalyExchangeAccountsActivated.length) {
  //     // No zignaly exchange account
  //     return;
  //   }

  // todo
  useEffect(() => {
    // fetchBalances();
  }, [exchanges]);

  const [step, setStep] = useState<Step>('swap');

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
        <AddUsdtForm accountBalances={exchangeAccounts} setStep={setStep} />
      ) : (
        <SwapZIGForm
          coinFrom='USDT'
          coinTo='ZIG'
          accountsBalances={exchangeAccounts}
          onDepositMore={() => setStep('deposit')}
          setStep={setStep}
          onDone={close}
        />
      )}
    </ZModal>
  );
}

BuyZigModal.trackId = 'wallet-buy';

export default BuyZigModal;
