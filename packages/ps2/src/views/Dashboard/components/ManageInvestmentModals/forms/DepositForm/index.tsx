import React, { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CoinIconWithMargins, Form, FullWidthSelect } from './styles';
import {
  dark,
  InputText,
  ErrorMessage,
  ZignalyQRCode,
  Select as Selector,
  CloneIcon,
  SelectSizes,
  Typography,
} from '@zignaly-open/ui';
import copy from 'copy-to-clipboard';
import { DepositFormData } from './types';
import { useToast } from '../../../../../../util/hooks/useToast';
import { Box, Grid } from '@mui/material';
import NumberFormat from 'react-number-format';
import {
  useCoinBalances,
  useDepositInfo,
  useExchangeCoinsList,
} from '../../../../../../apis/coin/use';
import { CoinBalance, CoinDetail } from '../../../../../../apis/coin/types';
import { mergeCoinsAndBalances } from '../../../../../../apis/coin/util';
import CenteredLoader from '../../../../../../components/CenteredLoader';
import { DepositModalProps } from '../../types';

function DepositForm({ allowedCoins, selectedCoin }: DepositModalProps) {
  const { t } = useTranslation('deposit-crypto');
  const { data: balances } = useCoinBalances({ convert: true });
  const { data: coins } = useExchangeCoinsList();
  const toast = useToast();

  const { handleSubmit, control, watch, setValue } = useForm<DepositFormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {},
  });

  const coin = watch('coin');
  const network = watch('network');

  const { isFetching: loading, data: depositInfo } = useDepositInfo(
    coin?.id,
    network?.network,
  );

  const coinOptions = useMemo(
    () =>
      coins &&
      balances &&
      Object.entries<CoinBalance & CoinDetail>(
        mergeCoinsAndBalances(coins, balances),
      )
        .map(([ssc, balance]) => ({
          id: ssc,
          caption: balance.name,
          leftElement: (
            <CoinIconWithMargins
              size={'small'}
              coin={ssc}
              name={balance.name}
            />
          ),
          inOrders: balance.balanceLocked,
          balance: balance.balanceTotal,
          available: balance.balanceFree,
          networks: balance.networks?.map((n) => ({
            caption: n.name,
            ...n,
          })),
        }))
        .sort((a, b) => a.caption?.localeCompare(b.caption))
        .filter((x) => !allowedCoins || allowedCoins?.includes(x.id)),
    [coins, allowedCoins],
  );

  useEffect(() => {
    if (coin) {
      setValue('network', coin.networks.length === 1 ? coin.networks[0] : null);
    } else if (coinOptions?.length === 1) {
      setValue('coin', coinOptions[0]);
    }
  }, [coin]);

  useEffect(() => {
    if (!coin && coinOptions && selectedCoin) {
      const match = coinOptions.find((x) => x.id === selectedCoin);
      match && setValue('coin', match);
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit(() => {})}>
      <Box mt={1} mb={1}>
        <Typography>{t('description')}</Typography>
      </Box>

      <Grid container pb={8}>
        <Grid item xs={12} md={6} pt={3}>
          <FullWidthSelect>
            <Controller
              name='coin'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Selector
                  label={t('coinSelector.label')}
                  placeholder={t('coinSelector.placeholder')}
                  size={SelectSizes.LARGE}
                  {...field}
                  options={coinOptions}
                  maxHeight={60}
                  transparent={true}
                />
              )}
            />
          </FullWidthSelect>
        </Grid>

        {!!coin && (
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              pt: 6,
              pl: 6,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant='body2' color='neutral200' weight='medium'>
              {t('balances.total')}{' '}
              <Typography variant='body2' color='neutral000' weight='medium'>
                <NumberFormat
                  displayType={'text'}
                  value={coin?.balance ?? ''}
                />
              </Typography>{' '}
              {coin?.caption ?? ''}
            </Typography>
            <Typography variant='body2' color='neutral200' weight='medium'>
              {t('balances.balanceLocked')}{' '}
              <Typography variant='body2' color='neutral000' weight='medium'>
                <NumberFormat
                  value={coin?.inOrders ?? ''}
                  displayType={'text'}
                />
              </Typography>{' '}
              {coin?.caption ?? ''}
            </Typography>
            <Typography variant='body2' color='neutral200' weight='medium'>
              {t('balances.balanceFree')}{' '}
              <Typography variant='body2' color='neutral000' weight='medium'>
                <NumberFormat
                  value={coin?.available ?? ''}
                  displayType={'text'}
                />
              </Typography>{' '}
              {coin?.caption ?? ''}
            </Typography>
          </Grid>
        )}

        <Grid item xs={12} pt={3}>
          <FullWidthSelect>
            <Controller
              name='network'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Selector
                  label={t('networkSelector.label')}
                  placeholder={t('networkSelector.placeholder')}
                  size={SelectSizes.LARGE}
                  {...field}
                  options={coin?.networks}
                  maxHeight={60}
                  transparent={true}
                />
              )}
            />
          </FullWidthSelect>
        </Grid>

        {!!network && network?.depositEnable && (
          <>
            <Grid item xs={12} pt={3}>
              <InputText
                placeholder={t('depositAddress.placeholder')}
                label={t('depositAddress.label')}
                readOnly={true}
                value={
                  loading ? t('depositAddress.loading') : depositInfo?.address
                }
                rightSideElement={
                  <CloneIcon width={40} height={40} color={dark.neutral300} />
                }
                onClickRightSideElement={() => {
                  copy(depositInfo?.address);
                  toast.success(t('depositAddress.copied'));
                }}
              />
            </Grid>

            {network?.name && (
              <Box>
                <ErrorMessage
                  text={t('depositAddress.warning', {
                    network: network?.name,
                    coin: coin?.caption,
                  })}
                />
              </Box>
            )}

            {!!depositInfo?.tag && (
              <Grid item xs={12} pt={3}>
                <InputText
                  label={t('depositMemo.label')}
                  placeholder={t('depositAddress.placeholder')}
                  readOnly={true}
                  value={loading ? t('depositMemo.loading') : depositInfo?.tag}
                  rightSideElement={
                    <CloneIcon width={40} height={40} color={dark.neutral300} />
                  }
                  onClickRightSideElement={() => {
                    copy(depositInfo?.tag);
                    toast.success(t('depositMemo.copied'));
                  }}
                />
              </Grid>
            )}

            {loading ? (
              <Grid item xs={12}>
                <CenteredLoader />
              </Grid>
            ) : (
              <Grid
                item
                xs={12}
                mt={3}
                sx={{ alignItems: 'center', textAlign: 'center' }}
              >
                {!depositInfo?.tag ? (
                  <ZignalyQRCode url={depositInfo.address} />
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                    }}
                  >
                    <ZignalyQRCode
                      label={t('depositQR.address', { coin: coin?.caption })}
                      url={depositInfo.address}
                    />
                    <ZignalyQRCode
                      label={t('depositQR.memo', { coin: coin?.caption })}
                      url={depositInfo?.tag}
                    />
                  </Box>
                )}
              </Grid>
            )}
          </>
        )}

        {!!network && !network.depositEnable && (
          <ErrorMessage text={t('no-network')} />
        )}
      </Grid>
    </Form>
  );
}

export default DepositForm;
