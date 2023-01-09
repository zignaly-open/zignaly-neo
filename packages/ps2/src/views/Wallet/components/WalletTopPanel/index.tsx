/* eslint-disable i18next/no-literal-string */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MinText,
  PanelItem,
  PercText,
  Separator,
  StyledSwitch,
  SubTitle,
  SwitchLabel,
  TooltipIcon,
  TopPanel,
} from './styles';
import {
  ZigButton,
  ZignalyIcon,
  ZigPriceLabel,
  ZigTypography,
} from '@zignaly-open/ui';
import { Box, FormControlLabel, Tooltip } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useUpdateUserMutation } from 'apis/user/api';
import { ReactComponent as RewardsIcon } from 'images/rewards.svg';
import { WalletTopPanelProps } from './types';
import { useCurrentUser } from 'apis/user/use';
import { useUpdateEffect } from 'react-use';
import { useZModal } from 'components/ZModal/use';
import WalletDepositModal from '../modals/WalletDepositModal';
import BuyZigModal from '../modals/BuyZigModal';
import WalletWithdrawModal from '../modals/WalletWithdrawModal';

const WalletTopPanel = ({
  balance = 0,
  savings,
  coins,
}: WalletTopPanelProps) => {
  const { t } = useTranslation('wallet');
  const { showModal } = useZModal();
  const user = useCurrentUser();
  const [payFeeWithZig, setPayFeeWithZig] = useState(user.payFeeWithZig);
  const [tradingFeeDiscount, setTradingFeeDiscount] = useState(
    user.tradingFeeDiscount,
  );
  const [updateUser] = useUpdateUserMutation();
  const rate = coins?.ZIG.usdPrice;

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

  useUpdateEffect(() => {
    setTradingFeeDiscount(user.tradingFeeDiscount);
    setPayFeeWithZig(user.payFeeWithZig);
  }, [user.payFeeWithZig, user.tradingFeeDiscount]);

  return (
    <TopPanel container direction='row'>
      <PanelItem item>
        <SubTitle>{t('totalBalance')}</SubTitle>
        <Box display='flex' alignItems='center' gap='12px'>
          <ZignalyIcon width={54} height={54} />
          <div>
            <ZigPriceLabel
              value={balance}
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
                value={balance * rate}
                usd
                color='white'
                fontWeight={600}
                fontSize={16}
              />
              <ZigTypography variant='h5' color='neutral300'>
                @{rate?.toFixed(8)}/ZIG
              </ZigTypography>
            </Box>
          </div>
        </Box>
        <Box display='flex' flexDirection='row' mt='20px' gap={1}>
          <ZigButton
            variant='contained'
            onClick={() => {
              showModal(BuyZigModal, {
                ctaId: 'buy-zig',
              });
            }}
          >
            {t('buy.buy')}
          </ZigButton>
          <ZigButton
            variant='contained'
            startIcon={<Add />}
            onClick={() => {
              showModal(WalletDepositModal, {
                ctaId: 'deposit-zig',
                coins,
                selectedCoin: 'ZIG',
              });
            }}
          >
            {t('deposit.deposit')}
          </ZigButton>
          <ZigButton
            startIcon={<Remove />}
            variant='outlined'
            onClick={() => {
              showModal(WalletWithdrawModal, {
                ctaId: 'withdraw-zig',
                coins,
                selectedCoin: 'ZIG',
              });
            }}
          >
            {t('withdraw')}
          </ZigButton>
        </Box>
      </PanelItem>
      <Separator />
      <PanelItem item>
        <SubTitle>{t('savings')}</SubTitle>
        <Box display='flex' gap='12px'>
          <RewardsIcon width={48} height={48} />
          <div>
            <ZigPriceLabel
              value={savings}
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
        <Box display='flex' flexDirection='column' mt='12px' gap='2px'>
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
  );
};

export default WalletTopPanel;
