import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Trans, useTranslation } from 'react-i18next';
import {
  ZigTypography,
  ZigButton,
  ZigInput,
  ZigInputAmount,
  ZigSlider,
} from '@zignaly-open/ui';
import { editInvestmentValidation } from './validations';
import {
  useCurrentBalance,
  useInvestInService,
  useSelectedInvestment,
} from '../../../../../../apis/investment/use';
import { InvestFormData, InvestFormProps } from './types';
import { useToast } from '../../../../../../util/hooks/useToast';
import { Form, ModalActions } from 'components/ZModal';
import { Box } from '@mui/material';
import { CheckBox } from '@zignaly-open/ui';
import { useServiceDetails } from 'apis/service/use';
import BigNumber from 'bignumber.js';
import { Add } from '@mui/icons-material';
import DepositModal from '../../DepositModal';
import { useZModal } from '../../../../../../components/ZModal/use';
import { AmountInvested } from '../EditInvestmentForm/atoms';
import { Field, ZigInputWrapper } from './styles';
import { NumericFormat } from 'react-number-format';
import { useDebounce } from 'react-use';
import { InvestmentViews } from '../../types';
import useTrackEvent from '../../../../../../components/Navigation/Tracker/use';
import { twq } from 'util/analytics';
import { useCurrentUser } from 'apis/user/use';

function InvestForm({ view, setView, close }: InvestFormProps) {
  const coin = useCurrentBalance();
  const { t } = useTranslation(['edit-investment', 'action']);
  const service = useSelectedInvestment();
  const { isLoading, invest } = useInvestInService(service.serviceId);
  const { data: serviceDetails } = useServiceDetails(service.serviceId);
  const toast = useToast();
  const { showModal } = useZModal();
  const trackEvent = useTrackEvent();
  // the safe word is Fluggaenkoecchicebolsen
  const transferMagicWord = t('invest-modal.transfer-label');
  const { userId } = useCurrentUser();

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { isValid, errors },
  } = useForm<InvestFormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      amountTransfer: '',
      transferLabelForValidation: transferMagicWord,
      transferConfirm: '',
      profitPercentage: 0,
    },
    resolver: yupResolver(
      editInvestmentValidation({
        balance: coin?.balance,
        max: new BigNumber(serviceDetails.maximumSbt)
          .minus(serviceDetails.invested)
          .minus(serviceDetails.pending)
          .toString(),
        coin: service.ssc,
        checkTransferInput: view === InvestmentViews.InvestmentConfirm,
      }),
    ),
  });

  const canSubmit = isValid && Object.keys(errors).length === 0;

  const onSubmitFirstStep = () => {
    setValue('transferConfirm', '');
    setView(InvestmentViews.InvestmentConfirm);
  };

  const reinvestAmount = watch('profitPercentage')?.toString();

  useDebounce(
    () => {
      +reinvestAmount && trackEvent('reinvest-amount-change');
    },
    300,
    [reinvestAmount],
  );

  const hasAgreedToAll = watch('understandRisk');

  useEffect(() => {
    hasAgreedToAll && trackEvent('agreed-to-all');
  }, [hasAgreedToAll]);

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
    twq(userId).trackAllocation();
    setView(InvestmentViews.InvestmentSuccess);
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
          selectedCoin: coin.id,
          // Callback to close the modal if user navigates to history from the deposit modal
          onClose: close,
        })
      }
    >
      {t('action:deposit-coin', { coin: coin.id })}
    </ZigButton>
  );

  if (view === InvestmentViews.InvestmentConfirm) {
    return (
      <form onSubmit={handleSubmit(onSubmitSecondStep)}>
        <Field>
          <AmountInvested
            idPrefix='invest-modal-confirmation'
            label={t('invest-modal.amount-to-invest')}
            coin={coin.id}
            value={watch('amountTransfer')}
          />
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            gap={1.75}
          >
            <ZigTypography
              variant={'body2'}
              color='neutral300'
              id={'invest-modal-confirmation__percentage-to-withdraw'}
              textAlign='center'
            >
              {t('form.profits.pct-withdraw')}
            </ZigTypography>
            <ZigTypography
              variant={'bigNumber'}
              color={'neutral200'}
              lineHeight='30px'
            >
              <NumericFormat
                id={'invest-modal-confirmation__profit-percentage'}
                value={reinvestAmount}
                displayType={'text'}
                suffix={'%'}
                thousandSeparator={true}
              />
            </ZigTypography>
          </Box>
        </Field>
        <Box display='flex' flexDirection='column' alignItems='center'>
          <ZigTypography
            variant='body2'
            textAlign='center'
            mb='22px'
            id={'invest-modal-confirmation__type-safe-word'}
          >
            <Trans
              i18nKey={'invest-modal.type-transfer'}
              t={t}
              components={[
                <ZigTypography variant='body2' color='neutral100' key={0} />,
              ]}
              values={{
                word: transferMagicWord,
              }}
            />
          </ZigTypography>
          <Controller
            name='transferConfirm'
            control={control}
            render={({ field }) => (
              <ZigInputWrapper>
                <ZigInput
                  id={'invest-modal-confirmation__input-transfer'}
                  placeholder={t('invest-modal.type-transfer-placeholder', {
                    word: transferMagicWord,
                  })}
                  disabled={isLoading}
                  error={t(errors.transferConfirm?.message)}
                  wide={true}
                  // weird issue with the default value, likely some react form shenanigan
                  {...{
                    ...field,
                    value: typeof field.value === 'string' ? field.value : '',
                  }}
                  sx={{
                    minWidth: '344px',
                  }}
                />
              </ZigInputWrapper>
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
            {t('form.button.transfer-now')}
          </ZigButton>
        </ModalActions>
      </form>
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitFirstStep)}>
      <Controller
        name={'amountTransfer'}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <ZigInputAmount
            id={'invest-modal__input-amount'}
            label={t('form.inputAmount.label')}
            wide
            coin={coin.id}
            balance={coin.balance}
            extraInfo={{
              others: [renderDepositCoin()],
            }}
            error={t(errors?.amountTransfer?.message)}
            {...field}
            onBlur={() => {
              watch('amountTransfer') && trackEvent('invest-amount-change');
              field.onBlur();
            }}
          />
        )}
      />
      <Controller
        name='profitPercentage'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <ZigSlider
            prefixId={'invest-modal-slider'}
            {...field}
            labels={{
              top: (
                <ZigTypography
                  variant={'body2'}
                  color='neutral300'
                  id='invest-modal__title'
                  display='block'
                  textAlign='center'
                >
                  {t('form.profits.title')}
                </ZigTypography>
              ),
              start: t('form.profits.left'),
              end: t('form.profits.right'),
              invertSliderValues: true,
            }}
          />
        )}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5,
          mt: 1,
        }}
      >
        <Controller
          control={control}
          name='understandRisk'
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <CheckBox
              id={'invest-modal__understand-risk'}
              onChange={onChange}
              value={value}
              label={t('invest-modal.i-understand-risk')}
            />
          )}
        />
      </Box>

      <ModalActions>
        <ZigButton
          id={'invest-modal__continue'}
          size={'large'}
          type={'submit'}
          loading={isLoading}
          disabled={!canSubmit}
        >
          {t('continue')}
        </ZigButton>
      </ModalActions>
    </Form>
  );
}

export default InvestForm;
