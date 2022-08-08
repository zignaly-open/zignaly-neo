import { ErrorOutline } from '@mui/icons-material';
import { Box, useMediaQuery } from '@mui/material';
import { useEthers, useTokenBalance } from '@usedapp/core';
import useContract from 'hooks/useContract';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import theme from 'theme';
import {
  Button,
  InputAmount,
  Loader,
  Typography,
  ZignalyIcon,
} from '@zignaly-open/ui';
import { Gap } from '../ConnectWallet/styles';
import DialogContainer from '../DialogContainer';
import { Container, InputContainer } from './styles';
import { TransferZigModalProps } from './types';

const TransferZigModal = ({
  transferOnClick,
  ...props
}: TransferZigModalProps) => {
  // TODO: Optimize performance by extracting methods
  const [transferAmount, setTransferAmount] = useState<string>();
  const address: string = process.env.REACT_APP_RECEIVING_ADDRESS as string;
  const token = process.env.REACT_APP_CONTRACT_ADDRESS as string;
  const matchesSmall = useMediaQuery(theme.breakpoints.up('sm'));
  const { t } = useTranslation('transfer-zig');
  const { account, activateBrowserWallet, chainId } = useEthers();
  const balance = useTokenBalance(token, account);
  const { isLoading, isError, transfer, isSuccess } = useContract({
    address: address,
  });
  const sendTransfer = useCallback(
    () => transfer(transferAmount),
    [transferAmount],
  );
  useEffect(() => {
    !account && activateBrowserWallet();
    if (!address) {
      throw new Error('Receiving address not defined');
    }
  }, [account, address]);
  if (!chainId) {
    return (
      <DialogContainer
        fullWidth={true}
        maxWidth={'sm'}
        title={t(chainId ? 'title' : 'wrong-network')}
        {...props}
      >
        <Typography variant='body1' color='neutral200' weight='regular'>
          {t('wrong-network-info')}
        </Typography>
      </DialogContainer>
    );
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
          <Typography variant={'body1'} color='neutral200' weight='regular'>
            {t('subtitle')}
          </Typography>
          <Gap gap={15} />
          <InputContainer width={matchesSmall ? 350 : null}>
            <InputAmount
              label={''}
              value={''}
              showMaxButton={true}
              customCoinIcon={<ZignalyIcon width={32} height={32} />}
              // TODO: we should fix types in @zignaly-open/ui
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(e: any) => {
                setTransferAmount(e.target.value);
              }}
              tokens={[
                {
                  id: 'Zig',
                  balance: balance?.toString(),
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
              disabled={!transferAmount}
              onClick={() => sendTransfer()}
              loading={isLoading}
            />
          </Box>
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
        <Box display='flex' alignItems={'center'} justifyContent='center'>
          <Loader color={'#fff'} ariaLabel={''} />
        </Box>
      )}
      <Gap gap={isError ? 8 : 14} />
      <Box display='flex' justifyContent='center' flexDirection='row'>
        <ErrorOutline color='secondary' />
        <Box display='flex' flexDirection='row' marginLeft={'5px'} width={350}>
          <Typography variant={'h4'} weight='regular' color='neutral300'>
            {t('warning')}
          </Typography>
        </Box>
      </Box>
    </DialogContainer>
  );
};

export default TransferZigModal;
