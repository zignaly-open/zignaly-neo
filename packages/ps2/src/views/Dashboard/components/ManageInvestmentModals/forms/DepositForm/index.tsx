import React, { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CoinIconWrapper, Form, FullWidthSelect } from './styles';
import {
  dark,
  InputText,
  ErrorMessage,
  ZignalyQRCode,
  ZigSelect,
  CloneIcon,
  Typography,
  CoinIcon,
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

  const coinOptions = useMemo(
    () =>
      coins &&
      balances &&
      Object.entries<CoinBalance & CoinDetail>(
        mergeCoinsAndBalances(coins, balances),
      )
        .map(([ssc, balance]) => ({
          value: ssc,
          name: balance.name,
          label: (
            <CoinIconWrapper>
              <CoinIcon size={'small'} coin={ssc} name={balance.name} />{' '}
              <Typography weight={'regular'}>{balance.name}</Typography>
            </CoinIconWrapper>
          ),
          inOrders: balance.balanceLocked,
          balance: balance.balanceTotal,
          available: balance.balanceFree,
          networks: balance.networks?.map((n) => ({
            label: n.name,
            value: n.network,
            ...n,
          })),
        }))
        .sort((a, b) => a.name?.localeCompare(b.name))
        .filter((x) => !allowedCoins || allowedCoins?.includes(x.value)),
    [coins, allowedCoins],
  );

  const { isFetching: loading, data: depositInfo } = useDepositInfo(
    coin,
    network,
  );

  const coinObject = coin && coinOptions?.find((x) => x.value === coin);
  const networkObject =
    network && coinObject?.networks?.find((x) => x.value === network);

  useEffect(() => {
    if (coin) {
      setValue(
        'network',
        coinObject.networks.length === 1 ? coinObject.networks[0].value : null,
      );
    } else if (coinOptions?.length === 1) {
      setValue('coin', coinOptions[0].value);
    }
  }, [coin]);

  useEffect(() => {
    if (!coin && coinOptions && selectedCoin) {
      const match = coinOptions.find((x) => x.value === selectedCoin);
      match && setValue('coin', match?.value);
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit(() => {})}>
      <Box mt={1} mb={1}>
        <Typography>{t('description')}</Typography>
      </Box>

      <Grid container>
        <Grid item xs={12} md={6} pt={3}>
          <FullWidthSelect>
            <Controller
              name='coin'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <ZigSelect
                  label={t('coinSelector.label')}
                  placeholder={t('coinSelector.placeholder')}
                  {...field}
                  options={coinOptions}
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
                  value={coinObject?.balance ?? ''}
                />
              </Typography>{' '}
              {coinObject?.name ?? ''}
            </Typography>
            <Typography variant='body2' color='neutral200' weight='medium'>
              {t('balances.balanceLocked')}{' '}
              <Typography variant='body2' color='neutral000' weight='medium'>
                <NumberFormat
                  value={coinObject?.inOrders ?? ''}
                  displayType={'text'}
                />
              </Typography>{' '}
              {coinObject?.name ?? ''}
            </Typography>
            <Typography variant='body2' color='neutral200' weight='medium'>
              {t('balances.balanceFree')}{' '}
              <Typography variant='body2' color='neutral000' weight='medium'>
                <NumberFormat
                  value={coinObject?.available ?? ''}
                  displayType={'text'}
                />
              </Typography>{' '}
              {coinObject?.name ?? ''}
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
                <ZigSelect
                  label={t('networkSelector.label')}
                  placeholder={t('networkSelector.placeholder')}
                  {...field}
                  options={coinObject?.networks}
                />
              )}
            />
          </FullWidthSelect>
        </Grid>

        {!!network && networkObject?.depositEnable && (
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

            {networkObject?.label && (
              <Box>
                <ErrorMessage
                  text={t('depositAddress.warning', {
                    network: networkObject?.label,
                    coin: coinObject?.name,
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
                      label={t('depositQR.address', {
                        coin: coinObject?.name,
                      })}
                      url={depositInfo.address}
                    />
                    <ZignalyQRCode
                      label={t('depositQR.memo', { coin: coinObject?.name })}
                      url={depositInfo?.tag}
                    />
                  </Box>
                )}
              </Grid>
            )}
          </>
        )}

        {!!network && !networkObject?.depositEnable && (
          <ErrorMessage text={t('no-network')} />
        )}
      </Grid>
    </Form>
  );
}

export default DepositForm;
