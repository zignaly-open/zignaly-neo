import React from 'react';
import {
  MarginContainer,
  WalletGradientIcon,
  ZigTypography,
} from '@zignaly-open/ui';
import { Layout } from './styles';
import { useTitle } from 'react-use';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import {
  useBalanceQuery,
  useCoinsQuery,
  useSavingsQuery,
} from 'apis/wallet/api';
import LayoutContentWrapper from 'components/LayoutContentWrapper';
import { TotalSavings, WalletBalances, WalletCoins } from 'apis/wallet/types';
import WalletTopPanel from './components/WalletTopPanel';
import WalletTransactions from './components/WalletTransactions';
import WalletCoinsTable from './components/WalletCoins';

const Wallet = () => {
  const { t } = useTranslation('wallet');
  useTitle(t('title'));
  const balancesEndpoint = useBalanceQuery(null, { pollingInterval: 60_000 });
  const coinsEndpoint = useCoinsQuery();
  const savingsEndpoint = useSavingsQuery();

  return (
    <Layout>
      <MarginContainer>
        <LayoutContentWrapper
          endpoint={[coinsEndpoint, balancesEndpoint, savingsEndpoint]}
          content={([coins, balances, savings]: [
            WalletCoins,
            WalletBalances,
            TotalSavings,
          ]) => (
            <>
              <Box
                display='flex'
                gap={1}
                alignItems='center'
                color='neutral100'
              >
                <WalletGradientIcon width={40} height={40} />
                <ZigTypography textTransform='uppercase' variant='h3'>
                  {t('title')}
                </ZigTypography>
              </Box>
              <WalletTopPanel
                balances={balances}
                savings={savings.total}
                coins={coins}
              />
              <WalletCoinsTable balances={balances} coins={coins} />
              <WalletTransactions />
            </>
          )}
        />
      </MarginContainer>
    </Layout>
  );
};

export default Wallet;
