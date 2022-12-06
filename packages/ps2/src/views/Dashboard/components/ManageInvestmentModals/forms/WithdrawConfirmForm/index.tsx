import React from 'react';
import { AmountContainer } from './styles';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ConfirmWithdrawalModalProps } from './types';
import {
  CoinIcon,
  ZigButton,
  ZigInput,
  ZigPriceLabel,
  ZigTypography,
} from '@zignaly-open/ui';
import { useWithdrawMutation } from 'apis/coin/api';
import { useActiveExchange, useCheck2FA } from 'apis/user/use';
import { ModalActionsNew as ModalActions } from 'components/ZModal/ModalContainer/styles';

const ZigPriceLabelIcon = ({
  amount,
  coin,
}: {
  amount: string | number;
  coin: string;
}) => {
  return (
    <Box display='flex' gap={1} alignItems='center' justifyContent='center'>
      <CoinIcon name={coin} coin={coin} />
      <ZigPriceLabel
        component='span'
        color='neutral100'
        variant='bigNumber'
        value={+amount}
        coin={coin}
        coinProps={{
          color: 'neutral400',
          variant: 'h3',
          component: 'span',
          fontWeight: 500,
        }}
      />
    </Box>
  );
};

const WithdrawConfirmForm = ({
  coin,
  address,
  tag,
  back,
  close,
  setStep,
  network,
  amount,
}: ConfirmWithdrawalModalProps) => {
  const { t } = useTranslation('withdraw-crypto');
  const { internalId } = useActiveExchange();
  const [withdraw, withdrawStatus] = useWithdrawMutation();

  const withdraw2FA = useCheck2FA({
    status: withdrawStatus,
    action: async (code?: string) => {
      await withdraw({
        asset: coin,
        network: network.network,
        exchangeInternalId: internalId,
        address,
        tag,
        amount,
        code,
      }).unwrap();
      setStep('success');
    },
  });

  if (withdrawStatus.isSuccess) {
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
        <CoinIcon name={coin} coin={coin} />
        <ZigTypography
          variant='h2'
          color='neutral100'
          sx={{ weight: 'medium' }}
        >
          {network.name}
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
            <ZigPriceLabelIcon amount={amount} coin={coin} />
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
            <ZigPriceLabelIcon amount={network.withdrawFee} coin={coin} />
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
            amount={parseFloat(amount) - parseFloat(network.withdrawFee)}
            coin={coin}
          />
        </Grid>
      </AmountContainer>
      <ModalActions align='right'>
        <ZigButton onClick={back} variant='outlined' size='large'>
          {t('common:back')}
        </ZigButton>
        <ZigButton
          onClick={() => withdraw2FA()}
          variant='contained'
          size='large'
          loading={withdrawStatus.isLoading}
          type='submit'
        >
          {t('confirmation.withdrawNow')}
        </ZigButton>
      </ModalActions>
    </Grid>
  );
};

export default WithdrawConfirmForm;
