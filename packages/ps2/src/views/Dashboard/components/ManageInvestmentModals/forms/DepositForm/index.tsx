import React, { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  dark,
  InputText,
  ErrorMessage,
  ZignalyQRCode,
  ZigSelect,
  CloneIcon,
  Typography,
  Loader,
} from '@zignaly-open/ui';
import copy from 'copy-to-clipboard';
import { DepositFormData } from './types';
import { useToast } from '../../../../../../util/hooks/useToast';
import { Box, Grid } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import {
  useCoinBalances,
  useDepositInfo,
  useExchangeCoinsList,
} from '../../../../../../apis/coin/use';
import { DepositModalProps } from '../../types';
import { allowedDeposits } from '../../../../../../util/coins';
import {
  useActiveExchange,
  useCurrentUser,
} from '../../../../../../apis/user/use';
import CoinOption, { filterOptions } from '../atoms/CoinOption';
import { trackCta } from '@zignaly-open/tracker';

function DepositForm({ allowedCoins, selectedCoin }: DepositModalProps) {
  const { t } = useTranslation('deposit-crypto');
  const { data: balances } = useCoinBalances({ convert: true });
  const { data: coins } = useExchangeCoinsList();
  const { exchangeType } = useActiveExchange();
  const { userId } = useCurrentUser();
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
      allowedDeposits[exchangeType]?.map((ssc) => {
        const balance = balances[ssc];
        const name = coins[ssc]?.name || '';
        return {
          value: ssc,
          name,
          label: <CoinOption coin={ssc} name={name} />,
          inOrders: balance?.balanceLocked || 0,
          balance: balance?.balanceTotal || 0,
          available: balance?.balanceFree || 0,
          networks: coins[ssc].networks?.map((n) => ({
            label: n.name,
            value: n.network,
            ...n,
          })),
        };
      }),
    [coins, allowedCoins, exchangeType],
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
    <form onSubmit={handleSubmit(() => {})}>
      <Box mt={1} mb={1}>
        <Typography>{t('description')}</Typography>
      </Box>

      <Grid container>
        <Grid item xs={12} md={6} pt={3}>
          <Controller
            name='coin'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <ZigSelect
                menuPlacement='auto'
                menuShouldScrollIntoView={false}
                menuPosition='fixed'
                menuShouldBlockScroll
                label={t('coinSelector.label')}
                placeholder={t('coinSelector.placeholder')}
                options={coinOptions}
                filterOption={filterOptions}
                {...field}
              />
            )}
          />
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
                <NumericFormat
                  displayType={'text'}
                  value={coinObject?.balance ?? ''}
                />
              </Typography>{' '}
              {coin ?? ''}
            </Typography>
            <Typography variant='body2' color='neutral200' weight='medium'>
              {t('balances.balanceLocked')}{' '}
              <Typography variant='body2' color='neutral000' weight='medium'>
                <NumericFormat
                  value={coinObject?.inOrders ?? ''}
                  displayType={'text'}
                />
              </Typography>{' '}
              {coin ?? ''}
            </Typography>
            <Typography variant='body2' color='neutral200' weight='medium'>
              {t('balances.balanceFree')}{' '}
              <Typography variant='body2' color='neutral000' weight='medium'>
                <NumericFormat
                  value={coinObject?.available ?? ''}
                  displayType={'text'}
                />
              </Typography>{' '}
              {coin ?? ''}
            </Typography>
          </Grid>
        )}

        <Grid item xs={12} pt={3}>
          <Controller
            name='network'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <ZigSelect
                menuPosition='fixed'
                menuShouldBlockScroll
                menuShouldScrollIntoView={false}
                label={t('networkSelector.label')}
                placeholder={t('networkSelector.placeholder')}
                {...field}
                options={coinObject?.networks}
              />
            )}
          />
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
                  trackCta({
                    userId,
                    ctaId: 'copy-deposit-address',
                  });
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
                    trackCta({
                      userId,
                      ctaId: 'copy-deposit-memo',
                    });
                    copy(depositInfo?.tag);
                    toast.success(t('depositMemo.copied'));
                  }}
                />
              </Grid>
            )}

            <Grid
              item
              xs={12}
              mt={3}
              sx={{
                minHeight: '200px',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              {loading ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '200px',
                  }}
                >
                  <Loader
                    color={'#fff'}
                    width={'40px'}
                    height={'40px'}
                    ariaLabel={t('loading')}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    flexDirection: ['column', 'row'],
                    gap: 2,
                  }}
                >
                  <ZignalyQRCode
                    label={t('depositQR.address', {
                      coin: coinObject?.name,
                    })}
                    url={depositInfo.address}
                  />
                  {depositInfo?.tag && (
                    <ZignalyQRCode
                      label={t('depositQR.memo', {
                        coin: coinObject?.name,
                      })}
                      url={depositInfo?.tag}
                    />
                  )}
                </Box>
              )}
            </Grid>
          </>
        )}

        {!!network && !networkObject?.depositEnable && (
          <ErrorMessage text={t('no-network')} />
        )}
      </Grid>
    </form>
  );
}

export default DepositForm;
