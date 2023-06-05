import React, { useRef } from 'react';
import { NumericFormat } from 'react-number-format';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import {
  AmountInvested,
  Field,
  Form,
  InputAmountWrapper,
  Row,
  TokenValue,
} from './styles';

import {
  ZigSliderInput,
  ZigButton,
  ZigTypography,
  ZigCoinIcon,
  ZigInputAmount,
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
import DepositModal from '../../DepositModal';
import { useZModal } from 'components/ZModal/use';
import { Add } from '@mui/icons-material';
import { Box } from '@mui/material';

function EditInvestmentForm({
  onClickWithdrawInvestment,
  setView,
}: EditInvestmentFormProps) {
  const coin = useCurrentBalance();
  const { t } = useTranslation('edit-investment');
  const { serviceId, serviceName } = useSelectedInvestment();
  const { edit: editPercent } = useUpdateTakeProfitPercentage(serviceId);
  const { isLoading: isEditingInvestment, edit: editInvestment } =
    useUpdateTakeProfitAndInvestMore(serviceId);
  const { data: details } = useInvestmentDetails(serviceId);
  const { data: service } = useServiceDetails(serviceId);
  const transferOutAll = details?.transferOutAll;
  const { showModal } = useZModal();

  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty, errors },
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
      }),
    ),
  });

  const toast = useToast();
  const openBlockedToast = () => toast.error(t('error-blockedInvestment'));

  const canSubmit = isValid && Object.keys(errors).length === 0;

  const onSubmit = async (values: EditFormData) => {
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

  const renderInvestButton = () => (
    <Box flexBasis='100%' display='flex' justifyContent='center' mt={2} mb={1}>
      <ZigButton
        id={'edit-investment-modal__save-invest'}
        size={'large'}
        type={'submit'}
        loading={isEditingInvestment}
        disabled={!canSubmit}
      >
        {t('form.button.addInvestment')}
      </ZigButton>
    </Box>
  );

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <Row>
          <ZigTypography variant={'body1'} id={'edit-investment-modal__title'}>
            {t('form.title')}
          </ZigTypography>
          <AmountInvested>
            <ZigCoinIcon
              coin={coin.id}
              id={'edit-investment-modal__coin-icon'}
            />
            <TokenValue>
              <ZigTypography variant={'bigNumber'} color={'neutral100'}>
                <NumericFormat
                  id={'edit-investment-modal__invested'}
                  value={details?.invested}
                  displayType={'text'}
                  thousandSeparator={true}
                />
              </ZigTypography>
              <ZigTypography
                variant={'h3'}
                color={'neutral400'}
                id={'edit-investment-modal__coin-name'}
              >
                {String(coin.id).toUpperCase()}
              </ZigTypography>
            </TokenValue>
          </AmountInvested>
        </Row>
        <Row>
          <Controller
            name='profitPercentage'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <ZigSliderInput
                prefixId={'edit-investment-modal'}
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
        </Row>
      </Field>

      <InputAmountWrapper>
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
                others: [renderDepositCoin(), renderInvestButton()],
              }}
              wrapExtraInfo={false}
              error={t(errors?.amountTransfer?.message)}
              {...field}
            />
          )}
        />
      </InputAmountWrapper>

      <ModalActions direction='column'>
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
          disabled={transferOutAll}
          onClick={
            transferOutAll ? openBlockedToast : onClickWithdrawInvestment
          }
        >
          {t('form.link.withdraw')}
        </ZigButton>
      </ModalActions>
    </Form>
  );
}

export default EditInvestmentForm;
