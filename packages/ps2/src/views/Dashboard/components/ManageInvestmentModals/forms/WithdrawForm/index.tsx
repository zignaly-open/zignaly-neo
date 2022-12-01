import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CoinIconWrapper, Form, FullWidthSelect, ModalActions } from './styles';
import {
  dark,
  InputText,
  ErrorMessage,
  ZignalyQRCode,
  ZigSelect,
  CloneIcon,
  Typography,
  CoinIcon,
  Loader,
  InputAmountAdvanced,
  Button,
  ZigInput,
} from '@zignaly-open/ui';
import copy from 'copy-to-clipboard';
import { WithdrawFormData } from './types';
import { useToast } from '../../../../../../util/hooks/useToast';
import { Box, Grid } from '@mui/material';
import NumberFormat from 'react-number-format';
import {
  useCoinBalances,
  useExchangeCoinsList,
} from '../../../../../../apis/coin/use';
import { DepositModalProps, WithdrawModalProps } from '../../types';
import { allowedDeposits } from '../../../../../../util/coins';
import { useActiveExchange } from '../../../../../../apis/user/use';
import { useWithdrawMutation } from 'apis/coin/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { WithdrawValidation } from './validations';
import { CoinNetwork } from 'apis/coin/types';
import WithdrawConfirmForm from '../WithdrawConfirmForm';
import CenteredLoader from 'components/CenteredLoader';

function WithdrawForm({
  isConfirmation,
  setIsConfirmation,
  selectedCoin,
}: WithdrawModalProps) {
  const { t } = useTranslation('withdraw-crypto');
  const { data: balances, isFetching: isFetchingBalances } = useCoinBalances({
    convert: true,
  });
  const { data: coins, isFetching: isFetchingCoins } = useExchangeCoinsList();
  console.log(coins);
  const [confirmationData, setConfirmationData] = useState<WithdrawFormData>();
  const { internalId, exchangeType } = useActiveExchange();
  const [withdraw, withdrawStatus] = useWithdrawMutation();
  const toast = useToast();

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { isValid, errors },
    trigger,
  } = useForm<WithdrawFormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {},
    // resolver: yupResolver(WithdrawValidation()),
    resolver: (data, context, options) => {
      // const validatorSchema = formValidatorSchemaByPaymentModalityType(
      //   data.paymentType.value,
      // );
      // console.log(data, context, options, coinObject);
      const { addressRegex, memoRegex } = networkObject as CoinNetwork;
      return yupResolver(WithdrawValidation(addressRegex, memoRegex))(
        data,
        context,
        options,
      );
    },
  });

  const coin = watch('coin');
  const network = watch('network');

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
                <Typography weight={'demibold'}>{c} </Typography> &nbsp;
                <Typography weight={'regular'}>{name}</Typography>
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

  const canSubmit = isValid && Object.keys(errors).length === 0;

  const onSubmitFirstStep = (data: WithdrawFormData) => {
    setIsConfirmation(true);
    setConfirmationData(data);
    // setValue('transferConfirm', '');
    // setValue('step', 2);
  };

  const onGoBackToFirstStep = () => {
    setIsConfirmation(false);
    // setValue('step', 1);
    // trigger('transferConfirm');
  };

  // const isConfirmation = watch('step') === 2;

  const onSubmitSecondStep = async (data: WithdrawFormData) => {
    return console.log(data);
    await withdraw({
      exchangeInternalId: internalId,
      ...data,
    });
    // toast.success(
    //   t('edit-investment:addMoreInvestmentSuccess', {
    //     amount: amountTransfer?.value,
    //     currency: amountTransfer?.token?.id,
    //     serviceName: service.serviceName,
    //   }),
    // );
    // onInvested();
  };

  if (isFetchingCoins || isFetchingBalances) {
    return <CenteredLoader />;
  }

  if (isConfirmation) {
    return (
      <WithdrawConfirmForm
        networkCaption={networkObject.name}
        coin={coin}
        withdrawAddress={confirmationData.address}
        onBack={() => setIsConfirmation(false)}
      />
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitFirstStep)} autoComplete='off'>
      <Box mt={1} mb={1}>
        <Typography>{t('description')}</Typography>
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

        {!!network && networkObject?.withdrawEnable && (
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
          </>
        )}

        {!!network && !networkObject?.withdrawEnable && (
          <ErrorMessage text={t('no-network')} />
        )}

        {/* Wait for coinObject since InputAmountAdvanced only renders available balance at init */}
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
              // error={isDirty && t(errors?.amountTransfer?.value?.message)}
            />
          </Grid>
        )}

        <ModalActions>
          <Button
            size={'large'}
            type={'button'}
            // disabled={withdrawStatus.isLoading}
            variant={'secondary'}
            caption={t(isConfirmation ? 'common:back' : 'common:close')}
            onClick={isConfirmation ? onGoBackToFirstStep : close}
          />

          <Button
            size={'large'}
            type={'submit'}
            // disabled={withdrawStatus.isLoading}
            caption={
              isConfirmation
                ? t('confirmation.withdrawNow')
                : t('confirmation.continue')
            }
            disabled={!canSubmit}
          />
        </ModalActions>
      </Grid>
    </Form>
  );
}

export default WithdrawForm;
