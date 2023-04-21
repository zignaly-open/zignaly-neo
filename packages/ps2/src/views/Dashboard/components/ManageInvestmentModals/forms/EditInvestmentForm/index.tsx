import React, { useRef } from 'react';
import { NumericFormat } from 'react-number-format';
import { useTheme } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import {
  AmountInvested,
  Field,
  Form,
  InputContainer,
  Row,
  TokenValue,
} from './styles';

import {
  ArrowRightIcon,
  Button,
  CoinIcon,
  InputAmountAdvanced,
  SliderInput,
  TextButton,
  Typography,
} from '@zignaly-open/ui';
import { EditInvestmentValidation } from './validations';
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

function EditInvestmentForm({
  onClickWithdrawInvestment,
  setView,
}: EditInvestmentFormProps) {
  const coin = useCurrentBalance();
  const theme = useTheme();
  const { t } = useTranslation('edit-investment');
  const { serviceId, serviceName } = useSelectedInvestment();
  const { edit: editPercent } = useUpdateTakeProfitPercentage(serviceId);
  const { isLoading: isEditingInvestment, edit: editInvestment } =
    useUpdateTakeProfitAndInvestMore(serviceId);
  const { data: details } = useInvestmentDetails(serviceId);
  const { data: service } = useServiceDetails(serviceId);
  const transferOutAll = details?.transferOutAll;

  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty, errors },
    watch,
  } = useForm<EditFormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      amountTransfer: {
        value: '',
        token: coin,
      },
      profitPercentage: details?.profitPercentage,
    },
    resolver: yupResolver(
      EditInvestmentValidation({
        max: new BigNumber(service.maximumSbt)
          .minus(service.invested)
          .minus(service.pending)
          .toString(),
        coin: service.ssc,
      }),
    ),
  });

  const toast = useToast();
  const openBlockedToast = () => toast.error(t('error-blockedInvestment'));

  const canSubmit = isValid && Object.keys(errors).length === 0;

  const onSubmit = async (values: EditFormData) => {
    await editInvestment({
      amount: values?.amountTransfer?.value,
    });
    toast.success(
      t('edit-investment:addMoreInvestmentSuccess', {
        amount: values?.amountTransfer?.value,
        currency: values?.amountTransfer?.token?.id,
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

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <Row>
          <Typography variant={'body1'}>{t('form.title')}</Typography>
          <AmountInvested>
            <CoinIcon coin={coin.id} />
            <TokenValue>
              <Typography variant={'bigNumber'} color={'neutral100'}>
                <NumericFormat
                  value={details?.invested}
                  displayType={'text'}
                  thousandSeparator={true}
                />
              </Typography>
              <Typography variant={'h3'} color={'neutral400'}>
                {String(coin.id).toUpperCase()}
              </Typography>
            </TokenValue>
          </AmountInvested>
        </Row>
        <Row>
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
        </Row>
      </Field>

      {coin && (
        <InputContainer>
          <InputAmountAdvanced
            name={'amountTransfer'}
            control={control}
            label={t('form.inputAmount.label')}
            labelBalance={t('form.inputAmount.labelBalance')}
            showUnit={true}
            placeholder={'0.0'}
            tokens={[coin]}
            error={isDirty && t(errors?.amountTransfer?.value?.message)}
          />
        </InputContainer>
      )}

      <ModalActions>
        <Button
          id={'edit-investment__save-invest'}
          size={'large'}
          type={'submit'}
          loading={isEditingInvestment}
          caption={t('form.button.addInvestment')}
          disabled={!canSubmit}
        />
        <TextButton
          id={'edit-investment__withdraw'}
          rightElement={
            <ArrowRightIcon
              width={'22px'}
              height={'22px'}
              color={theme[transferOutAll ? 'neutral300' : 'links']}
            />
          }
          allowClickOnDisabled
          as={'span'}
          disabled={transferOutAll}
          onClick={
            transferOutAll ? openBlockedToast : onClickWithdrawInvestment
          }
          caption={t('form.link.withdraw')}
        />
      </ModalActions>
    </Form>
  );
}

export default EditInvestmentForm;
