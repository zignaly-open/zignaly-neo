import React, { useCallback, useState } from 'react';
import NumberFormat from 'react-number-format';
import { useTheme } from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import BigNumber from 'bignumber.js';

// import ToasterCompose from 'utils/ToasterCompose';
import {
  Field,
  Row,
  AmountInvested,
  TokenValue,
  Actions,
  Form,
  InputContainer,
} from './styles';

import {
  ArrowRightIcon,
  PlusIcon,
  CoinIcon,
  SliderInput,
  InputAmount,
  Button,
  TextButton,
  Typography,
} from '@zignaly-open/ui';
import Theme from '@zignaly-open/ui/lib/theme/theme';
import { EditInvestmentValidation } from './validations';

type CoinProps = {
  id: string;
  balance: string | number | BigNumber;
};

type EditInvestmentFormProps = {
  coin: CoinProps | null;
  // isLoading?: boolean;
  profitPercentage: string | number;
  // onSubmit: () => void;
  onClickWithdrawInvestment: () => void;
  transferOutAll?: boolean;
  amountInvested: number | string;
};

function EditInvestmentForm({
  profitPercentage = '20',
  amountInvested,
  coin = null,
  transferOutAll = false,
  onClickWithdrawInvestment,
}: EditInvestmentFormProps) {
  // Hooks
  const theme = useTheme() as Theme;
  const { t } = useTranslation('edit-investment');
  const [isInputEnabled, setInputEnabled] = useState(false);

  // Form
  const {
    handleSubmit,
    control,
    // clearErrors,
    // setError,
    formState: { isValid, isDirty, errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      amountTransfer: '',
      profitPercent: 100 - +profitPercentage,
    },
    resolver: isInputEnabled ? yupResolver(EditInvestmentValidation) : null,
  });

  const canSubmit = isValid && Object.keys(errors).length === 0;

  const openBlockedToast = useCallback(() => {
    // toast(
    //   ...ToasterCompose({
    //     type: 'error',
    //     caption: t('edit-investment.error-blockedInvestment'),
    //   }),
    // );
  }, []);

  const isLoading = false;
  // eslint-disable-next-line
  const onSubmit = console.error;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <Row>
          <Typography variant={'body1'}>
            {t('edit-investment.form.title')}
          </Typography>
          <AmountInvested>
            <CoinIcon name={'Ethereum'} coin={coin.id} />
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
            name='profitPercent'
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
          <Controller
            name='amountTransfer'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <InputAmount
                name={'amountTransfer'}
                {...field}
                label={t('edit-investment.form.inputAmount.label')}
                labelBalance={t(
                  'edit-investment.form.inputAmount.labelBalance',
                )}
                showUnit={true}
                placeholder={'0.0'}
                // tokens={[
                //   {
                //     id: coin.id,
                //     balance: coin.balance,
                //   },
                // ]}
                error={isDirty && errors?.amountTransfer?.message}
                // onInsufficientFundsError={(error) => {
                //   if (!error) {
                //     clearErrors();
                //   } else {
                //     clearErrors();
                //     setError('amountTransfer', {
                //       type: 'custom',
                //       message: 'input-amount.validation-insufficientFunds',
                //     });
                //   }
                // }}
              />
            )}
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
            disabled={transferOutAll}
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
          disabled={transferOutAll}
        />
      </Actions>
    </Form>
  );
}

export default EditInvestmentForm;
