import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NumericFormat } from 'react-number-format';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import {
  ZigTypography,
  ZigButton,
  ZigInputAmount,
  ZigTransferIcon,
} from '@zignaly-open/ui';
import { TransferFormData, TransferModalProps } from './types';
import { transferModalValidation } from './validation';
import {
  useTraderServiceBalance,
  useServiceDetails,
  useTraderServiceTransferFunds,
} from '../../../../apis/service/use';
import { useToast } from '../../../../util/hooks/useToast';
import ZModal, { Form, ModalActions } from 'components/ZModal';
import { useUpdateEffect } from 'react-use';
import { Box } from '@mui/material';

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
  const coin = service?.ssc ?? 'USDT';

  // TODO: maybe refetch useTraderServiceBalance just in case?

  const {
    watch,
    handleSubmit,
    control,
    trigger,
    formState: { isValid, errors, isDirty },
  } = useForm<TransferFormData>({
    mode: 'onChange',
    resolver: yupResolver(transferModalValidation(balanceFrom)),
    defaultValues: {
      amountValue: '',
    },
  });

  const amountTransferValue = watch('amountValue');

  const toggleDestination = () => {
    setFromTradingAccount((v) => !v);
  };

  useUpdateEffect(() => {
    if (isDirty) trigger('amountValue');
  }, [fromTradingAccount]);

  const onSubmit = useCallback(
    ({ amountValue }: TransferFormData) => {
      transfer({
        amount: amountValue,
        from: fromTradingAccount ? 'STA' : 'SCA',
        to: fromTradingAccount ? 'SCA' : 'STA',
      }).then(() => {
        toast.success(
          t('management:transfer.success', {
            amount: `${new BigNumber(amountValue).toFixed()} ${coin}`,
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
      <Form onSubmit={handleSubmit(onSubmit)} alignItems='center'>
        <ZigTypography textAlign='center' component='div'>
          {t('transferFunds.description')}
        </ZigTypography>

        {balance && !isTransferring && (
          <>
            <Controller
              name={'amountValue'}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <ZigInputAmount
                  id={'edit-investment-modal__input-amount'}
                  wide={true}
                  label={
                    <ZigTypography variant='h2' textAlign='center'>
                      {t(
                        fromTradingAccount
                          ? 'transfer.fromTradingAccount'
                          : 'transfer.fromStandbyAccount',
                      )}
                    </ZigTypography>
                  }
                  labelInline={false}
                  coin={coin}
                  balance={balanceFrom}
                  error={t(errors?.amountValue?.message)}
                  placeholder={t('transfer.placeholder')}
                  {...field}
                />
              )}
            />
            <ZigButton
              id={'transfer__swap-zig'}
              variant='outlined'
              narrow
              onClick={toggleDestination}
            >
              <ZigTransferIcon width={24} height={24} color={'#65647E'} />
            </ZigButton>

            <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
              gap={1}
            >
              <ZigTypography variant='h2'>
                {t(
                  `transfer.${
                    fromTradingAccount ? 'toStandbyAccount' : 'toTradingAccount'
                  }`,
                )}
              </ZigTypography>
              <Box display='flex' alignItems='center'>
                <ZigTypography variant='bigNumber' color='neutral100' mr='8px'>
                  {amountTransferValue
                    ? new BigNumber(amountTransferValue).toString()
                    : '--'}{' '}
                </ZigTypography>
                <ZigTypography variant='h3' color='neutral400'>
                  {service?.ssc ?? 'USDT'}
                </ZigTypography>
              </Box>
              <ZigTypography variant='body2' mt='-3px'>
                {t('transfer.deposit-available')}
                <ZigTypography variant='body2' color='neutral100' ml='4px'>
                  <NumericFormat
                    value={balanceTo}
                    displayType={'text'}
                    suffix={` ${service?.ssc ?? 'USDT'}`}
                    thousandSeparator={true}
                  />
                </ZigTypography>
              </ZigTypography>
            </Box>

            <ModalActions>
              <ZigButton
                id={'transfer__transfer-now'}
                disabled={!isValid}
                size='large'
                type='submit'
              >
                {t('transfer.now')}
              </ZigButton>
            </ModalActions>
          </>
        )}
      </Form>
    </ZModal>
  );
}

export default TransferModal;
