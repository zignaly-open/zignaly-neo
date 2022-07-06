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
  // State
  const [transferAmount, setTransferAmount] = useState(
    '100000000000000000000000000',
  );
  // Variables
  const address: string = process.env.REACT_APP_RECEIVING_ADDRESS as string;
  const token = process.env.REACT_APP_CONTRACT_ADDRESS as string;
  // Hooks
  const { t } = useTranslation('transfer-zig');
  const { account, activateBrowserWallet } = useEthers();
  const balance = useTokenBalance(token, account);
  const { isLoading, isError, transfer, isSuccess } = useContract({
    address: address,
    transferAmount: transferAmount,
  });

  useEffect(() => {
    !account && activateBrowserWallet();
  }, [account]);
  if (!address) {
    throw new Error('Receiving address not defined');
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
          <Gap gap={22} />
          <Button
            size='xlarge'
            caption={t('button')}
            minWidth={350}
            onClick={() => transfer()}
            loading={isLoading}
          />
          <Gap gap={6} />
          {isError && (
            <Typography
              variant='body1'
              weight='regular'
              color='redGraphOrError'
            >
              ERROR: Please try again
            </Typography>
          )}
          {isSuccess && (
            <Typography variant='body1' weight='regular' color='links'>
              SUCCESS: You Deposit {transferAmount} ZIG
            </Typography>
          )}
        </Container>
      ) : (
        <Box display='flex' alignItems={'center'} justifyContent='center'>
          <Loader color={'#fff'} ariaLabel={''} />
        </Box>
      )}
    </DialogContainer>
  );
};

export default TransferZigModal;
