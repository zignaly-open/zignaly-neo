import React, { useEffect, useMemo, useState } from 'react';
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
  ZigButton,
  trimZeros,
  ZigModalForm,
  ZigAlertMessage,
} from '@zignaly-open/ui';
import { ZigListIcon } from '@zignaly-open/ui/icons';
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
import { useActiveExchange } from '../../../../../../apis/user/use';
import CoinOption, { filterOptions } from '../atoms/CoinOption';
import { DEPOSIT_INFO_URL } from '../../../../../../util/constants';
import { ROUTE_MY_BALANCES_TRANSACTIONS } from 'routes';
import { useNavigate } from 'react-router-dom';
import useTrackEvent from '../../../../../../components/Navigation/Tracker/use';
import { useOpenBuyModal } from '../../BuyModal';

const BinanceBroker = ({ children }: { children?: JSX.Element }) => {
  return (
    <Box component='span' whiteSpace='nowrap'>
      <BinanceLogo
        width={16}
        height={16}
        style={{
          marginRight: '5px',
          marginBottom: '-3px',
        }}
        id={'deposit-modal-description__binance-logo'}
      />
      {children}
    </Box>
  );
};

function DepositForm({ allowedCoins, selectedCoin, close }: DepositModalProps) {
  const { t } = useTranslation('deposit-crypto');
  const { data: balances } = useCoinBalances({ convert: true });
  const { data: coins } = useExchangeCoinsList();
  const { exchangeType } = useActiveExchange()!;
  const toast = useToast();
  const trackEvent = useTrackEvent();
  const navigate = useNavigate();
  const [coinParam, setCoinParam] = useState(null);

  const { handleSubmit, control, watch, setValue } = useForm<DepositFormData>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {},
  });

  const coin = watch('coin');
  const network = watch('network');

  useEffect(() => {
    network && trackEvent('select-network');
  }, [network]);

  useEffect(() => {
    coin && trackEvent('select-coin');
  }, [coin]);

  const coinOptions = useMemo(
    () =>
      allowedDeposits[exchangeType]?.map((ssc) => {
        const balance = balances[ssc];
        const name = coins[ssc]?.name || '';
        return {
          value: ssc,
          name,
          label: (
            <CoinOption
              key={ssc}
              coin={ssc}
              name={name}
              prefixId={'deposit-modal'}
            />
          ),
          inOrders: balance?.balanceLocked || 0,
          balance: balance?.balanceTotal || 0,
          available: balance?.balanceFree || 0,
          networks: coins[ssc].networks
            ?.filter((n) => n.network.toUpperCase() !== 'LIGHTNING')
            .map((n) => ({
              label: n.name,
              value: n.network,
              ...n,
            })),
        };
      }),
    [coins, allowedCoins, exchangeType],
  );
  const coinObject = coin && coinOptions?.find((x) => x.value === coin);
  const networkObject =
    network && coinObject?.networks?.find((x) => x.value === network);
  const {
    isFetching: loading,
    data: depositInfo,
    error,
  } = useDepositInfo(coinParam, network, networkObject?.depositEnable);

  useEffect(() => {
    depositInfo && trackEvent('show-deposit-info');
  }, [depositInfo]);

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
    // Hack to only start refetching after the above useEffect has updated the network
    // Because switching coin will change the network
    setCoinParam(coin);
  }, [coin]);

  const specialTips = coinObject?.networks?.find(
    (n) => n.network === network,
  )?.specialTips;

  useEffect(() => {
    if (!coin && coinOptions && selectedCoin) {
      const match = coinOptions.find((x) => x.value === selectedCoin);
      match && setValue('coin', match?.value);
    }
  }, []);

  const navigateHistory = () => {
    // Close invest modal
    close();
    navigate(ROUTE_MY_BALANCES_TRANSACTIONS);
  };
  const showBuyModal = useOpenBuyModal();

  return (
    <ZigModalForm onSubmit={handleSubmit(() => {})}>
      <ZigTypography id={'deposit-modal__description'} textAlign='center'>
        <Trans t={t} i18nKey={'description'}>
          <BinanceBroker />
          <ZigLink
            href={DEPOSIT_INFO_URL}
            id={'deposit-modal-description__external-link'}
          ></ZigLink>
        </Trans>
      </ZigTypography>

      <Grid container rowGap={3}>
        <Grid container xs={12}>
          <Grid item xs={12} md={6}>
            <Controller
              name='coin'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <ZigSelect
                  id={'deposit-modal__select-coin'}
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
                pt: { xs: 2.5, md: '35px' },
                pl: { xs: 0, md: 6 },
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <ZigTypography
                variant='body2'
                color='neutral200'
                id={'deposit-modal-balances__free-text'}
              >
                {t('balances.balanceFree')}{' '}
                <ZigTypography variant='body2' color='neutral200'>
                  <NumericFormat
                    id={'deposit-modal-balances__free'}
                    value={trimZeros(coinObject?.available) ?? ''}
                    displayType={'text'}
                  />
                </ZigTypography>{' '}
                {coin ?? ''}
              </ZigTypography>
              <ZigTypography
                variant='body2'
                color='neutral400'
                id={'deposit-modal-balances__locked-text'}
              >
                {t('balances.balanceLocked')}{' '}
                <ZigTypography variant='body2' color='neutral400'>
                  <NumericFormat
                    id={'deposit-modal-balances__locked'}
                    value={trimZeros(coinObject?.inOrders) ?? ''}
                    displayType={'text'}
                  />
                </ZigTypography>{' '}
                {coin ?? ''}
              </ZigTypography>
              <ZigTypography
                color='neutral400'
                variant='body2'
                id={'deposit-modal-balances__total-text'}
              >
                {t('balances.total')}{' '}
                <ZigTypography variant='body2' color='neutral400'>
                  <NumericFormat
                    id={'deposit-modal-balances__total'}
                    displayType={'text'}
                    value={trimZeros(coinObject?.balance) ?? ''}
                  />
                </ZigTypography>{' '}
                {coin ?? ''}
              </ZigTypography>
            </Grid>
          )}
        </Grid>

        <Grid item container xs={12}>
          <Grid item md={6} xs={12}>
            <Controller
              name='network'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <ZigSelect
                  id={'deposit-modal__select-network'}
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

          {!!network && (!networkObject?.depositEnable || error) && (
            <Grid item xs={12}>
              <ErrorMessage
                text={
                  !networkObject?.depositEnable
                    ? t('no-network')
                    : t('network-unavailable')
                }
              />
            </Grid>
          )}
        </Grid>

        {!!network && networkObject?.depositEnable && !error && (
          <>
            <Grid item xs={12}>
              <ZigCopyText
                id={'deposit-modal__deposit-address'}
                copyElementId={'deposit-modal__deposit-address-copy'}
                label={t('depositAddress.label')}
                value={
                  loading ? t('depositAddress.loading') : depositInfo?.address
                }
                onCopied={() => {
                  trackEvent('deposit-modal__deposit-address');
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

            {!!specialTips && (
              <Grid item xs={12} mt={'-20px'}>
                <ZigAlertMessage
                  text={specialTips}
                  id={'deposit-modal__special-tip'}
                />
              </Grid>
            )}

            {!!depositInfo?.tag && (
              <Grid item xs={12}>
                <ZigCopyText
                  id={'deposit-modal__deposit-memo'}
                  copyElementId={'deposit-modal__deposit-memo-copy'}
                  label={t('depositMemo.label')}
                  value={loading ? t('depositMemo.loading') : depositInfo?.tag}
                  onCopied={() => {
                    trackEvent('deposit-modal__deposit-memo');
                    toast.success(t('depositMemo.copied'));
                  }}
                />
              </Grid>
            )}

            <Grid
              item
              xs={12}
              sx={{
                minHeight: '160px',
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
                    height: '160px',
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
                    mt: '-6px',
                    mb: 2,
                  }}
                >
                  <ZigQrCode
                    id={'deposit-modal__deposit-qr-address'}
                    label={
                      depositInfo?.tag &&
                      t('depositQR.address', {
                        coin: coinObject?.name,
                      })
                    }
                    url={depositInfo?.address}
                    extraInfo={!depositInfo?.tag && t('depositQR.scan')}
                    size={130}
                    height={160}
                    width={160}
                  />
                  {depositInfo?.tag && (
                    <ZigQrCode
                      id={'deposit-modal__deposit-qr-memo'}
                      label={t('depositQR.memo', {
                        coin: coinObject?.name,
                      })}
                      url={depositInfo?.tag}
                      size={130}
                      height={160}
                      width={160}
                    />
                  )}
                </Box>
              )}
            </Grid>
          </>
        )}

        <Grid
          item
          xs={12}
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mt={
            // Hack to fit without scrolling
            !!network &&
            networkObject?.depositEnable &&
            !error &&
            !depositInfo?.tag
              ? '-28px'
              : 0
          }
        >
          <ZigButton
            id={'deposit-modal__purchase'}
            variant='text'
            onClick={() => showBuyModal()}
          >
            {t('buy-crypto')}
          </ZigButton>
          <ZigButton
            id={'deposit-modal__history'}
            startIcon={
              <ZigListIcon
                width={'22px'}
                height={'22px'}
                color={'neutral100'}
                style={{
                  verticalAlign: 'middle',
                }}
              />
            }
            variant='text'
            onClick={navigateHistory}
          >
            {t('history')}
          </ZigButton>
        </Grid>
      </Grid>
    </ZigModalForm>
  );
}

export default DepositForm;
