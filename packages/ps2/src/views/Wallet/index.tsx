import React, { useState } from 'react';
import {
  MarginContainer,
  WalletGradientIcon,
  ZigButton,
  ZignalyIcon,
  ZigPriceLabel,
  ZigTypography,
} from '@zignaly-open/ui';
import {
  MinText,
  Layout,
  PanelItem,
  StyledSwitch,
  SubTitle,
  TopPanel,
  SwitchLabel,
  TooltipIcon,
  PercText,
  Separator,
} from './styles';
import { useTitle } from 'react-use';
import { useTranslation } from 'react-i18next';
import { Add, InfoOutlined, Remove } from '@mui/icons-material';
import { useZModal } from 'components/ZModal/use';
import { Box, FormControlLabel, Tooltip } from '@mui/material';
import {
  useBalanceQuery,
  useCoinsQuery,
  useSavingsQuery,
} from 'apis/wallet/api';
import LayoutContentWrapper from 'components/LayoutContentWrapper';
import { TotalSavings, WalletBalances, WalletCoins } from 'apis/wallet/types';
import WalletTopPanel from './components/WalletTopPanel';
import WalletTransactions from './components/WalletTransactions';

const Wallet = () => {
  const { t } = useTranslation('wallet');
  useTitle(t('title'));
  const { showModal } = useZModal();
  const balancesEndpoint = useBalanceQuery();
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
                balance={balances?.ZIG?.balance}
                rate={coins?.ZIG.usdPrice}
                savings={savings.total}
              />
              <WalletTransactions />
            </>
          )}
        />
      </MarginContainer>
    </Layout>
  );
};

export default Wallet;
