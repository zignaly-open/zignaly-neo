/* eslint-disable i18next/no-literal-string */
import { ArrowDownward } from '@mui/icons-material';
import { Box, CircularProgress, Grid } from '@mui/material';
import {
  Loader,
  ZigButton,
  ZigPriceLabel,
  ZigTypography,
} from '@zignaly-open/ui';
import { useBuyMutation, useGenerateBuyPriceQuery } from 'apis/wallet/api';
import BigNumber from 'bignumber.js';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from 'util/hooks/useToast';
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
  const toast = useToast();
  const [buy, buyStatus] = useBuyMutation();

  const handleSubmit = async () => {
    await buy({
      price: priceInfo.key,
      amount,
      exchangeInternalId: internalId,
    }).unwrap();
    toast.success(t('buy.success', { coin: coinTo }));
    onDone();
  };

  return (
    <Box
      display='flex'
      justifyContent='center'
      flexDirection='column'
      margin='0 auto'
    >
      <AmountContainer
        style={{
          gap: '16px',
          marginTop: '8px',
          padding: '12px 32px',
          placeSelf: 'center',
        }}
      >
        <ZigTypography color='neutral300' variant='h2'>
          {t('buy.from')}
        </ZigTypography>
        <ZigPriceLabelIcon amount={amount} coin={coinFrom} iconBucket='coins' />
      </AmountContainer>
      <Grid my={3} justifyContent='center' display='flex' alignItems='center'>
        <ArrowDownward style={{ width: '36px', height: '36px' }} />
      </Grid>

      <AmountContainer
        coloredBorder={true}
        sx={{
          height: '90px',
          padding: '10px 59px',
        }}
      >
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
            precision={2}
          />
        </Grid>
      </AmountContainer>
      <Grid mt={3} textAlign='center'>
        <ZigTypography color='neutral300' variant='h2'>
          {t('buy.rate')}
        </ZigTypography>
        <ZigTypography
          fontWeight={600}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          &nbsp;1&nbsp;{coinTo}&nbsp;=&nbsp;
          {priceInfo?.price ? (
            <ZigPriceLabel
              value={1 / parseFloat(priceInfo.price)}
              coin={coinTo}
            />
          ) : (
            <CircularProgress size={12} />
          )}
        </ZigTypography>
      </Grid>
      <Grid
        item
        display='flex'
        flexDirection='column'
        mt='64px'
        alignItems='center'
        gap={1}
      >
        <ZigButton
          disabled={!priceInfo?.price}
          variant='contained'
          onClick={handleSubmit}
          loading={buyStatus.isLoading}
        >
          {t('buy.buyNow', { coin: coinTo })}
        </ZigButton>
        <ZigButton onClick={onCancel} variant='text'>
          {t('common:back')}
        </ZigButton>
      </Grid>
    </Box>
  );
};

export default SwapConfirmForm;
