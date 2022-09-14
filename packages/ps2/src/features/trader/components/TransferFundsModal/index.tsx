import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import NumberFormat from 'react-number-format';
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
  Loader,
  SwapVertIcon,
  Button,
  InputAmountAdvanced,
  IconButton,
} from '@zignaly-open/ui';
import { TransferFormData, TransferModalProps } from './types';
import { TransferModalValidation } from './validation';
import ModalContainer from '../../../../components/ModalContainer';

import { Box } from '@mui/system';
import { Modal } from '@mui/material';
import {
  useTraderServiceBalance,
  useTraderServiceDetails,
  useTraderServiceTransferFunds,
} from '../../use';
import { LoaderContainer } from '../../../dashboard/components/EditInvestmentModal/styles';
import { useToast } from '../../../../util/hooks/useToast';

function TransferModal({
  serviceId,
  close,
  ...props
}: TransferModalProps): React.ReactElement {
  const { t } = useTranslation('management');
  const { data: balance } = useTraderServiceBalance(serviceId);
  const { data: service } = useTraderServiceDetails(serviceId);
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
          t('management:management.transfer.success', {
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
    <Modal
      {...props}
      onClose={close}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <ModalContainer
        width={784}
        title={t('management.transferFunds.title')}
        onClickClose={close}
      >
        <Box sx={{ marginBottom: 3 }}>
          <Typography>{t('management.transferFunds.title')}</Typography>
        </Box>

        {balance && !isTransferring ? (
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Body>
              <InputAmountAdvanced
                control={control}
                placeholder={t('management.transfer.placeholder')}
                fullWidth={true}
                maxLength={26}
                error={isDirty && t(errors?.amountValue?.value?.message)}
                name={'amountValue'}
                label={t(
                  fromTradingAccount
                    ? 'management.transfer.fromTradingAccount'
                    : 'management.transfer.fromDiscAccount',
                )}
                labelBalance={t('management.transfer.labelBalance')}
                tokens={[
                  {
                    id: service?.ssc ?? 'USDT',
                    balance: balanceFrom,
                  },
                ]}
                showUnit
              />
              <IconButton
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
                      `management.transfer.${
                        fromTradingAccount
                          ? 'toDiscAccount'
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
                  {t('management.transfer.deposit-available')}
                  <TypographyBalance variant='body2' color='neutral000'>
                    <NumberFormat
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
                caption={t('management.transfer.now')}
                disabled={!isValid}
                size='xlarge'
                type='submit'
              />
            </Actions>
          </form>
        ) : (
          <LoaderContainer>
            <Loader
              color={'#fff'}
              ariaLabel={t('management.transfer.loading')}
            />
          </LoaderContainer>
        )}
      </ModalContainer>
    </Modal>
  );
}

export default TransferModal;
