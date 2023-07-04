import React from 'react';
import { Box, Divider, Grid } from '@mui/material';
import { ZigButton, ZigPriceLabel, ZigTypography } from '@zignaly-open/ui';
import { ModalActions as ModalActions } from 'components/ZModal/ModalContainer/styles';

import { useTranslation } from 'react-i18next';
import { SwapCoinsConfirmFormProps } from './types';
import { useToast } from '../../../../util/hooks/useToast';
import { SwapHoriz } from '@mui/icons-material';

const SwapCoinsConfirmForm = ({
  action,
  status,
  toCoin,
  fromCoin,
  toCoinAmount,
  fromCoinAmount,
  close,
  rate,
}: SwapCoinsConfirmFormProps) => {
  const { t } = useTranslation('swap-coins');
  const toast = useToast();
  if (status.isSuccess) {
    toast.success('Successfully converted');
    close();
  }

  return (
    <Grid container direction='column'>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <ZigPriceLabel
          showCoinIcon
          coin={fromCoin}
          value={fromCoinAmount}
          variant={'h1'}
          label={t('confirmation.from')}
          coinProps={{ variant: 'h2' }}
          showTooltip
        />
        <SwapHoriz sx={{ width: '30px', height: '30px', mt: '20px' }} />
        <ZigPriceLabel
          showCoinIcon
          coin={toCoin}
          value={toCoinAmount}
          variant={'h1'}
          label={t('confirmation.to')}
          coinProps={{ variant: 'h2' }}
          showTooltip
        />
      </Box>
      <Divider
        sx={{ border: '1px dotted #35334A', width: '90%', mb: '10px' }}
      />
      <Box display={'flex'}>
        <ZigTypography variant={'body1'} mr={'10px'}>
          {t('confirmation.rate')}
        </ZigTypography>
        <ZigPriceLabel coin={fromCoin} value={1} showTooltip />
        {' = '}
        <ZigPriceLabel coin={toCoin} value={rate} showTooltip />
      </Box>

      <ModalActions>
        <ZigButton
          id={'withdraw-modal-confirmation__confirm-withdraw'}
          onClick={action}
          variant='contained'
          size='xlarge'
          loading={status.isLoading}
          type='submit'
        >
          {t('confirmation.confirm')}
        </ZigButton>
      </ModalActions>
    </Grid>
  );
};

export default SwapCoinsConfirmForm;
