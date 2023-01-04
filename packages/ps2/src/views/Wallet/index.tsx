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
import { useCurrentUser } from 'apis/user/use';
import { useUpdateUserMutation } from 'apis/user/api';
import { ReactComponent as RewardsIcon } from 'images/rewards.svg';

const Wallet = () => {
  const { t } = useTranslation('wallet');
  useTitle(t('title'));
  const { showModal } = useZModal();
  const balancesEndpoint = useBalanceQuery();
  const coinsEndpoint = useCoinsQuery();
  const savingsEndpoint = useSavingsQuery();
  const user = useCurrentUser();
  const [payFeeWithZig, setPayFeeWithZig] = useState(user.payFeeWithZig);
  const [tradingFeeDiscount, setTradingFeeDiscount] = useState(
    user.tradingFeeDiscount,
  );
  const [updateUser, updateUserStatus] = useUpdateUserMutation();

  // const filterOptions = [
  //   { value: 'all', label: t('transactions-history:filter.all') },
  // ].concat(
  //   Object.entries(TRANSACTION_TYPE).map(([, v]) => {
  //     return {
  //       value: v,
  //       label: t(`transactions-history:${TRANSACTION_TYPE_NAME[v]}`),
  //     };
  //   }),
  // );

  const onPayFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.checked;
    setPayFeeWithZig(val);
    updateUser({ payFeeWithZig: val }).catch(() => {
      setPayFeeWithZig(user.payFeeWithZig);
    });
  };

  const onTradingFeeDiscountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const val = e.target.checked;
    setTradingFeeDiscount(val);
    updateUser({ tradingFeeDiscount: val }).catch(() => {
      setTradingFeeDiscount(!val);
    });
  };

  return (
    <Layout>
      <MarginContainer>
        <LayoutContentWrapper
          endpoint={[coinsEndpoint, balancesEndpoint, savingsEndpoint]}
          content={([coins, balances, savings]: [
            WalletCoins,
            WalletBalances,
            TotalSavings,
          ]) => {
            const balanceZIG = balances?.ZIG?.balance || 0;
            const rateZIG = coins?.ZIG.usdPrice;

            return (
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
                <TopPanel container direction='row'>
                  <PanelItem item>
                    <SubTitle>{t('totalBalance')}</SubTitle>
                    <Box display='flex' alignItems='center' gap='10px'>
                      <ZignalyIcon width={54} height={54} />
                      <div>
                        <ZigPriceLabel
                          value={balanceZIG}
                          variant='h1'
                          color='almostWhite'
                          coin='ZIG'
                          coinProps={{
                            color: '#9864EF',
                            fontWeight: 500,
                            variant: 'h3',
                            as: 'span',
                          }}
                        />
                        <Box display='flex' alignItems='center' gap={1}>
                          <ZigPriceLabel
                            value={balanceZIG * rateZIG}
                            usd
                            color='white'
                            fontWeight={600}
                            fontSize={16}
                          />
                          <ZigTypography variant='h5' color='neutral300'>
                            @{rateZIG?.toFixed(8)}/ZIG
                          </ZigTypography>
                        </Box>
                      </div>
                    </Box>
                    <Box display='flex' flexDirection='row' mt='20px' gap={1}>
                      <ZigButton
                        variant='contained'
                        onClick={() => {
                          // track('buy-zig');
                          // showBuyZIG(true);
                        }}
                      >
                        {t('buy')}
                      </ZigButton>
                      <ZigButton
                        variant='contained'
                        startIcon={<Add />}
                        onClick={() => {
                          // track('deposit-zig');
                          // showBuyZIG(true);
                        }}
                      >
                        {t('deposit')}
                      </ZigButton>
                      <ZigButton
                        startIcon={<Remove />}
                        variant='outlined'
                        onClick={() => {
                          // track('withdraw-zig');
                          // showBuyZIG(true);
                        }}
                      >
                        {t('withdraw')}
                      </ZigButton>
                    </Box>
                  </PanelItem>
                  <PanelItem item>
                    <SubTitle>{t('savings')}</SubTitle>
                    <Box display='flex' gap='12px'>
                      <RewardsIcon width={48} height={48} />
                      <div>
                        <ZigPriceLabel
                          value={savings.total}
                          variant='h1'
                          color='greenGraph'
                          coin='ZIG'
                          coinProps={{
                            color: 'almostWhite',
                            fontWeight: 500,
                            variant: 'h3',
                            as: 'span',
                          }}
                        />
                        <ZigTypography variant='h5' color='almostWhite'>
                          {t(
                            payFeeWithZig || tradingFeeDiscount
                              ? 'savingMoney'
                              : 'saveMoney',
                          )}
                        </ZigTypography>
                      </div>
                    </Box>
                    <Box
                      display='flex'
                      flexDirection='column'
                      mt='12px'
                      gap='2px'
                    >
                      <Box display='flex' alignItems='center'>
                        <FormControlLabel
                          control={
                            <StyledSwitch
                              checked={payFeeWithZig}
                              onChange={onPayFeeChange}
                            />
                          }
                          label={<SwitchLabel>{t('successFee')}</SwitchLabel>}
                        />
                        <MinText component='span'>
                          {t('min')}&nbsp;
                          {/* eslint-disable-next-line i18next/no-literal-string */}
                          <PercText>
                            6%
                            <Tooltip title={t('successFeeTooltip')}>
                              <TooltipIcon />
                            </Tooltip>
                          </PercText>
                        </MinText>
                      </Box>
                      <Box display='flex' alignItems='center'>
                        <FormControlLabel
                          control={
                            <StyledSwitch
                              checked={tradingFeeDiscount}
                              onChange={onTradingFeeDiscountChange}
                            />
                          }
                          label={<SwitchLabel>{t('tradingFee')}</SwitchLabel>}
                        />
                        <MinText component='span'>
                          {t('min')}&nbsp;
                          {/* eslint-disable-next-line i18next/no-literal-string */}
                          <PercText>
                            15%
                            <Tooltip title={t('tradingFeeTooltip')}>
                              <TooltipIcon />
                            </Tooltip>
                          </PercText>
                        </MinText>
                      </Box>
                    </Box>
                  </PanelItem>
                </TopPanel>
              </>
            );
          }}
        />
      </MarginContainer>
    </Layout>
  );
};

export default Wallet;
