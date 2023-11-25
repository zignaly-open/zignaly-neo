import React from 'react';
import { Box, Divider, Grid, useMediaQuery } from '@mui/material';
import {
  ZigButton,
  ZigModalActions,
  ZigPriceLabel,
  ZigTypography,
} from '@zignaly-open/ui';
import { ZigSwapCircleIcon } from '@zignaly-open/ui/icons';

import { useTranslation } from 'react-i18next';
import { SwapCoinsConfirmFormProps } from './types';
import { useToast } from '../../../../util/hooks/useToast';
import { useConvertMutation } from '../../../../apis/coin/api';
import theme from '../../../../theme';

const SwapCoinsConfirmForm = ({
  toCoin,
  fromCoin,
  toCoinAmount,
  fromCoinAmount,
  refetchBalance,
  close,
  rate,
  internalId,
}: SwapCoinsConfirmFormProps) => {
  const { t } = useTranslation('swap-coins');
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const [convert, convertStatus] = useConvertMutation();
  const handleConvert = () =>
    convert({
      exchangeInternalId: internalId,
      from: fromCoin,
      qty: fromCoinAmount,
      to: toCoin,
    });

  const toast = useToast();
  if (convertStatus?.isSuccess) {
    toast.success(t('toast-success'));
    refetchBalance();
    close();
  }

  return (
    <Grid container direction='column'>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          gap: sm ? 3 : 1,
          flexDirection: sm ? 'row' : 'column',
          alignItems: 'center',
          mt: '5px',
        }}
      >
        <Box>
          <ZigTypography
            variant={sm ? 'h2' : 'h3'}
            mb={sm ? 1.5 : 0.5}
            id={'swap-coins-confirm-modal__from-label'}
          >
            {t('confirmation.from')}
          </ZigTypography>
          <ZigPriceLabel
            id={'swap-coins-confirm-modal__from'}
            showCoinIcon
            coin={fromCoin}
            value={fromCoinAmount}
            variant={'h1'}
            coinProps={{ variant: 'h2' }}
            showTooltip={false}
          />
        </Box>

        <Box mt={sm ? 3 : 0} height={sm ? undefined : '35px'} mb={sm ? 0 : -1}>
          <ZigSwapCircleIcon width={'35px'} height={'35px'} />
        </Box>
        <Box>
          <ZigTypography
            variant={sm ? 'h2' : 'h3'}
            mb={sm ? 1.5 : 0.5}
            id={'swap-coins-confirm-modal__to-label'}
          >
            {t('confirmation.to')}
          </ZigTypography>
          <ZigPriceLabel
            id={'swap-coins-confirm-modal__to'}
            showCoinIcon
            coin={toCoin}
            value={toCoinAmount}
            variant={'h1'}
            coinProps={{ variant: 'h2' }}
            showTooltip={false}
          />
        </Box>
      </Box>

      <Divider
        sx={{
          border: '1px dotted #35334A',
          width: '100%',
          mb: 3,
          mt: sm ? 0 : 2,
        }}
      />

      <Box display={'flex'} textAlign={sm ? 'left' : 'center'}>
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
          flexDirection: sm ? 'row' : 'column',
          gap: '10px',
          backgroundColor: '#0c0d1d',
          mt: '25px',
        }}
      >
        <ZigTypography
          variant={sm ? 'h1' : 'h2'}
          id={'swap-coins-confirm-modal__receive-label'}
        >
          {t('confirmation.receive')}
        </ZigTypography>
        <ZigPriceLabel
          id={'swap-coins-confirm-modal__receive'}
          showTooltip={false}
          variant={'h1'}
          coinProps={{ variant: 'h2' }}
          coin={toCoin}
          value={toCoinAmount}
        />
      </Box>

      <ZigModalActions>
        <ZigButton
          id={'swap-coins-confirm-modal__confirm-swap'}
          onClick={handleConvert}
          variant='contained'
          size='xlarge'
          loading={convertStatus?.isLoading}
          type='submit'
        >
          {t('confirmation.confirm')}
        </ZigButton>
      </ZigModalActions>
    </Grid>
  );
};

export default SwapCoinsConfirmForm;
