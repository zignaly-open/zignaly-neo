import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import {
  ZigTypography,
  ZigButton,
  ZigInputAmount,
  ZigSlider,
  ZigModalActions,
  ZigModalForm,
  ZigCheckBox,
} from '@zignaly-open/ui';
import { editInvestmentValidation } from './validations';
import {
  useCurrentBalance,
  useInvestInService,
  useSelectedInvestment,
} from '../../../../../../apis/investment/use';
import { InvestFormData, InvestFormProps } from './types';
import { useToast } from '../../../../../../util/hooks/useToast';
import { Box } from '@mui/material';
import { useServiceDetails } from 'apis/service/use';
import BigNumber from 'bignumber.js';
import { Add } from '@mui/icons-material';
import { useOpenDepositModal } from '../../DepositModal';
import { useDebounce } from 'react-use';
import { InvestmentViews } from '../../types';
import useTrackEvent from '../../../../../../components/Navigation/Tracker/use';
import { trackAllocation } from 'util/analytics';
import { useCurrentUser } from 'apis/user/use';
import { getMinInvestmentAmount } from '../../../../../../whitelabel';

function InvestForm({ view, setView, close }: InvestFormProps) {
  const coin = useCurrentBalance();
  const { t } = useTranslation(['edit-investment', 'action']);
  const service = useSelectedInvestment();
  const { isLoading, invest } = useInvestInService(service.serviceId);
  const { data: serviceDetails } = useServiceDetails(service.serviceId);
  const toast = useToast();
  const trackEvent = useTrackEvent();
  const openDepositModal = useOpenDepositModal();
  const { userId } = useCurrentUser();

  const {
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { isValid, errors },
  } = useForm<InvestFormData>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      amountTransfer: '',
      profitPercentage: 0,
    },
    resolver: yupResolver(
      editInvestmentValidation({
        balance: coin?.balance,
        max: new BigNumber(serviceDetails.maximumSbt)
          .minus(serviceDetails.invested)
          .minus(serviceDetails.pending)
          .toString(),
        invested: 0,
        min: getMinInvestmentAmount(service.ssc),
        coin: service.ssc,
      }),
    ),
  });
  useEffect(() => {
    if (watch('amountTransfer')) trigger('amountTransfer');
  }, [view]);

  const canSubmit = isValid && Object.keys(errors).length === 0;

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

  const onSubmitInvest = async ({
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
    trackAllocation(userId, amountTransfer, service.ssc, service.serviceId);
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
        openDepositModal({
          selectedCoin: coin.id,
          // Callback to close the modal if user navigates to history from the deposit modal
          onClose: close,
        })
      }
    >
      {t('action:deposit-coin', { coin: coin.id })}
    </ZigButton>
  );

  return (
    <ZigModalForm onSubmit={handleSubmit(onSubmitInvest)}>
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
            <ZigCheckBox
              wrapperSx={{ alignItems: 'flex-start' }}
              sx={{ margin: '0 9px', padding: 0 }}
              id={'invest-modal__understand-risk'}
              onChange={onChange}
              value={value}
              variant={'outlined'}
              label={t('invest-modal.i-understand-risk')}
            />
          )}
        />
      </Box>

      <ZigModalActions>
        <ZigButton
          id={'invest-modal__continue'}
          size={'large'}
          type={'submit'}
          loading={isLoading}
          disabled={!canSubmit}
        >
          {t('form.button.transfer-now')}
        </ZigButton>
      </ZigModalActions>
    </ZigModalForm>
  );
}

export default InvestForm;
