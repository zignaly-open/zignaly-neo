import React from 'react';
import { AmountContainer } from './styles';
import { Grid } from '@mui/material';
import { ZigButton, ZigInput, ZigTypography } from '@zignaly-open/ui';
import { ModalActionsNew as ModalActions } from 'components/ZModal/ModalContainer/styles';
import { ZigPriceLabelIcon } from './atoms/ZigPriceLabelIcon';
import ChainIcon from 'components/ChainIcon';
import { useTranslation } from 'react-i18next';
import { WithdrawConfirmFormProps } from './types';
import BigNumber from 'bignumber.js';

const WithdrawConfirmForm = ({
  action,
  back,
  status,
  address,
  tag,
  coin,
  networkName,
  networkCoin,
  amount,
  fee,
  feeCoin = coin,
  close,
  iconBucket,
}: WithdrawConfirmFormProps) => {
  const { t } = useTranslation('withdraw-crypto');
  if (status.isSuccess) {
    return (
      <Grid container direction='column'>
        <ZigTypography my={1} color='neutral200'>
          {t('success.description')}
        </ZigTypography>
        <ModalActions align='left'>
          <ZigButton onClick={close} variant='outlined' size='large'>
            {t('common:close')}
          </ZigButton>
        </ModalActions>
      </Grid>
    );
  }

  return (
    <Grid container direction='column'>
      <ZigTypography my={1} color='neutral200'>
        {t('confirmation.description')}
      </ZigTypography>
      <ZigTypography mt={4} color='neutral200'>
        {t('confirmation.network')}
      </ZigTypography>
      <Grid alignItems='center' direction='row' display='flex' gap={2} mt='8px'>
        <ChainIcon network={networkCoin} />
        <ZigTypography
          variant='h2'
          color='neutral100'
          sx={{ weight: 'medium' }}
        >
          {networkName}
        </ZigTypography>
      </Grid>
      <Grid mt={3} gap={3} display='flex' direction='column'>
        <ZigInput
          label={t('confirmation.address')}
          InputProps={{
            readOnly: true,
          }}
          value={address}
          fullWidth
        />
        {tag && (
          <ZigInput
            label={t('withdrawMemo.label')}
            InputProps={{
              readOnly: true,
            }}
            value={tag}
            fullWidth
          />
        )}
      </Grid>
      <Grid
        justifyContent='center'
        gap={2}
        alignItems='center'
        mt={4}
        mb={2}
        display='flex'
        direction='row'
        height='96px'
      >
        <AmountContainer sx={{ height: '100%', flex: 2 }}>
          <Grid display='flex' justifyContent='center' direction='column'>
            <ZigTypography color='neutral200' variant='h3' fontWeight='regular'>
              {t('confirmation.amount')}
            </ZigTypography>
            <ZigPriceLabelIcon
              amount={amount}
              coin={coin}
              iconBucket={iconBucket}
            />
          </Grid>
        </AmountContainer>
        <AmountContainer sx={{ height: '100%', flex: 1 }}>
          <Grid direction='column' justifyContent='center'>
            <ZigTypography
              variant='body2'
              color='neutral200'
              fontWeight='medium'
            >
              {t('confirmation.networkFee')}
            </ZigTypography>
            <ZigPriceLabelIcon
              amount={fee}
              coin={feeCoin}
              iconBucket={iconBucket}
            />
          </Grid>
        </AmountContainer>
      </Grid>

      <AmountContainer coloredBorder={true} sx={{ height: '120px' }}>
        <Grid
          gap={2}
          justifyContent='center'
          display='flex'
          alignItems='center'
        >
          <ZigTypography color='neutral300' variant='h2'>
            {t('confirmation.receive')}
          </ZigTypography>
          <ZigPriceLabelIcon
            amount={
              coin !== feeCoin
                ? amount
                : BigNumber(amount).minus(fee).toString()
            }
            coin={coin}
            iconBucket={iconBucket}
          />
        </Grid>
      </AmountContainer>
      <ModalActions align='right'>
        <ZigButton onClick={back} variant='outlined' size='large'>
          {t('common:back')}
        </ZigButton>
        <ZigButton
          onClick={action}
          variant='contained'
          size='large'
          loading={status.isLoading}
          type='submit'
        >
          {t('confirmation.withdrawNow')}
        </ZigButton>
      </ModalActions>
    </Grid>
  );
};

export default WithdrawConfirmForm;
