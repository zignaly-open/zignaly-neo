import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ErrorMessage,
  ZigQrCode,
  ZigSelect,
  ZigTypography,
  ZigCoinIcon,
  ZigCopyText,
  CenteredLoader,
} from '@zignaly-open/ui';
import { DepositFormData, WalletDepositModalProps } from './types';
import { Box, Grid } from '@mui/material';
import { useToast } from 'util/hooks/useToast';
import { useDepositInfoQuery } from 'apis/wallet/api';
import ChainOption, { filterOptions } from './atoms/ChainOption';

function WalletDepositForm({ coins, selectedCoin }: WalletDepositModalProps) {
  const { t } = useTranslation(['deposit-crypto', 'wallet']);
  const toast = useToast();

  const { control, watch } = useForm<DepositFormData>({
    defaultValues: {},
  });

  const network = watch('network');
  const networkOptions = coins[selectedCoin]?.networks?.map((n) => ({
    label: <ChainOption network={n.network} name={n.name} />,
    value: n.network,
    name: n.name,
  }));

  const { isFetching: loading, data: depositInfo } = useDepositInfoQuery(
    {
      coin: selectedCoin,
      network,
    },
    { skip: !network },
  );

  const coinObject = coins[selectedCoin];
  const networkObject =
    network && coinObject?.networks?.find((x) => x.network === network);

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

        <Grid item xs={12} pt={3}>
          <Controller
            name='network'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <ZigSelect
                id={'deposit__select-network'}
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
              <ZigCopyText
                label={t('depositAddress.label')}
                value={
                  loading ? t('depositAddress.loading') : depositInfo?.address
                }
                onCopied={() => toast.success(t('depositAddress.copied'))}
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
                <ZigCopyText
                  label={t('depositMemo.label')}
                  value={loading ? t('depositMemo.loading') : depositInfo?.memo}
                  onCopied={() => toast.success(t('depositMemo.copied'))}
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
                      flexDirection: ['column', 'row'],
                      gap: 2,
                    }}
                  >
                    <ZigQrCode
                      label={t('depositQR.address', {
                        coin: coinObject?.name,
                      })}
                      url={depositInfo?.address}
                    />
                    {depositInfo?.memo && (
                      <ZigQrCode
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
