import React, { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  dark,
  InputText,
  ErrorMessage,
  ZignalyQRCode,
  ZigSelect,
  CloneIcon,
  ZigTypography,
  ZigCoinIcon,
} from '@zignaly-open/ui';
import copy from 'copy-to-clipboard';
import { DepositFormData, WalletDepositModalProps } from './types';
import { Box, Grid } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import CenteredLoader from 'components/CenteredLoader';
import { useToast } from 'util/hooks/useToast';
import { useDepositInfoQuery } from 'apis/wallet/api';
import { useCurrentUser } from 'apis/user/use';
import ChainIcon from 'components/ChainIcon';
import ChainOption, { filterOptions } from './atoms/ChainOption';

function WalletDepositForm({ coins, selectedCoin }: WalletDepositModalProps) {
  const { t } = useTranslation(['deposit-crypto', 'wallet']);
  const toast = useToast();

  const { control, watch } = useForm<DepositFormData>({
    defaultValues: {
      coin: selectedCoin,
    },
  });

  const network = watch('network');
  const networkOptions = coins[selectedCoin]?.networks?.map((n) => ({
    label: <ChainOption network={n.network} name={n.name} />,
    value: n.network,
    name: n.name,
  }));

  // const coinOptions = useMemo(
  //   () =>
  //     allowedDeposits[exchangeType]?.map((ssc) => {
  //       const balance = balances[ssc];
  //       const name = coins[ssc]?.name || '';
  //       return {
  //         value: ssc,
  //         name,
  //         label: <CoinOption coin={ssc} name={name} />,
  //         inOrders: balance?.balanceLocked || 0,
  //         balance: balance?.balanceTotal || 0,
  //         available: balance?.balanceFree || 0,
  //         networks: coins[ssc].networks?.map((n) => ({
  //           label: n.name,
  //           value: n.network,
  //           ...n,
  //         })),
  //       };
  //     }),
  //   [coins, allowedCoins, exchangeType],
  // );

  const { isFetching: loading, data: depositInfo } = useDepositInfoQuery(
    {
      coin: selectedCoin,
      network,
    },
    { skip: !network },
  );

  // const coinObject = coin && coinOptions?.find((x) => x.value === coin);
  const coinObject = coins[selectedCoin];
  const networkObject =
    network && coinObject?.networks?.find((x) => x.network === network);

  // useEffect(() => {
  //   if (coin) {
  //     setValue(
  //       'network',
  //       coinObject.networks.length === 1 ? coinObject.networks[0].value : null,
  //     );
  //   } else if (coinOptions?.length === 1) {
  //     setValue('coin', coinOptions[0].value);
  //   }
  // }, [coin]);

  // useEffect(() => {
  //   if (!coin && coinOptions && selectedCoin) {
  //     const match = coinOptions.find((x) => x.value === selectedCoin);
  //     match && setValue('coin', match?.value);
  //   }
  // }, []);

  // if (isFetchingCoins || isFetchingBalances) {
  //   return <CenteredLoader />;
  // }

  return (
    <form>
      <Box mt={1} mb={1}>
        <ZigTypography>
          {t('deposit.description', {
            coin: selectedCoin,
            ns: 'wallet',
          })}
        </ZigTypography>
      </Box>

      <Grid container>
        <Box display='flex' gap='11px' pt={3}>
          <ZigCoinIcon
            size='small'
            coin={selectedCoin}
            name={coinObject?.name}
            bucket='coins'
          />
          <ZigTypography fontWeight={600}>{selectedCoin}</ZigTypography>&nbsp;
        </Box>

        {/* {!!coinObject && (
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
            >
              {t('balances.total')}{' '}
              <ZigTypography
                variant='body2'
                color='neutral000'
                fontWeight='medium'
              >
                <NumericFormat
                  displayType={'text'}
                  value={coinObject?.balance ?? ''}
                />
              </ZigTypography>{' '}
              {selectedCoin}
            </ZigTypography>
            <ZigTypography
              variant='body2'
              color='neutral200'
              fontWeight='medium'
            >
              {t('balances.balanceFree')}{' '}
              <ZigTypography
                variant='body2'
                color='neutral000'
                fontWeight='medium'
              >
                <NumericFormat
                  value={coinObject?.available ?? ''}
                  displayType={'text'}
                />
              </ZigTypography>{' '}
              {selectedCoin}
            </ZigTypography>
          </Grid>
        )} */}

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
                options={networkOptions}
                filterOption={filterOptions}
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
                  copy(depositInfo?.address);
                  toast.success(t('depositAddress.copied'));
                }}
              />
            </Grid>

            <ErrorMessage
              text={t('depositAddress.warning', {
                network: networkObject?.name,
                coin: coinObject?.name,
              })}
            />

            {!!depositInfo?.memo && (
              <Grid item xs={12} pt={3}>
                <InputText
                  label={t('depositMemo.label')}
                  placeholder={t('depositAddress.placeholder')}
                  readOnly={true}
                  value={loading ? t('depositMemo.loading') : depositInfo?.memo}
                  rightSideElement={
                    <CloneIcon width={40} height={40} color={dark.neutral300} />
                  }
                  onClickRightSideElement={() => {
                    copy(depositInfo?.memo);
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
                  <CenteredLoader />
                </Box>
              ) : (
                <>
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
                      url={depositInfo?.address}
                    />
                    {depositInfo?.memo && (
                      <ZignalyQRCode
                        label={t('depositQR.memo', { coin: coinObject?.name })}
                        url={depositInfo?.memo}
                      />
                    )}
                  </Box>
                </>
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

export default WalletDepositForm;
