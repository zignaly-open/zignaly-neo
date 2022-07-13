import { ErrorOutline } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useEthers, useTokenBalance } from '@usedapp/core';
import useContract from 'hooks/useContract';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, InputAmount, Loader, Typography } from 'zignaly-ui';
import { Gap } from '../ConnectWallet/styles';
import DialogContainer from '../DialogContainer';
import { Container, InputContainer } from './styles';
import { TransferZigModalProps } from './types';

const TransferZigModal = ({
  transferOnClick,
  ...props
}: TransferZigModalProps) => {
  // TODO: Optimize performance by extracting methods
  const [transferAmount, setTransferAmount] = useState<string>('1000000');
  const address: string = process.env.REACT_APP_RECEIVING_ADDRESS as string;
  const token = process.env.REACT_APP_CONTRACT_ADDRESS as string;
  const { t } = useTranslation('transfer-zig');
  const { account, activateBrowserWallet, chainId } = useEthers();
  const balance = useTokenBalance(token, account);
  const { isLoading, isError, transfer, isSuccess } = useContract({
    address: address,
    transferAmount: transferAmount,
  });

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
          <Typography variant='body1' color='neutral200' weight='regular'>
            {t('subtitle')}
          </Typography>
          <Gap gap={15} />
          <InputContainer>
            <InputAmount
              label={''}
              value={''}
              showMaxButton={true}
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
          <Button
            size='xlarge'
            caption={t('button')}
            minWidth={350}
            disabled={!transferAmount}
            onClick={() => {
              transfer();
            }}
            loading={isLoading}
          />
          <Gap gap={8} />
          {isError && (
            <Typography
              variant='body1'
              weight='regular'
              color='redGraphOrError'
            >
              {t('error')}
            </Typography>
          )}
          {isSuccess && (
            <Typography variant='body1' weight='regular' color='links'>
              {t('success')}
            </Typography>
          )}
        </Container>
      ) : (
        <Box display='flex' alignItems={'center'} justifyContent='center'>
          <Loader color={'#fff'} ariaLabel={''} />
        </Box>
      )}
      <Gap gap={isError ? 8 : 16} />
      <Box display='flex' justifyContent='center' flexDirection='row'>
        <ErrorOutline color='secondary' />
        <Box display='flex' flexDirection='row' marginLeft={'5px'} width={350}>
          <Typography variant='h4' weight='regular' color='neutral300'>
            {t('warning')}
          </Typography>
        </Box>
      </Box>
    </DialogContainer>
  );
};

export default TransferZigModal;
