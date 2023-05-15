import React, { useCallback, useState } from 'react';
import { FieldErrorsImpl, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NumericFormat } from 'react-number-format';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import {
  Actions,
  Body,
  ToContainer,
  ToOutline,
  TypographyBalance,
  Inline,
  TypographyNumberResult,
} from './styles';
import {
  ZigSwapVertIcon,
  InputAmountAdvanced,
  InputAmountAdvancedValueType,
  ZigTypography,
  ZigButton,
} from '@zignaly-open/ui';
import { TransferFormData, TransferModalProps } from './types';
import { TransferModalValidation } from './validation';

import { Box } from '@mui/system';
import {
  useTraderServiceBalance,
  useServiceDetails,
  useTraderServiceTransferFunds,
} from '../../../../apis/service/use';
import { useToast } from '../../../../util/hooks/useToast';
import ZModal from 'components/ZModal';

function TransferModal({
  serviceId,
  close,
  ...props
}: TransferModalProps): React.ReactElement {
  const { t } = useTranslation('management');
  const { data: balance } = useTraderServiceBalance(serviceId);
  const { data: service } = useServiceDetails(serviceId);
  const [fromTradingAccount, setFromTradingAccount] = useState(true);
  const toast = useToast();
  const [transfer, { isLoading: isTransferring }] =
    useTraderServiceTransferFunds(serviceId);

  // staSscFree is the available balance on the trading account, aka freeBalance
  const freeBalance = new BigNumber(balance?.staSscFree || 0).toFixed();
  // scaSscSum is the balance on the disconnect account
  const disconnectBalance = new BigNumber(balance?.scaSscSum || 0).toFixed();
  const balanceFrom = fromTradingAccount ? freeBalance : disconnectBalance;
  const balanceTo = !fromTradingAccount ? freeBalance : disconnectBalance;

  // TODO: maybe refetch useTraderServiceBalance just in case?

  const {
    watch,
    handleSubmit,
    control,
    trigger,
    setValue,
    formState: { isValid, errors, isDirty },
  } = useForm<TransferFormData>({
    mode: 'onChange',
    resolver: yupResolver(TransferModalValidation),
  });

  const amountTransferValue = watch('amountValue')?.value;

  const toggleDestination = () => {
    const { value, token } = watch('amountValue');
    setValue('amountValue', {
      value,
      token: {
        ...token,
        balance: balanceTo,
      },
    });
    trigger('amountValue');
    setFromTradingAccount((v) => !v);
  };

  const onSubmit = useCallback(
    ({ amountValue }: TransferFormData) => {
      transfer({
        amount: amountValue?.value?.toString(),
        from: fromTradingAccount ? 'STA' : 'SCA',
        to: fromTradingAccount ? 'SCA' : 'STA',
      }).then(() => {
        toast.success(
          t('management:transfer.success', {
            amount: `${new BigNumber(amountValue?.value).toFixed()} ${
              amountValue?.token.id
            }`,
          }),
        );
        close();
      });
    },
    [serviceId, fromTradingAccount],
  );

  return (
    <ZModal
      wide
      {...props}
      close={close}
      title={t('transferFunds.title')}
      isLoading={!balance || isTransferring}
    >
      <Box sx={{ marginBottom: 3 }}>
        <ZigTypography>{t('transferFunds.description')}</ZigTypography>
      </Box>

      {balance && !isTransferring && (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Body>
            <InputAmountAdvanced
              control={control}
              placeholder={t('transfer.placeholder')}
              fullWidth={true}
              maxLength={26}
              error={
                isDirty &&
                t(
                  (
                    errors?.amountValue as FieldErrorsImpl<InputAmountAdvancedValueType>
                  )?.value?.message,
                )
              }
              name={'amountValue'}
              label={t(
                fromTradingAccount
                  ? 'transfer.fromTradingAccount'
                  : 'transfer.fromStandbyAccount',
              )}
              labelBalance={t('transfer.labelBalance')}
              tokens={[
                {
                  id: service?.ssc ?? 'USDT',
                  balance: balanceFrom,
                },
              ]}
              showUnit
            />

            <ZigButton
              id={'transfer__swap-zig'}
              size='xlarge'
              variant='outlined'
              narrow
              sx={{
                padding: '10px 20px',
              }}
              onClick={toggleDestination}
            >
              <ZigSwapVertIcon width={24} height={24} color={'#65647E'} />
            </ZigButton>
            <ToContainer>
              <ToOutline>
                <ZigTypography variant='h2'>
                  {t(
                    `transfer.${
                      fromTradingAccount
                        ? 'toStandbyAccount'
                        : 'toTradingAccount'
                    }`,
                  )}
                </ZigTypography>
                <Inline>
                  <TypographyNumberResult
                    variant='bigNumber'
                    color='neutral100'
                  >
                    {amountTransferValue
                      ? new BigNumber(amountTransferValue).toString()
                      : '--'}{' '}
                  </TypographyNumberResult>
                  <ZigTypography variant='h3' color='neutral400'>
                    {service?.ssc ?? 'USDT'}
                  </ZigTypography>
                </Inline>
              </ToOutline>
              <ZigTypography variant='body2' color='neutral200'>
                {t('transfer.deposit-available')}
                <TypographyBalance variant='body2' color='neutral000'>
                  <NumericFormat
                    value={balanceTo}
                    displayType={'text'}
                    suffix={` ${service?.ssc ?? 'USDT'}`}
                    thousandSeparator={true}
                  />
                </TypographyBalance>
              </ZigTypography>
            </ToContainer>
          </Body>

          <Actions>
            <ZigButton
              id={'transfer__transfer-now'}
              disabled={!isValid}
              size='xlarge'
              type='submit'
            >
              {t('transfer.now')}
            </ZigButton>
          </Actions>
        </form>
      )}
    </ZModal>
  );
}

export default TransferModal;
