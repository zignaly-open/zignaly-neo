import React, { useEffect, useMemo, useState } from 'react';
import { Controller, FieldErrorsImpl, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ErrorMessage,
  ZigSelect,
  InputAmountAdvanced,
  ZigButton,
  ZigInput,
  ZigTypography,
  InputAmountAdvancedValueType,
  CenteredLoader,
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
import { ModalActionsNew as ModalActions } from 'components/ZModal/ModalContainer/styles';
import CoinOption, { filterOptions } from '../atoms/CoinOption';
import LabelValueLine from './atoms/LabelValueLine';
import WithdrawConfirmForm from '../WithdrawConfirmForm';
import { useWithdrawMutation } from 'apis/coin/api';
import { useActiveExchange, useCheck2FA } from 'apis/user/use';

function WithdrawForm({ setStep, selectedCoin, close }: WithdrawModalProps) {
  const { t } = useTranslation('withdraw-crypto');
  const { data: balances, isLoading: isLoadingBalances } = useCoinBalances({
    convert: true,
  });
  const { data: coins, isLoading: isLoadingCoins } = useExchangeCoinsList();
  const [confirmationData, setConfirmationData] = useState<WithdrawFormData>();
  const { internalId } = useActiveExchange();
  const [withdraw, withdrawStatus] = useWithdrawMutation();

  const check2FA = useCheck2FA({
    status: withdrawStatus,
  });

  const handleWithdraw = async () => {
    check2FA(async (code) => {
      await withdraw({
        asset: coin,
        network: confirmationData.network,
        exchangeInternalId: internalId,
        address: confirmationData.address,
        tag: confirmationData.tag,
        amount: confirmationData.amount.value.toString(),
        code,
      }).unwrap();

      setStep('success');
    });
  };

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

  const coinOptions = useMemo(() => {
    if (!balances || !coins) return [];

    return Object.entries(balances)
      .filter(
        ([c, balance]) =>
          (parseFloat(balance.balanceTotal) > 0 || c == selectedCoin) &&
          coins[c],
      )
      .map(([c, balance]) => {
        const name = coins[c]?.name || '';
        return {
          value: c,
          name,
          label: (
            <CoinOption
              key={c}
              coin={c}
              name={name}
              prefixId={'withdraw-modal'}
            />
          ),
          available: balance?.maxWithdrawAmount || 0,
          networks: coins[c].networks?.map((n) => ({
            label: n.name,
            value: n.network,
            ...n,
          })),
        };
      });
  }, [balances, coins]);

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
        action={handleWithdraw}
        status={withdrawStatus}
        back={() => {
          setConfirmationData(null);
          setStep('');
        }}
        {...confirmationData}
        amount={Number(confirmationData.amount.value)}
        networkName={networkObject.name}
        networkCoin={networkObject.coin}
        coin={coin}
        fee={parseFloat(networkObject.withdrawFee)}
        close={close}
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
        <ZigTypography id={'withdraw-modal-description'}>
          {t('description')}
        </ZigTypography>
      </Box>

      <Grid container>
        <Grid item xs={12} pt={3}>
          <Controller
            name='coin'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <ZigSelect
                id={'withdraw-modal__select-coin'}
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
                id={'withdraw-modal__select-network'}
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
          <Box mt={2}>
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
                    id={'withdraw-modal__input-address'}
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
                  id={'withdraw-modal__input-address-warning'}
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
                      id={'withdraw-modal__input-memo'}
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
                  id={'withdraw-modal__input-amount'}
                  control={control}
                  label={t('amountToWithdraw.label')}
                  showUnit={true}
                  showBalance={false}
                  placeholder='0.0'
                  tokens={[
                    {
                      id: coin,
                      balance: coinObject.available,
                    },
                  ]}
                  error={t(
                    (
                      errors?.amount as FieldErrorsImpl<InputAmountAdvancedValueType>
                    )?.value?.message,
                  )}
                />
                <Box mt={1}>
                  <LabelValueLine
                    prefixId={'withdraw-modal-balance'}
                    label={t('amountToWithdraw.labelBalance')}
                    value={coinObject.available.toString()}
                    coin={coin}
                  />
                </Box>
                {networkObject && (
                  <>
                    <LabelValueLine
                      prefixId={'withdraw-modal-minimum'}
                      label={t('amountToWithdraw.minimum')}
                      value={networkObject.withdrawMin}
                      coin={coin}
                    />
                    <LabelValueLine
                      prefixId={'withdraw-modal-fee'}
                      label={t('amountToWithdraw.fee')}
                      value={networkObject.withdrawFee}
                      coin={coin}
                    />
                  </>
                )}
              </Grid>
            )}

            <ModalActions align='right'>
              <ZigButton
                id={'withdraw-modal__close'}
                size={'large'}
                type={'button'}
                variant={'outlined'}
                onClick={close}
              >
                {t('common:close')}
              </ZigButton>

              <ZigButton
                id={'withdraw-modal__continue'}
                size={'large'}
                type={'submit'}
                disabled={!canSubmit}
              >
                {t('confirmation.continue')}
              </ZigButton>
            </ModalActions>
          </>
        )}
      </Grid>
    </form>
  );
}

export default WithdrawForm;
