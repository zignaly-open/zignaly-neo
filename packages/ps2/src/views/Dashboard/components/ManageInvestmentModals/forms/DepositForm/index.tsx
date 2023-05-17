import React, { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { ReactComponent as BinanceLogo } from '../../../../../../images/binance.svg';
import {
  ErrorMessage,
  ZigQrCode,
  ZigSelect,
  Loader,
  ZigTypography,
  ZigCopyText,
  ZigLink,
} from '@zignaly-open/ui';
import NorthEastIcon from '@mui/icons-material/NorthEast';
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
import {
  BUY_CRYPTO_URL,
  DEPOSIT_INFO_URL,
} from '../../../../../../util/constants';

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
          label: <CoinOption key={ssc} coin={ssc} name={name} />,
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
        <ZigTypography id={'modal-deposit__description'}>
          <Trans t={t} i18nKey={'description'}>
            <BinanceLogo
              width={16}
              height={16}
              style={{
                verticalAlign: 'middle',
              }}
            />
            <ZigLink
              href={DEPOSIT_INFO_URL}
              id={'modal-deposit-description__external-link'}
            ></ZigLink>
          </Trans>
        </ZigTypography>
      </Box>

      <Grid container>
        <Grid item xs={12} md={6} pt={3}>
          <Controller
            name='coin'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <ZigSelect
                id={'modal-deposit__select-coin'}
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
            <ZigTypography
              variant='body2'
              color='neutral200'
              fontWeight='medium'
              id={'modal-deposit-balances__total-text'}
            >
              {t('balances.total')}{' '}
              <ZigTypography
                variant='body2'
                color='neutral000'
                fontWeight='medium'
              >
                <NumericFormat
                  id={'modal-deposit-balances__total'}
                  displayType={'text'}
                  value={coinObject?.balance ?? ''}
                />
              </ZigTypography>{' '}
              {coin ?? ''}
            </ZigTypography>
            <ZigTypography
              variant='body2'
              color='neutral200'
              fontWeight='medium'
              id={'modal-deposit-balances__locked-text'}
            >
              {t('balances.balanceLocked')}{' '}
              <ZigTypography
                variant='body2'
                color='neutral000'
                fontWeight='medium'
              >
                <NumericFormat
                  id={'modal-deposit-balances__locked'}
                  value={coinObject?.inOrders ?? ''}
                  displayType={'text'}
                />
              </ZigTypography>{' '}
              {coin ?? ''}
            </ZigTypography>
            <ZigTypography
              variant='body2'
              color='neutral200'
              fontWeight='medium'
              id={'modal-deposit-balances__free-text'}
            >
              {t('balances.balanceFree')}{' '}
              <ZigTypography
                variant='body2'
                color='neutral000'
                fontWeight='medium'
              >
                <NumericFormat
                  id={'modal-deposit-balances__free'}
                  value={coinObject?.available ?? ''}
                  displayType={'text'}
                />
              </ZigTypography>{' '}
              {coin ?? ''}
            </ZigTypography>
          </Grid>
        )}

        <Grid item xs={12} pt={3}>
          <Controller
            name='network'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <ZigSelect
                id={'modal-deposit__select-network'}
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
              <ZigCopyText
                id={'modal-deposit__deposit-address'}
                copyElementId={'modal-deposit__deposit-address-copy'}
                label={t('depositAddress.label')}
                value={
                  loading ? t('depositAddress.loading') : depositInfo?.address
                }
                onCopied={() => {
                  trackCta({
                    userId,
                    ctaId: 'copy-deposit-address',
                  });
                  toast.success(t('depositAddress.copied'));
                }}
                error={
                  !!networkObject?.label &&
                  t('depositAddress.warning', {
                    network: networkObject?.label,
                    coin: coinObject?.name,
                  })
                }
              />
            </Grid>

            {!!depositInfo?.tag && (
              <Grid item xs={12} pt={3}>
                <ZigCopyText
                  id={'deposit__deposit-memo'}
                  copyElementId={'modal-deposit__deposit-memo-copy'}
                  label={t('depositMemo.label')}
                  value={loading ? t('depositMemo.loading') : depositInfo?.tag}
                  onCopied={() => {
                    trackCta({
                      userId,
                      ctaId: 'copy-deposit-memo',
                    });
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
                  <Loader />
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
                  <ZigQrCode
                    id={'modal-deposit__deposit-qr-address'}
                    label={t('depositQR.address', {
                      coin: coinObject?.name,
                    })}
                    url={depositInfo.address}
                  />
                  {depositInfo?.tag && (
                    <ZigQrCode
                      id={'modal-deposit__deposit-qr-memo'}
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
        <Grid item xs={12} pt={3}>
          <ZigTypography variant={'body2'} color={'neutral300'}>
            <ZigLink
              href={BUY_CRYPTO_URL}
              target={'_blank'}
              id={'modal-deposit__buy-crypto-link'}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: 0.5,
                  alignItems: 'center',
                }}
              >
                {t('buy-crypto')}
                <NorthEastIcon fontSize={'inherit'} />
              </Box>
            </ZigLink>
          </ZigTypography>
        </Grid>
      </Grid>
    </form>
  );
}

export default DepositForm;
