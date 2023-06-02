import React, { useEffect, useMemo, useState } from 'react';
import { Controller, FieldErrorsImpl, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ErrorMessage,
  ZigSelect,
  InputAmountAdvanced,
  ZigInput,
  ZigTypography,
  ZigCoinIcon,
  ZigButton,
  InputAmountAdvancedValueType,
  CenteredLoader,
} from '@zignaly-open/ui';
import { WalletWithdrawModalProps, WithdrawFormData } from './types';
import { Box } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { WithdrawValidation } from './validations';
import {
  Form,
  ModalActions as ModalActions,
} from 'components/ZModal/ModalContainer/styles';
import LabelValueLine from './atoms/LabelValueLine';
import {
  useBalanceQuery,
  useGenerateWithdrawFeeQuery,
  useWithdrawMutation,
} from 'apis/wallet/api';
import WithdrawConfirmForm from 'views/Dashboard/components/ManageInvestmentModals/forms/WithdrawConfirmForm';
import { useCheck2FA } from 'apis/user/use';
import { useZModal } from 'components/ZModal/use';
import WalletDepositModal from '../WalletDepositModal';

function WalletWithdrawForm({
  setStep,
  step,
  selectedCoin,
  close,
  coins,
}: WalletWithdrawModalProps) {
  const { t } = useTranslation('withdraw-crypto');
  const [confirmationData, setConfirmationData] = useState<WithdrawFormData>();
  const { data: balances, isLoading: isLoadingBalances } = useBalanceQuery();
  const { showModal } = useZModal();

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
      yupResolver(
        WithdrawValidation(
          networkObject,
          Number(feeInfo?.floatFee),
          selectedCoin,
        ),
      )(data, context, options),
  });

  const network = watch('network') as string;

  const coinObject = coins[selectedCoin];
  const networkObject =
    network && coinObject?.networks?.find((x) => x.network === network);
  const networkOptions = useMemo(
    () =>
      coinObject
        ? coinObject.networks?.map((n) => ({
            label: n.name,
            value: n.network,
          }))
        : [],
    [coinObject],
  );

  const { data: feeInfo } = useGenerateWithdrawFeeQuery(
    {
      network,
      coin: selectedCoin,
    },
    {
      skip: !network,
      pollingInterval: 7500,
    },
  );

  const [withdraw, withdrawStatus] = useWithdrawMutation();

  const check2FA = useCheck2FA({
    status: withdrawStatus,
  });

  const handleWithdraw = async () => {
    check2FA(async (code) => {
      await withdraw({
        network: confirmationData.network,
        coin: confirmationData.coin,
        address: confirmationData.address,
        amount: confirmationData.amount.value.toString(),
        fee: feeInfo.key,
        memo: confirmationData.tag,
        ...(code && { code }),
      }).unwrap();
      setStep('success');
    });
  };

  useEffect(() => {
    if (coinObject) {
      setValue(
        'network',
        coinObject.networks.length === 1
          ? coinObject.networks[0].network
          : null,
        { shouldValidate: true },
      );
    }
  }, [networkOptions]);

  useEffect(() => {
    const { amount, address } = getValues();
    if (amount?.value) {
      trigger('amount');
    }

    if (address) {
      trigger('address');
    }
  }, [network, feeInfo]);

  if (isLoadingBalances) {
    return <CenteredLoader />;
  }

  // Withdrawing other coins than chain coins needs ZIG
  const feesPaidFromZigBalance =
    feeInfo?.feeCurrency === 'ZIG' && selectedCoin !== 'ZIG';
  const feeCoin = feesPaidFromZigBalance ? 'ZIG' : selectedCoin;
  const notEnoughZig =
    feeCoin === 'ZIG' && balances?.ZIG?.balance < parseFloat(feeInfo?.floatFee);

  const balance = balances[selectedCoin]?.availableBalance ?? 0;

  if (confirmationData && step === 'confirm') {
    return (
      <WithdrawConfirmForm
        coin={selectedCoin}
        close={close}
        {...confirmationData}
        amount={Number(confirmationData.amount.value)}
        networkName={networkObject.name}
        networkCoin={networkObject.network}
        action={handleWithdraw}
        status={withdrawStatus}
        fee={Number(feeInfo.floatFee)}
        feeCoin={feeCoin}
      />
    );
  }

  return (
    <Form
      onSubmit={handleSubmit((data) => {
        setStep('confirm');
        setConfirmationData({ ...data, coin: selectedCoin });
      })}
      autoComplete='off'
    >
      <ZigTypography>{t('description')}</ZigTypography>

      <Box display='flex' gap='11px'>
        <ZigCoinIcon
          size='small'
          coin={selectedCoin}
          name={coinObject?.name}
          bucket='coins'
        />
        <ZigTypography fontWeight={600}>{selectedCoin}</ZigTypography>&nbsp;
      </Box>

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
            options={networkOptions}
            {...field}
          />
        )}
      />

      {!!network && !networkObject?.withdrawEnable ? (
        <ErrorMessage text={t('wallet:notAvailable')} />
      ) : (
        <>
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

          {!!networkObject?.memoRegex && (
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
          )}

          {coinObject && (
            <div>
              <InputAmountAdvanced
                name='amount'
                control={control}
                label={t('amountToWithdraw.label')}
                showUnit={true}
                showBalance={false}
                placeholder='0.0'
                iconBucket='coins'
                tokens={[
                  {
                    id: selectedCoin,
                    balance,
                  },
                ]}
                error={
                  t(
                    (
                      errors?.amount as FieldErrorsImpl<InputAmountAdvancedValueType>
                    )?.value?.message,
                  ) ||
                  (notEnoughZig && (
                    <>
                      {t('notEnoughZig')}&nbsp;
                      <ZigButton
                        variant={'text'}
                        onClick={() => {
                          close();
                          setTimeout(() => {
                            showModal(WalletDepositModal, {
                              selectedCoin: 'ZIG',
                              coins,
                            });
                          });
                        }}
                      >
                        {t('wallet:buy.deposit.depositCoin', {
                          coin: 'ZIG',
                        })}
                      </ZigButton>
                    </>
                  ))
                }
              />
              <Box mt={1}>
                <LabelValueLine
                  label={t('amountToWithdraw.labelBalance')}
                  value={balance.toString()}
                  coin={selectedCoin}
                />
              </Box>
              {feeInfo && (
                <LabelValueLine
                  label={t('amountToWithdraw.fee')}
                  value={feeInfo.floatFee}
                  coin={feeCoin}
                />
              )}
            </div>
          )}

          <ModalActions>
            <ZigButton
              variant={'contained'}
              id={'withdraw__continue'}
              size={'large'}
              type={'submit'}
              disabled={!isValid || !feeInfo || notEnoughZig}
            >
              {t('confirmation.continue')}
            </ZigButton>
          </ModalActions>
        </>
      )}
    </Form>
  );
}

export default WalletWithdrawForm;
