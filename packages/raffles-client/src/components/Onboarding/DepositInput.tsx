import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useContractFunction, useEthers } from '@usedapp/core';
import { parseEther } from 'ethers/lib/utils';
import { Alert, LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import contract from '../../contract';
import { useNavigate } from 'react-router-dom';

function DepositInput() {
  const { t } = useTranslation('balance');
  // send money from
  // TODO: maybe move address to the code for security reasons i.e. so any changes will be visible in git history
  const address: string = process.env.REACT_APP_RECEIVING_ADDRESS as string;
  const { state, send } = useContractFunction(contract, 'transfer');
  const { account, activateBrowserWallet } = useEthers();
  const navigate = useNavigate();
  useEffect(() => {
    !account && activateBrowserWallet();
  }, [account]);
  const value = '100'; // TODO: user input
  if (!address) {
    throw new Error('Receiving address not defined');
  }

  return (
    <>
      <Box marginBottom={2}>
        {['Fail', 'Exception'].includes(state?.status) && (
          <Alert color={'error'}>{state.errorMessage}</Alert>
        )}

        {['Success'].includes(state?.status) && (
          <Alert color={'success'}>{t('success')}</Alert>
        )}
      </Box>

      {!!account && (
        <LoadingButton
          size={'large'}
          variant={'contained'}
          loading={['PendingSignature', 'Mining'].includes(state?.status)}
          onClick={() => {
            ['Success'].includes(state?.status)
              ? () => navigate('/')
              : send(address, parseEther(value));
          }}
        >
          {['Success'].includes(state?.status)
            ? t('exit')
            : t('buy-x-bids', { count: +value })}
        </LoadingButton>
      )}
    </>
  );
}

export default DepositInput;
