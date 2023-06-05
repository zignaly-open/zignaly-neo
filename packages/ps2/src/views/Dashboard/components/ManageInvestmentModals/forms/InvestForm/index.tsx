import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import {
  ZigTypography,
  ZigButton,
  ZigInput,
  ZigInputAmount,
  ZigSliderInput,
} from '@zignaly-open/ui';
import { editInvestmentValidation } from './validations';
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
import { NumericFormat } from 'react-number-format';
import { useServiceDetails } from 'apis/service/use';
import BigNumber from 'bignumber.js';
import { Add } from '@mui/icons-material';
import DepositModal from '../../DepositModal';
import { useZModal } from '../../../../../../components/ZModal/use';
import { AmountInvested } from '../EditInvestmentForm/atoms';

function InvestForm({ close, onInvested }: InvestFormProps) {
  const coin = useCurrentBalance();
  const { t } = useTranslation(['edit-investment', 'action']);
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
      amountTransfer: '',
      transferLabelForValidation: transferMagicWord,
      transferConfirm: '',
      profitPercentage: 30,
      step: 1,
    },
    resolver: yupResolver(
      editInvestmentValidation({
        balance: coin?.balance,
        max: new BigNumber(serviceDetails.maximumSbt)
          .minus(serviceDetails.invested)
          .minus(serviceDetails.pending)
          .toString(),
        coin: service.ssc,
      }),
    ),
  });

  const canSubmit = isValid && Object.keys(errors).length === 0;
  console.log(errors);

  const onSubmitFirstStep = () => {
    setValue('transferConfirm', '');
    setValue('step', 2);
  };

  const isConfirmation = watch('step') === 2;

  const onSubmitSecondStep = async ({
    profitPercentage,
    amountTransfer,
  }: InvestFormData) => {
    await invest({
      profitPercentage,
      amount: amountTransfer,
    });
    toast.success(
      t('edit-investment:addMoreInvestmentSuccess', {
        amount: amountTransfer,
        currency: service.ssc,
        serviceName: service.serviceName,
      }),
    );
    onInvested();
  };

  const renderDepositCoin = () => (
    <ZigButton
      id={'invest-modal__deposit'}
      startIcon={<Add sx={{ fill: 'currentColor !important' }} />}
      sx={{
        fontWeight: 400,
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
        <AmountInvested
          idPrefix='invest-modal-confirmation'
          label={t('invest-modal.amount-to-invest')}
          coin={coin.id}
          value={watch('amountTransfer')}
        />
        <div>
          <>
            <ZigTypography
              variant={'body1'}
              id={'invest-modal-confirmation__percentage-to-withdraw'}
            >
              {t('form.profits.title-confirmation')}
            </ZigTypography>
            {/* <AmountInvested>
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
            </AmountInvested> */}
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
        <Controller
          name={'amountTransfer'}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <ZigInputAmount
              id={'invest-modal__input-amount'}
              label={t('form.inputAmount.label')}
              wide={true}
              coin={coin.id}
              balance={coin.balance}
              extraInfo={{
                others: [renderDepositCoin()],
              }}
              error={t(errors?.amountTransfer?.message)}
              {...field}
            />
          )}
        />
        <div>
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
        </div>
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
          {t('continue')}
        </ZigButton>
      </ModalActions>
    </form>
  );
}

export default InvestForm;
