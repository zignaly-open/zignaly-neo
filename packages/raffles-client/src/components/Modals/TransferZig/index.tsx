import { Box, useMediaQuery } from '@mui/material';
import { useEthers, useTokenBalance } from '@usedapp/core';
import useContract from 'hooks/useContract';
import React, { useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import theme from 'theme';
import {
  Button,
  InputAmount,
  Loader,
  TextButton,
  Typography,
  ZignalyIcon,
} from '@zignaly-open/ui';
import { Gap } from '../ConnectWallet/styles';
import DialogContainer from '../DialogContainer';
import { Container, InputContainer, StyledErrorOutline } from './styles';
import { TransferZigModalProps } from './types';
import SwitchNetworkModal from '../SwitchNetwork';

function setReactInputValue(input: HTMLInputElement, value: string) {
  const previousValue = input.value;

  // eslint-disable-next-line no-param-reassign
  input.value = value;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tracker = (input as any)._valueTracker;
  if (tracker) {
    tracker.setValue(previousValue);
  }

  // 'change' instead of 'input', see https://github.com/facebook/react/issues/11488#issuecomment-381590324
  input.dispatchEvent(new Event('change', { bubbles: true }));
}

const TransferZigModal = (props: TransferZigModalProps) => {
  const { t } = useTranslation('transfer-zig');
  const [transferAmount, setTransferAmount] = useState('');
  const address: string = process.env.REACT_APP_RECEIVING_ADDRESS as string;
  const token = process.env.REACT_APP_CONTRACT_ADDRESS as string;
  const matchesSmall = useMediaQuery(theme.breakpoints.up('sm'));
  const { account, activateBrowserWallet, chainId } = useEthers();
  const inputRef = useRef<HTMLInputElement>();

  const balance = useTokenBalance(token, account);
  const { isLoading, isError, transfer, isSuccess } = useContract({
    address: address,
  });

  useEffect(() => {
    !account && activateBrowserWallet();
    if (!address) {
      throw new Error('Receiving address not defined');
    }
  }, [account, address]);

  const handleTransfer = async () => {
    await transfer(transferAmount);
    // Temporary Hack to clear the input since it's not controlled...
    setReactInputValue(inputRef.current, '');
    setTransferAmount('');
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
          <InputContainer width={matchesSmall ? 350 : null}>
            <InputAmount
              ref={inputRef}
              label={''}
              value={transferAmount}
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
              onClick={handleTransfer}
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
