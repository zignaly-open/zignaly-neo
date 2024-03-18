import React from 'react';
import { AmountContainer } from './styles';
import { Grid, Tooltip, useMediaQuery } from '@mui/material';
import {
  ZigButton,
  ZigModalActions,
  ZigPriceLabel,
  ZigTypography,
} from '@zignaly-open/ui';
import ChainIcon from 'components/ChainIcon';
import { useTranslation } from 'react-i18next';
import { WithdrawConfirmFormProps } from './types';
import BigNumber from 'bignumber.js';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import RemoveIcon from '@mui/icons-material/Remove';
import theme from '../../../../../../theme';

const WithdrawConfirmForm = ({
  action,
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
}: WithdrawConfirmFormProps) => {
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const { t } = useTranslation('withdraw-crypto');
  if (status.isSuccess) {
    return (
      <Grid container direction='column'>
        <ZigTypography
          my={1}
          color='neutral200'
          id={'withdraw-modal-confirmation-success__description'}
          textAlign={'center'}
        >
          {t('success.description')}
        </ZigTypography>
        <ZigModalActions>
          <ZigButton
            onClick={close}
            variant='contained'
            size='large'
            id={'withdraw-modal-confirmation-success__close'}
          >
            {t('common:close')}
          </ZigButton>
        </ZigModalActions>
      </Grid>
    );
  }
  const getApproximatedDecimalsNumber = (
    coinToWithdraw: string,
  ): number | undefined => {
    return ['BTC', 'ETH', 'BNB'].includes(coinToWithdraw) ? 4 : undefined;
  };
  const shortenAddress = () => {
    const addressLength = address.length;
    if (addressLength <= 58) return address;
    const visibleCharacters = 27;
    const ellipsis = '......';

    return (
      <Tooltip title={address}>
        <div>
          {address.slice(0, visibleCharacters) +
            ellipsis +
            address.slice(-visibleCharacters)}
        </div>
      </Tooltip>
    );
  };

  return (
    <Grid container direction='column'>
      <ZigTypography
        my={1}
        color='neutral200'
        id={'withdraw-modal-confirmation__description'}
        textAlign={'center'}
      >
        {t('confirmation.description')}
      </ZigTypography>
      <ZigTypography
        mt={4}
        variant={'body2'}
        id={'withdraw-modal-confirmation__network-label'}
      >
        {t('confirmation.network')}
      </ZigTypography>
      <Grid alignItems='center' direction='row' display='flex' gap={2} mt='8px'>
        <ChainIcon
          network={networkCoin}
          id={'withdraw-modal-confirmation__chain-icon'}
        />
        <ZigTypography
          variant='h3'
          color='neutral100'
          sx={{ weight: 'medium' }}
          id={'withdraw-modal-confirmation__network'}
        >
          {networkName}
        </ZigTypography>
      </Grid>
      <ZigTypography
        mt={4}
        variant={'body2'}
        id={'withdraw-modal-confirmation__address-label'}
      >
        {t('confirmation.address')}
      </ZigTypography>
      <ZigTypography
        variant='h3'
        color='neutral100'
        sx={{ weight: 'medium', wordBreak: 'break-all' }}
        id={'withdraw-modal-confirmation__address'}
        mt={'10px'}
      >
        {shortenAddress()}
      </ZigTypography>
      {tag && (
        <>
          <ZigTypography
            mt={4}
            variant={'body2'}
            id={'withdraw-modal-confirmation__memo-label'}
          >
            {t('withdrawMemo.label')}
          </ZigTypography>
          <ZigTypography
            variant='h3'
            color='neutral100'
            sx={{ weight: 'medium' }}
            id={'withdraw-modal-confirmation__memo'}
            mt={'10px'}
          >
            {tag}
          </ZigTypography>
        </>
      )}
      <Grid
        justifyContent='center'
        gap={1}
        alignItems='center'
        mt={4}
        mb={2}
        display='flex'
        direction={sm ? 'row' : 'column'}
      >
        <AmountContainer sx={{ height: '100%', flex: 5 }} noBorders>
          <Grid
            display='flex'
            justifyContent='center'
            direction='column'
            gap={1}
          >
            <ZigTypography
              variant='body2'
              fontWeight='regular'
              noWrap
              id={'withdraw-modal-confirmation__amount-label'}
            >
              {t('confirmation.amount')}
            </ZigTypography>
            <ZigPriceLabel
              precision={getApproximatedDecimalsNumber(coin)}
              showTooltip
              id={'withdraw-modal-confirmation__amount'}
              noWrap
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
              sx={{ display: 'flex', flexDirection: 'column', zIndex: 1 }}
            />
          </Grid>
        </AmountContainer>
        <RemoveIcon sx={{ flex: 1, color: 'neutral400', opacity: 0.8 }} />
        <AmountContainer sx={{ height: '100%', flex: 5 }} noBorders>
          <Grid
            direction='column'
            justifyContent='center'
            display={'flex'}
            gap={1}
          >
            <ZigTypography
              variant='body2'
              fontWeight='medium'
              id={'withdraw-modal-confirmation__network-fee-label'}
              whiteSpace={'nowrap'}
            >
              {t('confirmation.networkFee')}
            </ZigTypography>
            <ZigPriceLabel
              precision={getApproximatedDecimalsNumber(coin)}
              showTooltip
              id={'withdraw-modal-confirmation__network-fee'}
              noWrap
              component='span'
              color='neutral100'
              variant='bigNumber'
              value={+fee}
              coin={coin}
              coinProps={{
                color: 'neutral400',
                variant: 'h3',
                component: 'span',
                fontWeight: 500,
              }}
              sx={{ display: 'flex', flexDirection: 'column', zIndex: 1 }}
            />
          </Grid>
        </AmountContainer>
        <ArrowRightAltIcon
          sx={{
            flex: 1,
            color: 'neutral400',
            opacity: 0.8,
            transform: `rotate(${sm ? 0 : 90}deg)`,
          }}
        />
        <AmountContainer
          sx={{ padding: '20px', flex: 7 }}
          coloredBackground
          noBorders
        >
          <Grid
            direction='column'
            justifyContent='center'
            display={'flex'}
            gap={1}
          >
            <ZigTypography
              color='neutral300'
              variant='body2'
              id={'withdraw-modal-confirmation__receive-label'}
            >
              {t('confirmation.receive')}
            </ZigTypography>
            <ZigPriceLabel
              precision={getApproximatedDecimalsNumber(coin)}
              showTooltip
              id={'withdraw-modal-confirmation__receive'}
              noWrap
              component='span'
              color='neutral100'
              variant='bigNumber'
              coinProps={{
                color: 'neutral400',
                variant: 'h3',
                component: 'span',
                fontWeight: 500,
              }}
              value={
                coin !== feeCoin
                  ? +amount
                  : +BigNumber(amount).minus(fee).toString()
              }
              coin={coin}
              sx={{ display: 'flex', flexDirection: 'column', zIndex: 1 }}
            />
          </Grid>
        </AmountContainer>
      </Grid>

      <ZigModalActions>
        <ZigButton
          id={'withdraw-modal-confirmation__confirm-withdraw'}
          onClick={action}
          variant='contained'
          size='xlarge'
          loading={status.isLoading}
          type='submit'
        >
          {t('confirmation.withdrawNow')}
        </ZigButton>
      </ZigModalActions>
    </Grid>
  );
};

export default WithdrawConfirmForm;
