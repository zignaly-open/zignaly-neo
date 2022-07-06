import { Box } from '@mui/material';
import { useContractFunction, useEtherBalance, useEthers } from '@usedapp/core';
import contract from 'contract';
import { BigNumberish } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [transferAmount, setTransferAmount] = useState('1');
  const { t } = useTranslation('transfer-zig');
  const address: string = process.env.REACT_APP_RECEIVING_ADDRESS as string;
  const { state, send } = useContractFunction(contract, 'transfer');
  const { account, activateBrowserWallet, chainId } = useEthers();
  const balance = useEtherBalance(account, { chainId });
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
              onChange={(e: any, value: BigNumberish) => {
                setTransferAmount(value.toString());
              }}
              tokens={[
                {
                  id: 'Zig',
                  balance: balance?.toString() ?? '',
                },
              ]}
            />
          </InputContainer>
          <Gap gap={24} />
          <Button
            size='xlarge'
            caption={t('button')}
            minWidth={350}
            onClick={() =>
              ['Success'].includes(state?.status)
                ? () => {}
                : send(address, parseEther(transferAmount))
            }
            loading={['PendingSignature', 'Mining'].includes(state?.status)}
          />
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
