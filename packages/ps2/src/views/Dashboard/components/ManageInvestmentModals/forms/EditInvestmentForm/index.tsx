import React, { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Field, Form } from './styles';

import {
  ZigButton,
  ZigTypography,
  ZigInputAmount,
  ZigSlider,
  ZigAlertMessage,
} from '@zignaly-open/ui';
import { editInvestmentValidation } from './validations';
import {
  useCurrentBalance,
  useInvestmentDetails,
  useSelectedInvestment,
  useUpdateTakeProfitAndInvestMore,
  useUpdateTakeProfitPercentage,
} from '../../../../../../apis/investment/use';
import { EditFormData, EditInvestmentFormProps } from './types';
import { EditInvestmentViews } from '../../types';
import { useToast } from '../../../../../../util/hooks/useToast';
import { ModalActions } from 'components/ZModal/ModalContainer/styles';
import { useServiceDetails } from 'apis/service/use';
import BigNumber from 'bignumber.js';
import { useDebounce } from 'react-use';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useOpenDepositModal } from '../../DepositModal';
import { Add } from '@mui/icons-material';
import { Box } from '@mui/material';
import { AmountInvested } from './atoms';
import { useCanInvestIn } from '../../../../../../util/walls/util';

function EditInvestmentForm({
  onClickWithdrawInvestment,
  setView,
  close,
}: EditInvestmentFormProps) {
  const coin = useCurrentBalance();
  const { t } = useTranslation('edit-investment');
  const openDepositModal = useOpenDepositModal();
  const { serviceId, serviceName } = useSelectedInvestment();
  const { edit: editPercent } = useUpdateTakeProfitPercentage(serviceId);
  const { isLoading: isEditingInvestment, edit: editInvestment } =
    useUpdateTakeProfitAndInvestMore(serviceId);
  const { data: details } = useInvestmentDetails(serviceId);
  const { data: service } = useServiceDetails(serviceId);

  const {
    handleSubmit,
    control,
    formState: { isValid, errors },
    watch,
  } = useForm<EditFormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      profitPercentage: details?.profitPercentage,
    },
    resolver: yupResolver(
      editInvestmentValidation({
        max: new BigNumber(service.maximumSbt)
          .minus(service.invested)
          .minus(service.pending)
          .toString(),
        balance: coin?.balance,
        coin: service.ssc,
      }),
    ),
  });

  const toast = useToast();
  const checkCanInvest = useCanInvestIn(close);

  const canSubmit = isValid && Object.keys(errors).length === 0;

  const onSubmit = async (values: EditFormData) => {
    if (checkCanInvest()) {
      await editInvestment({
        amount: values?.amountTransfer,
      });
      toast.success(
        t('edit-investment:addMoreInvestmentSuccess', {
          amount: values?.amountTransfer,
          currency: service.ssc,
          serviceName,
        }),
      );
      setView(EditInvestmentViews.EditInvestmentSuccess);
    }
  };

  const profitPercent = watch('profitPercentage');
  const isFirstRun = useRef(true);

  useDebounce(
    async () => {
      if (isFirstRun.current) {
        isFirstRun.current = false;
        return;
      }
      await editPercent({
        profitPercentage: profitPercent,
      });
      toast.success(t('edit-investment:percentageChangedSuccess'));
    },
    1000,
    [profitPercent],
  );

  const renderDepositCoin = () => (
    <ZigButton
      id={'edit-investment-modal__deposit'}
      startIcon={<Add sx={{ fill: 'currentColor !important' }} />}
      sx={{
        fontWeight: 400,
        color: 'links',
      }}
      variant={'text'}
      onClick={() =>
        openDepositModal({
          selectedCoin: coin.id,
        })
      }
    >
      {t('action:deposit-coin', { coin: coin.id })}
    </ZigButton>
  );

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <AmountInvested
          idPrefix='edit-investment-modal'
          label={t('form.title')}
          coin={coin.id}
          value={details?.invested + details?.pending}
        />
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          gap={2.5}
        >
          <ZigTypography
            variant={'body2'}
            color='neutral300'
            id='edit-investment-modal__profit-manage-title'
          >
            {t('form.profits.title')}
          </ZigTypography>
          <Controller
            name='profitPercentage'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <ZigSlider
                prefixId={'edit-investment-modal-slider'}
                {...field}
                labels={{
                  start: t('form.profits.left'),
                  end: t('form.profits.right'),
                  invertSliderValues: true,
                }}
              />
            )}
          />
        </Box>
      </Field>

      {details?.transferOutAll ? (
        <ZigAlertMessage
          warning
          text={t('form.transferOutAll')}
          id={'edit-investment-modal-slider__warning'}
        />
      ) : (
        <>
          <Controller
            name={'amountTransfer'}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <ZigInputAmount
                id={'edit-investment-modal__input-amount'}
                label={t('form.button.addInvestment')}
                wide={true}
                coin={coin.id}
                balance={coin.balance}
                extraInfo={{
                  others: [renderDepositCoin()],
                }}
                error={t(errors?.amountTransfer?.message)}
                {...field}
              >
                <ZigButton
                  id={'edit-investment-modal__save-invest'}
                  size={'large'}
                  type={'submit'}
                  loading={isEditingInvestment}
                  disabled={!canSubmit}
                >
                  {t('form.button.addInvestment')}
                </ZigButton>
              </ZigInputAmount>
            )}
          />

          <ModalActions direction='column' mt='25px'>
            <ZigButton
              variant={'text'}
              id={'edit-investment-modal__withdraw'}
              endIcon={
                <KeyboardArrowRightIcon
                  sx={{
                    color: 'links',
                    fill: 'currentColor !important',
                  }}
                />
              }
              onClick={onClickWithdrawInvestment}
            >
              {t('form.link.withdraw')}
            </ZigButton>
          </ModalActions>
        </>
      )}
    </Form>
  );
}

export default EditInvestmentForm;
