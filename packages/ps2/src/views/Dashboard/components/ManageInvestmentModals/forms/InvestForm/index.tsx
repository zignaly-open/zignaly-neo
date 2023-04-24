import React from 'react';
import { Controller, FieldErrorsImpl, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Field, Form } from './styles';
import {
  Button,
  CoinIcon,
  InputAmountAdvanced,
  InputAmountAdvancedValueType,
  InputText,
  SliderInput,
  ZigTypography,
  ZigButton,
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
import { useServiceDetails } from 'apis/service/use';
import BigNumber from 'bignumber.js';
import { Add } from '@mui/icons-material';
import DepositModal from '../../DepositModal';
import { useZModal } from '../../../../../../components/ZModal/use';

function InvestForm({ close, onInvested }: InvestFormProps) {
  const coin = useCurrentBalance();
  const { t } = useTranslation('edit-investment');
  const service = useSelectedInvestment();
  const { isLoading, invest } = useInvestInService(service.serviceId);
  const { data: serviceDetails } = useServiceDetails(service.serviceId);
  const toast = useToast();
  const { showModal } = useZModal();

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
    resolver: yupResolver(
      EditInvestmentValidation({
        max: new BigNumber(serviceDetails.maximumSbt)
          .minus(serviceDetails.invested)
          .minus(serviceDetails.pending)
          .toString(),
        coin: service.ssc,
      }),
    ),
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
              <ZigTypography variant={'body1'}>
                {t('invest-modal.amount-to-invest')}
              </ZigTypography>
              <AmountInvested>
                <CoinIcon coin={coin.id} name={'coin-icon'} />
                <TokenValue>
                  <ZigTypography variant={'bigNumber'} color={'neutral100'}>
                    <NumericFormat
                      value={watch('amountTransfer')!.value.toString()}
                      displayType={'text'}
                      thousandSeparator={true}
                    />
                  </ZigTypography>
                  <ZigTypography variant={'h3'} color={'neutral400'}>
                    {String(coin.id).toUpperCase()}
                  </ZigTypography>
                </TokenValue>
              </AmountInvested>
            </>
          ) : (
            <>
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
                  t(
                    (
                      errors?.amountTransfer as FieldErrorsImpl<InputAmountAdvancedValueType>
                    )?.value?.message,
                  )
                }
                и
                за
                справками
              />

              <Box>
                <ZigButton
                  id={'account-menu-dropdown__deposit'}
                  startIcon={<Add />}
                  sx={{
                    fontWeight: 400,
                    mt: 1,
                    color: (theme) => theme.palette.links,
                  }}
                  variant={'text'}
                  onClick={() =>
                    showModal(DepositModal, {
                      ctaId: 'account-menu-deposit',
                      selectedCoin: coin.id,
                    })
                  }
                >
                  {t('action:deposit-coin', { coin: coin.id })}
                </ZigButton>
              </Box>
            </>
          )}
        </div>
        <div>
          {isConfirmation ? (
            <>
              <ZigTypography variant={'body1'}>
                {t('form.profits.title-confirmation')}
              </ZigTypography>
              <AmountInvested>
                <TokenValue>
                  <ZigTypography variant={'bigNumber'} color={'neutral100'}>
                    <NumericFormat
                      value={watch('profitPercentage').toString()}
                      displayType={'text'}
                      suffix={'%'}
                      thousandSeparator={true}
                    />
                  </ZigTypography>
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
            id={'invest-close'}
            size={'large'}
            type={'button'}
            disabled={isLoading}
            variant={'secondary'}
            caption={t(isConfirmation ? 'common:back' : 'common:close')}
            onClick={isConfirmation ? onGoBackToFirstStep : close}
          />

          <Button
            id={'invest-confirm'}
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
