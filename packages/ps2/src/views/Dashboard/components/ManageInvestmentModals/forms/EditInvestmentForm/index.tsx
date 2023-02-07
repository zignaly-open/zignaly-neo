import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { Tooltip, useTheme } from '@mui/material';
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
  PlusIcon,
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

function EditInvestmentForm({
  onClickWithdrawInvestment,
  close,
  setView,
}: EditInvestmentFormProps) {
  const coin = useCurrentBalance();
  const theme = useTheme();
  const { t } = useTranslation('edit-investment');
  const [isInputEnabled, setInputEnabled] = useState(false);
  const { serviceId, serviceName } = useSelectedInvestment();
  const { isLoading: isEditingPercent, edit: editPercent } =
    useUpdateTakeProfitPercentage(serviceId);
  const { isLoading: isEditingInvestment, edit: editInvestment } =
    useUpdateTakeProfitAndInvestMore(serviceId);
  const { data: details } = useInvestmentDetails(serviceId);
  const { data: service } = useServiceDetails(serviceId);
  const transferOutAll = details?.transferOutAll;

  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty, errors },
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
    resolver: isInputEnabled
      ? yupResolver(
          EditInvestmentValidation({
            max: service.maximumSbt - +service.invested,
            coin: service.ssc,
          }),
        )
      : null,
  });

  const toast = useToast();
  const openBlockedToast = () => toast.error(t('error-blockedInvestment'));

  const isLoading = isEditingPercent || isEditingInvestment;
  const canSubmit = isValid && Object.keys(errors).length === 0;

  const onSubmit = async (values: EditFormData) => {
    if (isInputEnabled) {
      await editInvestment({
        profitPercentage: values.profitPercentage,
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
    } else {
      await editPercent({
        profitPercentage: values.profitPercentage,
      });
      toast.success(t('edit-investment:percentageChangedSuccess'));
      close();
    }
  };

  const maxReached = +service.invested >= service.maximumSbt;

  const tooltipWrap = (v: React.ReactElement) =>
    maxReached ? <Tooltip title={t('form.link.maxReached')}>{v}</Tooltip> : v;

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

      {isInputEnabled && coin && (
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
        {!isInputEnabled &&
          tooltipWrap(
            <div>
              <TextButton
                id={'edit-investment__invest-more'}
                onClick={() =>
                  !maxReached &&
                  (transferOutAll ? openBlockedToast() : setInputEnabled(true))
                }
                disabled={transferOutAll || maxReached}
                allowClickOnDisabled
                as={'span'}
                leftElement={
                  <PlusIcon
                    color={theme[transferOutAll ? 'neutral300' : 'links']}
                    width={'22px'}
                    height={'22px'}
                  />
                }
                caption={t('form.link.investMore')}
              />
            </div>,
          )}
        <Button
          id={
            isInputEnabled
              ? 'edit-investment__save-invest'
              : 'edit-investment__save-close'
          }
          size={'large'}
          type={'submit'}
          loading={isLoading}
          caption={
            isInputEnabled
              ? t('form.button.saveAndInvestment')
              : t('form.button.saveAndClose')
          }
          disabled={isInputEnabled ? !canSubmit : false}
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
