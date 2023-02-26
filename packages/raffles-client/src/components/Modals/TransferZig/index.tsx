import { Box, useMediaQuery } from '@mui/material';
import { useEthers, useTokenBalance } from '@usedapp/core';
import useContract from 'hooks/useContract';
import React, { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import theme from 'theme';
import {
  Button,
  InputAmountAdvanced,
  TextButton,
  Typography,
} from '@zignaly-open/ui';
import { Gap } from '../ConnectWallet/styles';
import DialogContainer from '../DialogContainer';
import { Container, InputContainer, StyledErrorOutline } from './styles';
import { TransferZigModalProps, ITransferField } from './types';
import SwitchNetworkModal from '../SwitchNetwork';
import { SubmitHandler, useForm } from 'react-hook-form';
import { utils } from 'ethers';
import { ZIGCOIN_PRECISION } from '../../../contract';

const TransferZigModal = (props: TransferZigModalProps) => {
  const { t } = useTranslation('transfer-zig');
  const address: string = process.env.REACT_APP_RECEIVING_ADDRESS as string;
  const token = process.env.REACT_APP_CONTRACT_ADDRESS as string;
  const matchesSmall = useMediaQuery(theme.breakpoints.up('sm'));
  const { account, activateBrowserWallet, chainId } = useEthers();

  const tokenBalance = useTokenBalance(token, account);

  const balance =
    tokenBalance &&
    utils.parseUnits(utils.formatUnits(tokenBalance, ZIGCOIN_PRECISION), 8);
  const { isLoading, isError, transfer, isSuccess } = useContract({
    address: address,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    watch,
    reset,
    clearErrors,
  } = useForm<ITransferField>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
  });

  useEffect(() => {
    !account && activateBrowserWallet();
    if (!address) {
      throw new Error('Receiving address not defined');
    }
  }, [account, address]);

  const watchAmount = watch('amount');
  const handleTransfer: SubmitHandler<ITransferField> = async ({ amount }) => {
    await transfer(amount.value);
    reset();
    clearErrors();
  };

  if (!chainId) {
    return <SwitchNetworkModal chainId={chainId} {...props} />;
  }

  return (
    <DialogContainer
      fullWidth={true}
      maxWidth={'sm'}
      title={t('title')}
      {...props}
    >
      {balance !== undefined ? (
        <Container>
          <Typography color='neutral200'>{t('subtitle')}</Typography>
          <Typography color='neutral200'>
            <Trans i18nKey='buy-info' t={t}>
              <TextButton
                href='https://help.zignaly.com/en/articles/6564060-transfer-your-zig-coin-to-polygon'
                caption='this article.'
                variant='body1'
              />
            </Trans>
          </Typography>
          <Gap gap={15} />
          <form onSubmit={handleSubmit(handleTransfer)}>
            <InputContainer width={matchesSmall ? 350 : null}>
              <InputAmountAdvanced
                label={''}
                value={''}
                control={control}
                placeholder={'0.0'}
                labelBalance={t('label-balance')}
                error={
                  (isDirty &&
                    errors.amount?.types?.checkNumber &&
                    t('errors.error-number')) ||
                  (!isLoading &&
                    isDirty &&
                    errors.amount?.types?.checkEmpty &&
                    t('errors.error-empty')) ||
                  (isDirty &&
                    errors.amount?.types?.checkMax &&
                    t('errors.error-max')) ||
                  (isDirty &&
                    errors.amount?.types?.checkZero &&
                    t('errors.error-zero')) ||
                  (isDirty &&
                    errors.amount?.types?.checkDecimals &&
                    t('errors.error-decimals'))
                }
                {...register('amount', {
                  validate: {
                    checkDecimals: (state) =>
                      state?.value?.toString().includes('.')
                        ? state?.value?.toString().split('.').pop().length <= 8
                        : true,
                    checkMax: (state) =>
                      balance.toNumber() >= Number(state?.value),
                    checkZero: (state) => Number(state?.value) > 0,
                    checkEmpty: (state) => state?.value.toString() != '',
                    checkNumber: (state) => !isNaN(Number(state?.value)),
                  },
                })}
                tokens={[
                  {
                    id: 'ZIG',
                    balance: utils.formatUnits(balance, 8),
                  },
                ]}
              />
            </InputContainer>
            <Gap gap={8} />
            <Box display='flex' flexDirection='row'>
              <Button
                size={matchesSmall ? 'xlarge' : 'large'}
                caption={t('button')}
                minWidth={matchesSmall ? 350 : 260}
                disabled={!watchAmount || !!errors.amount}
                loading={isLoading}
                type={'submit'}
              />
            </Box>
          </form>
          <Gap gap={8} />
          {isError && (
            <Typography
              variant={'body1'}
              weight='regular'
              color='redGraphOrError'
            >
              {t('error')}
            </Typography>
          )}
          {isSuccess && (
            <Typography variant={'body1'} weight='regular' color='links'>
              {t('success')}
            </Typography>
          )}
        </Container>
      ) : (
        <Box display='flex' alignItems={'center'} justifyContent='center' />
      )}
      <Gap gap={isError ? 8 : 14} />
      <Box display='flex' justifyContent='center' flexDirection='row'>
        <StyledErrorOutline />
        <Box display='flex' flexDirection='row' marginLeft={'5px'} width={350}>
          <Typography variant={'h4'} weight='regular' color='yellow'>
            {t('warning')}
          </Typography>
        </Box>
      </Box>
    </DialogContainer>
  );
};

export default TransferZigModal;
