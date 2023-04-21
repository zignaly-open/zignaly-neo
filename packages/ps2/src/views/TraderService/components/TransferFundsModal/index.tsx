import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
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
  Typography,
  SwapVertIcon,
  Button,
  InputAmountAdvanced,
  IconButton,
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
      authOnly
      close={close}
      title={t('transferFunds.title')}
      isLoading={!balance || isTransferring}
    >
      <Box sx={{ marginBottom: 3 }}>
        <Typography>{t('transferFunds.description')}</Typography>
      </Box>

      {balance && !isTransferring && (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Body>
            <InputAmountAdvanced
              control={control}
              placeholder={t('transfer.placeholder')}
              fullWidth={true}
              maxLength={26}
              error={isDirty && t(errors?.amountValue?.value?.message)}
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
            <IconButton
              id={'transfer__swap-zig'}
              size='xlarge'
              icon={<SwapVertIcon color={'#65647E'} />}
              variant='secondary'
              onClick={toggleDestination}
              type='button'
            />
            <ToContainer>
              <ToOutline>
                <Typography variant='h2'>
                  {t(
                    `transfer.${
                      fromTradingAccount
                        ? 'toStandbyAccount'
                        : 'toTradingAccount'
                    }`,
                  )}
                </Typography>
                <Inline>
                  <TypographyNumberResult
                    variant='bigNumber'
                    color='neutral100'
                  >
                    {amountTransferValue
                      ? new BigNumber(amountTransferValue).toString()
                      : '--'}{' '}
                  </TypographyNumberResult>
                  <Typography variant='h3' color='neutral400'>
                    {service?.ssc ?? 'USDT'}
                  </Typography>
                </Inline>
              </ToOutline>
              <Typography variant='body2' color='neutral200'>
                {t('transfer.deposit-available')}
                <TypographyBalance variant='body2' color='neutral000'>
                  <NumericFormat
                    value={balanceTo}
                    displayType={'text'}
                    suffix={` ${service?.ssc ?? 'USDT'}`}
                    thousandSeparator={true}
                  />
                </TypographyBalance>
              </Typography>
            </ToContainer>
          </Body>

          <Actions>
            <Button
              id={'transfer__transfer-now'}
              caption={t('transfer.now')}
              disabled={!isValid}
              size='xlarge'
              type='submit'
            />
          </Actions>
        </form>
      )}
    </ZModal>
  );
}

export default TransferModal;
