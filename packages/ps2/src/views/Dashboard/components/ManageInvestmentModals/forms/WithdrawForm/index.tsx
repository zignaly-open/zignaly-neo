import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CoinIconWrapper, Form, FullWidthSelect } from './styles';
import {
  ErrorMessage,
  ZigSelect,
  CoinIcon,
  InputAmountAdvanced,
  Button,
  ZigInput,
  ZigTypography,
} from '@zignaly-open/ui';
import { WithdrawFormData } from './types';
import { Box, Grid } from '@mui/material';
import {
  useCoinBalances,
  useExchangeCoinsList,
} from '../../../../../../apis/coin/use';
import { WithdrawModalProps } from '../../types';
import { yupResolver } from '@hookform/resolvers/yup';
import { WithdrawValidation } from './validations';
import WithdrawConfirmForm from '../WithdrawConfirmForm';
import CenteredLoader from 'components/CenteredLoader';
import { ModalActionsNew as ModalActions } from 'components/ZModal/ModalContainer/styles';

function WithdrawForm({ setStep, selectedCoin, close }: WithdrawModalProps) {
  const { t } = useTranslation('withdraw-crypto');
  const { data: balances, isFetching: isFetchingBalances } = useCoinBalances({
    convert: true,
  });
  const { data: coins, isFetching: isFetchingCoins } = useExchangeCoinsList();
  const [confirmationData, setConfirmationData] = useState<WithdrawFormData>();

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { isValid, errors },
  } = useForm<WithdrawFormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      address: '',
      tag: '',
    },
    resolver: (data, context, options) =>
      yupResolver(WithdrawValidation(networkObject))(data, context, options),
  });

  const coin = watch('coin') as string;
  const network = watch('network') as string;

  const coinOptions = useMemo(
    () =>
      Object.entries(balances)
        .filter(([c]) => coins[c])
        .map(([c, balance]) => {
          const name = coins[c]?.name || '';
          return {
            value: c,
            name,
            label: (
              <CoinIconWrapper>
                <CoinIcon size={'small'} coin={c} name={name} />{' '}
                <ZigTypography fontWeight={600}>{c} </ZigTypography> &nbsp;
                <ZigTypography>{name}</ZigTypography>
              </CoinIconWrapper>
            ),
            available: balance?.maxWithdrawAmount || 0,
            networks: coins[c].networks?.map((n) => ({
              label: n.name,
              value: n.network,
              ...n,
            })),
          };
        }),
    [balances, coins],
  );

  const coinObject = coin && coinOptions?.find((x) => x.value === coin);
  const networkObject =
    network && coinObject?.networks?.find((x) => x.value === network);

  useEffect(() => {
    if (coin) {
      setValue(
        'network',
        coinObject.networks.length === 1 ? coinObject.networks[0].value : null,
        { shouldValidate: true },
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

  useEffect(() => {
    const { amount, address } = getValues();
    if (amount && amount.value !== '') {
      trigger('amount');
    }

    if (address) {
      trigger('address');
    }
  }, [network]);

  const canSubmit = isValid && Object.keys(errors).length === 0;

  if (isFetchingCoins || isFetchingBalances) {
    return <CenteredLoader />;
  }

  if (confirmationData) {
    return (
      <WithdrawConfirmForm
        coin={coin}
        back={() => {
          setConfirmationData(null);
          setStep('');
        }}
        close={close}
        setStep={setStep}
        {...confirmationData}
        amount={confirmationData.amount.value.toString()}
        network={networkObject}
      />
    );
  }

  return (
    <Form
      onSubmit={handleSubmit((data) => {
        setStep('confirm');
        setConfirmationData(data);
      })}
      autoComplete='off'
    >
      <Box mt={1} mb={1}>
        <ZigTypography>{t('description')}</ZigTypography>
      </Box>

      <Grid container>
        <Grid item xs={12} pt={3}>
          <FullWidthSelect>
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
                  {...field}
                />
              )}
            />
          </FullWidthSelect>
        </Grid>

        <Grid item xs={12} pt={3}>
          <FullWidthSelect>
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
                  options={coinObject?.networks}
                  {...field}
                />
              )}
            />
          </FullWidthSelect>
        </Grid>

        {!!network && !networkObject?.withdrawEnable ? (
          <Box mt={7}>
            <ErrorMessage text={networkObject?.withdrawDesc} />
          </Box>
        ) : (
          <>
            <Grid item xs={12} pt={3}>
              <Controller
                name='address'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <ZigInput
                    fullWidth
                    label={t('withdrawAddress.label')}
                    placeholder={t('withdrawAddress.placeholder')}
                    error={t(errors.address?.message)}
                    {...field}
                  />
                )}
              />
            </Grid>

            {networkObject?.label && (
              <Box>
                <ErrorMessage
                  text={t('withdrawAddress.warning', {
                    network: networkObject?.label,
                    coin: coinObject?.name,
                  })}
                />
              </Box>
            )}

            {!!networkObject?.memoRegex && (
              <Grid item xs={12} pt={3}>
                <Controller
                  name='tag'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <ZigInput
                      fullWidth
                      label={t('withdrawMemo.label')}
                      placeholder={t('withdrawMemo.placeholder')}
                      error={t(errors.tag?.message)}
                      {...field}
                    />
                  )}
                />
              </Grid>
            )}

            {coinObject && (
              <Grid item xs={12} mt={3}>
                <InputAmountAdvanced
                  name='amount'
                  control={control}
                  label={t('amountToWithdraw.label')}
                  labelBalance={t('amountToWithdraw.labelBalance')}
                  showUnit={true}
                  placeholder='0.0'
                  tokens={[
                    {
                      id: coin,
                      balance: coinObject.available,
                    },
                  ]}
                  error={t(errors?.amount?.value?.message)}
                />
              </Grid>
            )}

            <ModalActions align='right'>
              <Button
                size={'large'}
                type={'button'}
                variant={'secondary'}
                caption={t('common:close')}
                onClick={close}
              />

              <Button
                size={'large'}
                type={'submit'}
                caption={t('confirmation.continue')}
                disabled={!canSubmit}
              />
            </ModalActions>
          </>
        )}
      </Grid>
    </Form>
  );
}

export default WithdrawForm;
