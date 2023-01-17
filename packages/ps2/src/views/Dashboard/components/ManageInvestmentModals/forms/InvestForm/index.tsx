import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Field, Form } from './styles';
import {
  Button,
  CoinIcon,
  InputAmountAdvanced,
  InputText,
  SliderInput,
  Typography,
} from '@zignaly-open/ui';
import { EditInvestmentValidation } from './validations';
import {
  useCurrentBalance,
  useInvestInService,
  useSelectedInvestment,
} from '../../../../../../apis/investment/use';
import { InvestFormData, InvestFormProps } from './types';
import { useToast } from '../../../../../../util/hooks/useToast';
import { ModalActions } from 'components/ZModal/ModalContainer/styles';
import { Box } from '@mui/material';
import { CheckBox } from '@zignaly-open/ui';
import { AmountInvested, TokenValue } from '../EditInvestmentForm/styles';
import { NumericFormat } from 'react-number-format';

function InvestForm({ close, onInvested }: InvestFormProps) {
  const coin = useCurrentBalance();
  const { t } = useTranslation('edit-investment');
  const service = useSelectedInvestment();
  const { isLoading, invest } = useInvestInService(service.serviceId);
  const toast = useToast();

  // the safe word is Fluggaenkoecchicebolsen
  const transferMagicWord = t('invest-modal.transfer-label');

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    trigger,
    formState: { isValid, isDirty, errors },
  } = useForm<InvestFormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      amountTransfer: {
        value: '',
        token: coin,
      },
      transferLabelForValidation: transferMagicWord,
      transferConfirm: '',
      profitPercentage: 30,
      step: 1,
    },
    resolver: yupResolver(EditInvestmentValidation),
  });

  const canSubmit = isValid && Object.keys(errors).length === 0;

  const onSubmitFirstStep = () => {
    setValue('transferConfirm', '');
    setValue('step', 2);
  };

  const onGoBackToFirstStep = () => {
    setValue('step', 1);
    trigger('transferConfirm');
  };

  const isConfirmation = watch('step') === 2;

  const onSubmitSecondStep = async ({
    profitPercentage,
    amountTransfer,
  }: InvestFormData) => {
    await invest({
      profitPercentage,
      amount: amountTransfer?.value?.toString(),
    });
    toast.success(
      t('edit-investment:addMoreInvestmentSuccess', {
        amount: amountTransfer?.value,
        currency: amountTransfer?.token?.id,
        serviceName: service.serviceName,
      }),
    );
    onInvested();
  };

  return (
    <Form
      onSubmit={handleSubmit(
        isConfirmation ? onSubmitSecondStep : onSubmitFirstStep,
      )}
    >
      <Field>
        <div>
          {isConfirmation ? (
            <>
              <Typography variant={'body1'}>
                {t('invest-modal.amount-to-invest')}
              </Typography>
              <AmountInvested>
                <CoinIcon coin={coin.id} />
                <TokenValue>
                  <Typography variant={'bigNumber'} color={'neutral100'}>
                    <NumericFormat
                      value={watch('amountTransfer')!.value.toString()}
                      displayType={'text'}
                      thousandSeparator={true}
                    />
                  </Typography>
                  <Typography variant={'h3'} color={'neutral400'}>
                    {String(coin.id).toUpperCase()}
                  </Typography>
                </TokenValue>
              </AmountInvested>
            </>
          ) : (
            <InputAmountAdvanced
              name={'amountTransfer'}
              control={control}
              label={t('form.inputAmount.label')}
              labelBalance={t('form.inputAmount.labelBalance')}
              showUnit={true}
              placeholder={'0.0'}
              tokens={[coin]}
              error={
                isDirty &&
                t(errors?.amountTransfer?.value?.message, { maxDecimals: 8 })
              }
            />
          )}
        </div>
        <div>
          {isConfirmation ? (
            <>
              <Typography variant={'body1'}>
                {t('form.profits.title-confirmation')}
              </Typography>
              <AmountInvested>
                <TokenValue>
                  <Typography variant={'bigNumber'} color={'neutral100'}>
                    <NumericFormat
                      value={watch('profitPercentage').toString()}
                      displayType={'text'}
                      suffix={'%'}
                      thousandSeparator={true}
                    />
                  </Typography>
                </TokenValue>
              </AmountInvested>
            </>
          ) : (
            <Controller
              name='profitPercentage'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <SliderInput
                  mode={'range'}
                  labels={{
                    top: t('form.profits.title'),
                    left: t('form.profits.left'),
                    right: t('form.profits.right'),
                  }}
                  value={field.value}
                  initialValue={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          )}
        </div>
      </Field>

      <Box sx={{ mt: 4, display: isConfirmation ? 'block' : 'none' }}>
        <Controller
          name='transferConfirm'
          control={control}
          render={({ field }) => (
            <InputText
              label={t('invest-modal.type-transfer', {
                word: transferMagicWord,
              })}
              placeholder={transferMagicWord}
              disabled={isLoading}
              error={t(errors.transferConfirm?.message)}
              // weird issue with the default value, likely some react form shenanigan
              {...{
                ...field,
                value: typeof field.value === 'string' ? field.value : '',
              }}
            />
          )}
        />
      </Box>

      <Box
        sx={{
          display: isConfirmation ? 'none' : 'flex',
          flexDirection: 'column',
          gap: 2.5,
          mt: 5,
          mb: 5,
        }}
      >
        <Controller
          control={control}
          name='understandMargin'
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <CheckBox
              onChange={onChange}
              value={value}
              label={t('invest-modal.i-understand-margin', {
                coin: service.ssc,
              })}
            />
          )}
        />

        <Controller
          control={control}
          name='understandMoneyTransferred'
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <CheckBox
              onChange={onChange}
              value={value}
              label={t('invest-modal.i-understand-money-transferred')}
            />
          )}
        />
      </Box>

      <ModalActions>
        <Box
          sx={{
            fledDirection: 'column',
            display: 'flex',
            width: '100%',
            gap: '20px',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            size={'large'}
            type={'button'}
            disabled={isLoading}
            variant={'secondary'}
            caption={t(isConfirmation ? 'common:back' : 'common:close')}
            onClick={isConfirmation ? onGoBackToFirstStep : close}
          />

          <Button
            size={'large'}
            type={'submit'}
            loading={isLoading}
            caption={
              isConfirmation
                ? t('form.button.invest-now', {
                    amount: watch('amountTransfer')!.value.toString(),
                    coin: coin.id,
                  })
                : t('form.button.continue-to-confirmation')
            }
            disabled={!canSubmit}
          />
        </Box>
      </ModalActions>
    </Form>
  );
}

export default InvestForm;
