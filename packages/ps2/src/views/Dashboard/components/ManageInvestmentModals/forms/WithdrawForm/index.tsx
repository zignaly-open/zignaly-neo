import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ErrorMessage,
  ZigSelect,
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
import CoinOption, { filterOptions } from '../atoms/CoinOption';
import LabelValueLine from './atoms/LabelValueLine';

function WithdrawForm({ setStep, selectedCoin, close }: WithdrawModalProps) {
  const { t } = useTranslation('withdraw-crypto');
  const { data: balances, isLoading: isLoadingBalances } = useCoinBalances({
    convert: true,
  });
  const { data: coins, isLoading: isLoadingCoins } = useExchangeCoinsList();
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
        .filter(
          ([c, balance]) => parseFloat(balance.balanceTotal) > 0 && coins[c],
        )
        .map(([c, balance]) => {
          const name = coins[c]?.name || '';
          return {
            value: c,
            name,
            label: <CoinOption coin={c} name={name} />,
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

  if (isLoadingCoins || isLoadingBalances) {
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
    <form
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
                options={coinObject?.networks}
                {...field}
              />
            )}
          />
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
                    },
                  ]}
                  error={t(errors?.amount?.value?.message)}
                />
                <LabelValueLine
                  label={t('amountToWithdraw.labelBalance')}
                  value={coinObject.available.toString()}
                  coin={coin}
                />
                {networkObject && (
                  <>
                    <LabelValueLine
                      label={t('amountToWithdraw.minimum')}
                      value={networkObject.withdrawMin}
                      coin={coin}
                    />
                    <LabelValueLine
                      label={t('amountToWithdraw.fee')}
                      value={networkObject.withdrawFee}
                      coin={coin}
                    />
                  </>
                )}
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
    </form>
  );
}

export default WithdrawForm;
