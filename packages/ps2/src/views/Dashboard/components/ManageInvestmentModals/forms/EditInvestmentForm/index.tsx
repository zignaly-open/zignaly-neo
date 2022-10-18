import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { useTheme } from 'styled-components';
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
import Theme from '@zignaly-open/ui/lib/theme/theme';
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

function EditInvestmentForm({
  onClickWithdrawInvestment,
  close,
  setView,
}: EditInvestmentFormProps) {
  const coin = useCurrentBalance();
  const theme = useTheme() as Theme;
  const { t } = useTranslation('edit-investment');
  const [isInputEnabled, setInputEnabled] = useState(false);
  const { isLoading: isEditingPercent, edit: editPercent } =
    useUpdateTakeProfitPercentage();
  const { isLoading: isEditingInvestment, edit: editInvestment } =
    useUpdateTakeProfitAndInvestMore();
  const { serviceId, serviceName } = useSelectedInvestment();
  const { refetch: refetchDetails } = useInvestmentDetails(serviceId);
  const { data: details } = useInvestmentDetails(serviceId);
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
    resolver: isInputEnabled ? yupResolver(EditInvestmentValidation) : null,
  });

  const toast = useToast();
  const openBlockedToast = () => toast.error(t('error-blockedInvestment'));

  const isLoading = isEditingPercent || isEditingInvestment;
  const canSubmit = isValid && Object.keys(errors).length === 0;

  const onSubmit = async (values: EditFormData) => {
    if (isInputEnabled) {
      await editInvestment({
        profitPercentage: values.profitPercentage,
        serviceId,
        amount: values?.amountTransfer?.value,
      });
      toast.success(
        t('edit-investment:addMoreInvestmentSuccess', {
          amount: values?.amountTransfer?.value,
          currency: values?.amountTransfer?.token?.id,
          serviceName,
        }),
      );
      refetchDetails();
      setView(EditInvestmentViews.EditInvestmentSuccess);
    } else {
      await editPercent({
        profitPercentage: values.profitPercentage,
        serviceId,
      });
      toast.success(t('edit-investment:percentageChangedSuccess'));
      refetchDetails();
      close();
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <Row>
          <Typography variant={'body1'}>{t('form.title')}</Typography>
          <AmountInvested>
            <CoinIcon coin={coin.id} />
            <TokenValue>
              <Typography variant={'bigNumber'} color={'neutral100'}>
                <NumberFormat
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
        {!isInputEnabled && (
          <TextButton
            onClick={() =>
              transferOutAll ? openBlockedToast() : setInputEnabled(true)
            }
            disabled={transferOutAll}
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
        )}
        <Button
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
