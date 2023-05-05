/* eslint-disable i18next/no-literal-string */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SubTitle, TopPanel } from './styles';
import {
  ZigButton,
  ZignalyIcon,
  ZigPriceLabel,
  ZigTypography,
} from '@zignaly-open/ui';
import { Box, IconButton } from '@mui/material';
import { Add, ChevronRight, Remove } from '@mui/icons-material';
import { WalletTopPanelProps } from './types';
import { useZModal } from 'components/ZModal/use';
import WalletDepositModal from '../../modals/WalletDepositModal';
import BuyZigModal from '../../modals/BuyZigModal';
import WalletWithdrawModal from '../../modals/WalletWithdrawModal';
import WalletPopover from './atoms/WalletPopover';

const WalletTopPanel = ({ balances, coins }: WalletTopPanelProps) => {
  const { t } = useTranslation('wallet');
  const balance = balances?.ZIG?.balance ?? 0;
  const { showModal } = useZModal();
  const rate = coins?.ZIG.usdPrice;
  // Balance Popover
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <TopPanel>
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
              [
                balances?.ZIG?.locked,
                balances?.ZIG?.staked,
                balances?.ZIG?.unstaking,
              ].some((v) => v > 0) && (
                <>
                  <IconButton
                    id={'wallet__coin'}
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                  >
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
          id={'wallet__buy-zig'}
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
          id={'wallet__deposit-zig'}
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
          {t('deposit.deposit-zig')}
        </ZigButton>
        <ZigButton
          id={'wallet__withdraw-zig'}
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
    </TopPanel>
  );
};

export default WalletTopPanel;
