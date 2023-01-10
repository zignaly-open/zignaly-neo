import { CircularProgress, Grid } from '@mui/material';
import {
  Loader,
  ZigButton,
  ZigPriceLabel,
  ZigTypography,
} from '@zignaly-open/ui';
import { useGenerateBuyPriceQuery } from 'apis/wallet/api';
import BigNumber from 'bignumber.js';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ZigPriceLabelIcon } from 'views/Dashboard/components/ManageInvestmentModals/forms/WithdrawConfirmForm/atoms/ZigPriceLabelIcon';
import { AmountContainer } from 'views/Dashboard/components/ManageInvestmentModals/forms/WithdrawConfirmForm/styles';
import { SwapConfirmFormProps } from './types';

const SwapConfirmForm = ({
  internalId,
  coinFrom,
  coinTo,
  amount,
  onCancel,
  onDone,
}: SwapConfirmFormProps) => {
  const { t } = useTranslation('wallet');
  const { data: priceInfo } = useGenerateBuyPriceQuery(
    {
      from: coinFrom,
      to: coinTo,
    },
    { pollingInterval: 20000 },
  );
  return (
    <>
      <Grid gap={2} justifyContent='center' display='flex' alignItems='center'>
        <ZigTypography color='neutral300' variant='h2'>
          {t('buy.from')}
        </ZigTypography>
        <ZigPriceLabelIcon amount={amount} coin={coinFrom} iconBucket='coins' />
      </Grid>
      <Grid>
        <ZigTypography color='neutral300' variant='h2'>
          {t('buy.rate')}
        </ZigTypography>
        <ZigTypography fontWeight={600}>
          &nbsp;1&nbsp;{coinTo}&nbsp;=&nbsp;
          {priceInfo?.price ? (
            <ZigPriceLabel
              value={1 / parseFloat(priceInfo.price)}
              coin={coinTo}
            />
          ) : (
            <CircularProgress />
          )}
        </ZigTypography>
      </Grid>
      <AmountContainer coloredBorder={true} sx={{ height: '120px' }}>
        <Grid
          gap={2}
          justifyContent='center'
          display='flex'
          alignItems='center'
        >
          <ZigTypography color='neutral300' variant='h2'>
            {t('buy.willReceive')}
          </ZigTypography>
          <ZigPriceLabelIcon
            amount={BigNumber(amount).times(priceInfo.price).toString()}
            coin={coinTo}
            iconBucket='coins'
          />
        </Grid>
      </AmountContainer>
      <Grid
        item
        display='flex'
        flexDirection='column'
        mt='64px'
        alignItems='center'
        gap={1}
      >
        <ZigButton
          type='submit'
          disabled={!priceInfo?.price}
          variant='contained'
        >
          {t('buy.swapNow')}
        </ZigButton>
        <ZigButton onClick={onCancel} variant='text'>
          {t('common:back')}
        </ZigButton>
      </Grid>
    </>
  );
};

export default SwapConfirmForm;
