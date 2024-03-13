import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ErrorMessage,
  ZigSelect,
  ZigButton,
  ZigInput,
  CenteredLoader,
  ZigInputAmount,
  ZigModalActions,
  ZigModalForm,
  ZigAlertMessage,
} from '@zignaly-open/ui';
import { ZigListIcon } from '@zignaly-open/ui/icons';
import { WithdrawFormData } from './types';
import { Box, useMediaQuery } from '@mui/material';
import {
  useCoinBalances,
  useDepositInfo,
  useExchangeCoinsList,
} from '../../../../../../apis/coin/use';
import { WithdrawModalProps } from '../../types';
import { yupResolver } from '@hookform/resolvers/yup';
import { MEMO_SPECIAL_TIP, withdrawAmountValidation } from './validations';
import CoinOption, { filterOptions } from '../atoms/CoinOption';
import WithdrawConfirmForm from '../WithdrawConfirmForm';
import { useWithdrawMutation } from 'apis/coin/api';
import { useActiveExchange, useCheckWithdraw } from 'apis/user/use';
import { ROUTE_MY_BALANCES_TRANSACTIONS } from 'routes';
import { useNavigate } from 'react-router-dom';
import theme from '../../../../../../theme';

function WithdrawForm({
  setStep,
  selectedCoin,
  close,
  step,
}: WithdrawModalProps) {
  const navigate = useNavigate();
  const { t } = useTranslation('withdraw-crypto');
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const { data: balances, isLoading: isLoadingBalances } = useCoinBalances({
    convert: true,
  });
  const { data: coins, isLoading: isLoadingCoins } = useExchangeCoinsList();
  const [confirmationData, setConfirmationData] = useState<WithdrawFormData>();
  const { internalId } = useActiveExchange()!;
  const [withdraw, withdrawStatus] = useWithdrawMutation();

  const checkWithdraw = useCheckWithdraw({
    status: withdrawStatus,
  });

  const handleWithdraw = async () => {
    checkWithdraw(async (code) => {
      await withdraw({
        asset: coin,
        network: confirmationData!.network,
        exchangeInternalId: internalId,
        address: confirmationData!.address,
        tag: confirmationData!.tag,
        amount: confirmationData!.amount,
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
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      address: '',
      tag: '',
      amount: '',
    },
    resolver: (data, context, options) =>
      yupResolver(
        withdrawAmountValidation(
          coin,
          coinObject?.available.toString(),
          networkObject,
          memoRequired,
        ),
      )(data, context, options),
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

  // Use deposit address to check if memo is required, as a last fallback
  const depositEndpoint = useDepositInfo(
    coin,
    coinObject?.networks?.find((n) => n.value === network)?.network,
    // Lightning deposit not supported atm
    network !== 'LIGHTNING',
  );
  const memoRequired =
    !!networkObject?.memoRegex ||
    networkObject?.specialTips === MEMO_SPECIAL_TIP ||
    (!depositEndpoint.isFetching && !!depositEndpoint.data?.tag);

  useEffect(() => {
    if (coin) {
      // Clear network on coin change
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
    if (amount) {
      trigger('amount');
    }

    if (address) {
      trigger('address');
    }
  }, [network]);
  const specialTips = coinObject?.networks?.find(
    (n) => n.network === network,
  )?.specialTips;

  const canSubmit = isValid && Object.keys(errors).length === 0;

  if (isLoadingCoins || isLoadingBalances) {
    return <CenteredLoader />;
  }

  if (confirmationData && ['confirm', 'success'].includes(step)) {
    return (
      <WithdrawConfirmForm
        action={handleWithdraw}
        status={withdrawStatus}
        {...confirmationData}
        amount={Number(confirmationData.amount)}
        networkName={networkObject.name}
        networkCoin={networkObject.network}
        coin={coin}
        fee={parseFloat(networkObject.withdrawFee)}
        close={close}
      />
    );
  }

  return (
    <ZigModalForm
      onSubmit={handleSubmit((data) => {
        setStep('confirm');
        setConfirmationData(data);
      })}
      autoComplete='off'
    >
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
            width={md ? 260 : undefined}
            {...field}
          />
        )}
      />

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
            width={md ? 260 : undefined}
            {...field}
          />
        )}
      />

      {!!network && !networkObject?.withdrawEnable ? (
        <Box mt='-21px'>
          <ErrorMessage text={networkObject?.withdrawDesc} />
        </Box>
      ) : (
        <>
          <div>
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
          </div>

          {!!specialTips && (
            <Box mt={'-20px'}>
              <ZigAlertMessage
                text={specialTips}
                id={'withdraw-modal__special-tip'}
              />
            </Box>
          )}

          {memoRequired && (
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
          )}

          <Box sx={{ minHeight: 134 }}>
            {coinObject && (
              <Controller
                name={'amount'}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <ZigInputAmount
                    id={'withdraw-modal__input-amount'}
                    label={t('amountToWithdraw.label')}
                    wide={true}
                    coin={coin}
                    balance={coinObject.available}
                    min={networkObject?.withdrawMin}
                    extraInfo={{
                      wrapExtraInfo: 3,
                      others: networkObject?.withdrawFee && [
                        {
                          label: t('amountToWithdraw.fee'),
                          value: networkObject?.withdrawFee,
                        },
                      ],
                    }}
                    error={t(errors?.amount?.message)}
                    {...field}
                  />
                )}
              />
            )}
          </Box>

          <ZigModalActions position='relative'>
            <ZigButton
              id={'withdraw-modal__continue'}
              size={'large'}
              type={'submit'}
              disabled={!canSubmit}
            >
              {t('confirmation.continue')}
            </ZigButton>
            <ZigButton
              sx={md ? { position: 'absolute', right: '-22px', bottom: 0 } : {}}
              id={'withdraw-modal__history'}
              startIcon={
                <ZigListIcon
                  width={'24px'}
                  height={'24px'}
                  color={'neutral100'}
                  style={{
                    verticalAlign: 'middle',
                  }}
                />
              }
              variant='text'
              onClick={() => {
                navigate(ROUTE_MY_BALANCES_TRANSACTIONS);
                close();
              }}
            >
              {t('history')}
            </ZigButton>
          </ZigModalActions>
        </>
      )}
    </ZigModalForm>
  );
}

export default WithdrawForm;
