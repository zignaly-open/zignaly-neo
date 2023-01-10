import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import {
  ZigTypography,
  ZigCoinIcon,
  ZigSelect,
  ZigButton,
} from '@zignaly-open/ui';
import { DepositFormData, WalletDepositModalProps } from './types';
import { Box, Grid, Tooltip } from '@mui/material';
import { useToast } from 'util/hooks/useToast';
import AnchorLink from 'components/AnchorLink';
import ExchangesTooltip from './atoms/ExchangesTooltip';
import { useActivateExchange, useCurrentUser } from 'apis/user/use';
import CenteredLoader from 'components/CenteredLoader';
import { useBulkCoinsQuery } from 'apis/coin/api';
import DepositUSDTForm from './AddUsdtForm';
import SwapZIGForm from './SwapForm';

// todo: move to index?
function BuyZIGForm({ coins, selectedCoin }: WalletDepositModalProps) {
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

  return (
    <form>
      <Box mt={1} mb={1}>
        <ZigTypography>
          <Trans
            i18nKey='buy.description'
            t={t}
            values={{
              coin: 'USDT',
              max: '5,000',
            }}
          >
            <ExchangesTooltip />
          </Trans>
        </ZigTypography>
      </Box>

      {!exchangeAccounts ? (
        <CenteredLoader />
      ) : page === 'deposit' ? (
        <DepositUSDTForm accountsBalances={exchangeAccounts} />
      ) : (
        <SwapZIGForm
          coinFrom='USDT'
          coinTo='ZIG'
          accountsBalances={exchangeAccounts}
          onDepositMore={() => setPage('deposit')}
          // onDone={onDone}
        />
      )}
    </form>
  );
}

export default BuyZIGForm;
