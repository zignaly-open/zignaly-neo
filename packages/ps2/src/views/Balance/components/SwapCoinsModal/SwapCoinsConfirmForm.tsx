import React from 'react';
import { Box, Divider, Grid } from '@mui/material';
import {
  ZigButton,
  ZigPriceLabel,
  ZigSwapCircleIcon,
  ZigTypography,
} from '@zignaly-open/ui';
import { ModalActions as ModalActions } from 'components/ZModal/ModalContainer/styles';

import { useTranslation } from 'react-i18next';
import { SwapCoinsConfirmFormProps } from './types';
import { useToast } from '../../../../util/hooks/useToast';

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
    toast.success(t('toast-success'));
    close();
  }

  return (
    <Grid container direction='column'>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          gap: 3,
          alignItems: 'center',
        }}
      >
        <Box>
          <ZigTypography variant={'h2'} mb={'12px'} id={'swap-coins-confirm-modal__from-label'}>
            {t('confirmation.from')}
          </ZigTypography>
          <ZigPriceLabel
            id={'swap-coins-confirm-modal__from'}
            showCoinIcon
            coin={fromCoin}
            value={fromCoinAmount}
            variant={'h1'}
            coinProps={{ variant: 'h2' }}
            showTooltip
          />
        </Box>

        <Box mt={'25px'}>
          <ZigSwapCircleIcon width={'35px'} height={'35px'} />
        </Box>
        <Box>
          <ZigTypography variant={'h2'} mb={'12px'} id={'swap-coins-confirm-modal__to-label'}>
            {t('confirmation.to')}
          </ZigTypography>
          <ZigPriceLabel
            id={'swap-coins-confirm-modal__to'}
            showCoinIcon
            coin={toCoin}
            value={toCoinAmount}
            variant={'h1'}
            coinProps={{ variant: 'h2' }}
            showTooltip
          />
        </Box>
      </Box>
      <Divider
        sx={{ border: '1px dotted #35334A', width: '100%', mb: '25px' }}
      />
      <Box display={'flex'}>
        <ZigTypography
          variant={'body1'}
          mr={'10px'}
          id={'swap-coins-confirm-modal__rate-label'}
        >
          {t('confirmation.rate')}
        </ZigTypography>
        <ZigPriceLabel
          coin={fromCoin}
          value={1}
          showTooltip
          id={'swap-coins-confirm-modal__rate-from'}
        />
        &nbsp;{'='}&nbsp;
        <ZigPriceLabel
          coin={toCoin}
          value={rate}
          showTooltip
          id={'swap-coins-confirm-modal__rate-to'}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          padding: '25px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: '#0c0d1d',
          mt: '25px',
        }}
      >
        <ZigTypography variant={'h1'}>
          {t('confirmation.receive')}
        </ZigTypography>
        <ZigPriceLabel
          exact
          variant={'h1'}
          coinProps={{ variant: 'h2' }}
          coin={toCoin}
          value={toCoinAmount}
        />
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
