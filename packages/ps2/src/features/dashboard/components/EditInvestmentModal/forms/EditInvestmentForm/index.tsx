import React, { useCallback, useState } from 'react';
import NumberFormat from 'react-number-format';
import { useTheme } from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
  Actions,
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
  Toaster,
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
} from '../../../../use';
import { EditFormData, EditInvestmentFormProps } from './types';
import { EditInvestmentViews } from '../../types';

const invertPercent = (v: number | string): number => 100 - +v;

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
  const amountInvested = details?.invested;
  const profitPercentage = details?.profitPercentage;

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
      profitPercentage: invertPercent(profitPercentage),
    },
    resolver: isInputEnabled ? yupResolver(EditInvestmentValidation) : null,
  });

  const openBlockedToast = useCallback(() => {
    toast(
      <Toaster
        variant={'error'}
        caption={t('edit-investment.error-blockedInvestment')}
      />,
      {
        type: 'error',
        icon: false,
      },
    );
  }, []);

  const isLoading = isEditingPercent || isEditingInvestment;
  const canSubmit = isValid && Object.keys(errors).length === 0;

  const onSubmit = async (values: EditFormData) => {
    if (isInputEnabled) {
      await editInvestment({
        profitPercentage: invertPercent(values.profitPercentage),
        serviceId,
        amount: values?.amountTransfer?.value,
      });
      toast(
        <Toaster
          variant={'success'}
          caption={t(
            'edit-investment:edit-investment.addMoreInvestmentSuccess',
            {
              amount: values?.amountTransfer?.value,
              currency: values?.amountTransfer?.token?.id,
              serviceName,
            },
          )}
        />,
        {
          type: 'error',
          icon: false,
        },
      );
      refetchDetails();
      setView(EditInvestmentViews.EditInvestmentSuccess);
    } else {
      await editPercent({
        profitPercentage: invertPercent(values.profitPercentage),
        serviceId,
      });
      toast(
        <Toaster
          variant={'success'}
          caption={t(
            'edit-investment:edit-investment.percentageChangedSuccess',
          )}
        />,
        {
          type: 'error',
          icon: false,
        },
      );
      refetchDetails();
      close();
    }
    // TODO: hadle error
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <Row>
          <Typography variant={'body1'}>
            {t('edit-investment.form.title')}
          </Typography>
          <AmountInvested>
            <CoinIcon coin={coin.id} />
            <TokenValue>
              <Typography variant={'bigNumber'} color={'neutral100'}>
                <NumberFormat
                  value={amountInvested}
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
                  top: t('edit-investment.form.profits.title'),
                  left: t('edit-investment.form.profits.left'),
                  right: t('edit-investment.form.profits.right'),
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
            label={t('edit-investment.form.inputAmount.label')}
            labelBalance={t('edit-investment.form.inputAmount.labelBalance')}
            showUnit={true}
            placeholder={'0.0'}
            tokens={[coin]}
            error={isDirty && t(errors?.amountTransfer?.value?.message)}
          />
        </InputContainer>
      )}

      <Actions>
        {!isInputEnabled && (
          <TextButton
            onClick={() =>
              transferOutAll ? openBlockedToast() : setInputEnabled(true)
            }
            leftElement={
              <PlusIcon
                color={theme[transferOutAll ? 'neutral300' : 'links']}
                width={'22px'}
                height={'22px'}
              />
            }
            caption={t('edit-investment.form.link.investMore')}
          />
        )}
        <Button
          size={'large'}
          type={'submit'}
          loading={isLoading}
          caption={
            isInputEnabled
              ? t('edit-investment.form.button.saveAndInvestment')
              : t('edit-investment.form.button.saveAndClose')
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
          onClick={
            transferOutAll ? openBlockedToast : onClickWithdrawInvestment
          }
          caption={t('edit-investment.form.link.withdraw')}
        />
      </Actions>
    </Form>
  );
}

export default EditInvestmentForm;
