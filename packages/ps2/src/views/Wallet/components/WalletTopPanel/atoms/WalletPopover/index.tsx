import { Box, Divider } from '@mui/material';
import { ZigPriceLabel, ZigTypography } from '@zignaly-open/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledPopover } from './styles';
import { BalanceRowProps, WalletPopoverProps } from './types';

const BalanceRow = ({ label, amount, coin }: BalanceRowProps) => (
  <Box display='flex' justifyContent='space-between' width={1} gap={1}>
    <ZigTypography>{label}</ZigTypography>
    <ZigPriceLabel value={amount} coin={coin.name} />
  </Box>
);

const WalletPopover = ({
  anchorEl,
  handleClose,
  balance,
  coin,
  showLocked,
}: WalletPopoverProps) => {
  const { t } = useTranslation('wallet');

  return (
    <StyledPopover
      anchorEl={anchorEl}
      onClose={handleClose}
      open={Boolean(anchorEl)}
    >
      {showLocked && (
        <>
          <BalanceRow
            label={t('balance.available')}
            amount={balance.availableBalance}
            coin={coin}
          />
          <BalanceRow
            label={t('balance.locked')}
            amount={balance.locked}
            coin={coin}
          />
          <Divider
            style={{
              background: '#413ba0',
              width: '100%',
              margin: '15px 10px',
              alignSelf: 'center',
            }}
          />
        </>
      )}
      <BalanceRow
        label={t('balance.staked')}
        amount={balance.staked}
        coin={coin}
      />
      <BalanceRow
        label={t('balance.unstaking')}
        amount={balance.unstaking}
        coin={coin}
      />
    </StyledPopover>
  );
};

export default WalletPopover;
