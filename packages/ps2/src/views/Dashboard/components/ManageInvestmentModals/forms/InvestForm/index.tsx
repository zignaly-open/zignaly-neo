import React from 'react';
import { Controller, FieldErrorsImpl, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import {
  InputAmountAdvancedValueType,
  ZigTypography,
  ZigButton,
  ZigInput,
  ZigCoinIcon,
  ZigInputAmount,
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

  const renderDepositCoin = () => (
    <ZigButton
      id={'invest-modal__deposit'}
      startIcon={<Add />}
      sx={{
        fontWeight: 400,
        // mt: 1,
        // color: (theme) => theme.palette.links,
        color: 'links',
      }}
      variant={'text'}
      onClick={() =>
        showModal(DepositModal, {
          ctaId: 'invest-modal-deposit',
          selectedCoin: coin.id,
        })
      }
    >
      {t('action:deposit-coin', { coin: coin.id })}
    </ZigButton>
  );

  if (isConfirmation) {
    return (
      <>
        <ZigTypography
          variant={'body1'}
          id={'invest-modal-confirmation__amount-to-invest-label'}
        >
          {t('invest-modal.amount-to-invest')}
        </ZigTypography>
        <AmountInvested>
          <ZigCoinIcon
            coin={coin.id}
            id={'invest-modal-confirmation__coin-icon'}
          />
          <TokenValue>
            <ZigTypography variant={'bigNumber'} color={'neutral100'}>
              <NumericFormat
                id={'invest-modal-confirmation__amount-to-invest'}
                value={watch('amountTransfer')!.value.toString()}
                displayType={'text'}
                thousandSeparator={true}
              />
            </ZigTypography>
            <ZigTypography
              variant={'h3'}
              color={'neutral400'}
              id={'invest-modal-confirmation__coin'}
            >
              {String(coin.id).toUpperCase()}
            </ZigTypography>
          </TokenValue>
        </AmountInvested>
        <div>
          <>
            <ZigTypography
              variant={'body1'}
              id={'invest-modal-confirmation__percentage-to-withdraw'}
            >
              {t('form.profits.title-confirmation')}
            </ZigTypography>
            <AmountInvested>
              <TokenValue>
                <ZigTypography variant={'bigNumber'} color={'neutral100'}>
                  <NumericFormat
                    id={'invest-modal-confirmation__profit-percentage'}
                    value={watch('profitPercentage').toString()}
                    displayType={'text'}
                    suffix={'%'}
                    thousandSeparator={true}
                  />
                </ZigTypography>
              </TokenValue>
            </AmountInvested>
          </>
        </div>
        <Controller
          name='transferConfirm'
          control={control}
          render={({ field }) => (
            <ZigInput
              id={'invest-modal-confirmation__input-transfer'}
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
      </>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(
        isConfirmation ? onSubmitSecondStep : onSubmitFirstStep,
      )}
    >
      <div>
        <div>
          <ZigInputAmount
            id={'invest-modal__input-amount'}
            name={'amountTransfer'}
            // control={control}
            label={t('form.inputAmount.label')}
            // labelBalance={t('form.inputAmount.labelBalance')}
            wide={true}
            coin={coin.id}
            extraInfo={{
              balance: coin.balance,
              // min: serviceDetails.minimumBalance,
              // min: { value: 100, label: t('form.inputAmount.labelMinDeposit') },
              others: [renderDepositCoin()],
            }}
            error={
              isDirty &&
              t(
                (
                  errors?.amountTransfer as FieldErrorsImpl<InputAmountAdvancedValueType>
                )?.value?.message,
              )
            }
          />
        </div>
        {/* <div>
          <Controller
            name='profitPercentage'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <ZigSliderInput
                prefixId={'invest-modal'}
                mode={'range'}
                labels={{
                  top: t('form.profits.title'),
                  left: t('form.profits.left'),
                  right: t('form.profits.right'),
                }}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div> */}
      </div>

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
              id={'invest-modal__understand-margin'}
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
              id={'invest-modal__understand-money-transferred'}
              onChange={onChange}
              value={value}
              label={t('invest-modal.i-understand-money-transferred')}
            />
          )}
        />
      </Box>

      <ModalActions>
        <ZigButton
          id={'invest-modal__confirm'}
          size={'large'}
          type={'submit'}
          loading={isLoading}
          disabled={!canSubmit}
        >
          {isConfirmation
            ? t('form.button.invest-now', {
                amount: watch('amountTransfer')!.value.toString(),
                coin: coin.id,
              })
            : t('form.button.continue-to-confirmation')}
        </ZigButton>
        <ZigButton
          id={'invest-modal__close'}
          size={'large'}
          type={'button'}
          disabled={isLoading}
          variant={'outlined'}
          onClick={isConfirmation ? onGoBackToFirstStep : close}
        >
          {t(isConfirmation ? 'common:back' : 'common:close')}
        </ZigButton>
      </ModalActions>
    </form>
  );
}

export default InvestForm;
