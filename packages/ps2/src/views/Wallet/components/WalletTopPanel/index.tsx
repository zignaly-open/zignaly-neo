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
import { Box, FormControlLabel, IconButton, Tooltip } from '@mui/material';
import { Add, ChevronRight, Remove } from '@mui/icons-material';
import { useUpdateUserMutation } from 'apis/user/api';
import { ReactComponent as RewardsIcon } from 'images/rewards.svg';
import { WalletTopPanelProps } from './types';
import { useCurrentUser } from 'apis/user/use';
import { useZModal } from 'components/ZModal/use';
import WalletDepositModal from '../../modals/WalletDepositModal';
import BuyZigModal from '../../modals/BuyZigModal';
import WalletWithdrawModal from '../../modals/WalletWithdrawModal';
import WalletPopover from './atoms/WalletPopover';
import { useDispatch } from 'react-redux';
import { setUser } from 'apis/user/store';
import { UserData } from 'apis/user/types';

const WalletTopPanel = ({ balances, savings, coins }: WalletTopPanelProps) => {
  const { t } = useTranslation('wallet');
  const balance = balances?.ZIG?.balance ?? 0;
  const { showModal } = useZModal();
  const user = useCurrentUser();
  const [updateUser] = useUpdateUserMutation();
  const rate = coins?.ZIG.usdPrice;
  const dispatch = useDispatch();
  // Balance Popover
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (
    value: boolean,
    property: 'payFeeWithZig' | 'tradingFeeDiscount',
  ) => {
    dispatch(setUser({ ...(user as UserData), [property]: value }));

    updateUser({ [property]: value }).catch(() => {
      dispatch(setUser({ ...(user as UserData), [property]: !value }));
    });
  };

  return (
    <TopPanel container direction='row'>
      <PanelItem item>
        <SubTitle>{t('totalBalance')}</SubTitle>
        <Box display='flex' alignItems='center' gap='12px'>
          <ZignalyIcon width={54} height={54} />
          <div>
            <Box display='flex' alignItems='center'>
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
              {coins &&
                ([
                  balances?.ZIG?.locked,
                  balances?.ZIG?.staked,
                  balances?.ZIG?.unstaking,
                ].some((v) => v > 0) ||
                  balances?.ZIG) && (
                  <>
                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                      <ChevronRight />
                    </IconButton>
                    <WalletPopover
                      anchorEl={anchorEl}
                      balance={balances?.ZIG}
                      coin={coins.ZIG}
                      handleClose={() => setAnchorEl(null)}
                      showLocked={true}
                    />
                  </>
                )}
            </Box>
            <Box display='flex' alignItems='center' gap={1}>
              <ZigPriceLabel
                value={balance * rate}
                usd
                color='almostWhite'
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
                user.payFeeWithZig || user.tradingFeeDiscount
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
                  checked={user.payFeeWithZig}
                  onChange={(e) =>
                    handleChange(e.target.checked, 'payFeeWithZig')
                  }
                />
              }
              label={<SwitchLabel>{t('successFee')}</SwitchLabel>}
            />
            <MinText component='span'>
              {t('min')}&nbsp;
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
                  checked={user.tradingFeeDiscount}
                  onChange={(e) =>
                    handleChange(e.target.checked, 'tradingFeeDiscount')
                  }
                />
              }
              label={<SwitchLabel>{t('tradingFee')}</SwitchLabel>}
            />
            <MinText component='span'>
              {t('min')}&nbsp;
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
