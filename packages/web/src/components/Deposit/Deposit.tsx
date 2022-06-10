import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSendTransaction } from '@usedapp/core';
import { parseEther } from 'ethers/lib/utils';
import { Alert, LoadingButton } from '@mui/lab';
import WhiteContainer from '../common/WhiteContainer';
import { Box } from '@mui/material';

function Deposit() {
  const { t } = useTranslation('balance');
  // send money from
  // TODO: maybe move address to the code for security reasons i.e. so any changes will be visible in git history
  const address: string = process.env.REACT_APP_RECEIVING_ACCOUNT as string;
  const { sendTransaction, state } = useSendTransaction();
  const value = '0.01337'; // TODO: user input
  if (!address) {
    throw new Error('Receiving address not defined');
  }

  return (
    <WhiteContainer maxWidth='sm'>
      <Typography variant={'h5'}>{t('buy-bids')}</Typography>
      <Typography marginBottom={2} marginTop={1}>
        {t('buy-bids-explainer')}
      </Typography>

      <Box marginBottom={2}>
        {['Fail', 'Exception'].includes(state?.status) && (
          <Alert color={'error'}>{state.errorMessage}</Alert>
        )}

        {['Success'].includes(state?.status) && (
          <Alert color={'success'}>{t('success')}</Alert>
        )}
      </Box>

      <LoadingButton
        size={'large'}
        variant={'contained'}
        loading={['PendingSignature', 'Mining'].includes(state?.status)}
        onClick={() => {
          sendTransaction({
            to: address,
            value: parseEther(value),
          });
        }}
      >
        {t('buy-x-bids', { count: 100 })}
      </LoadingButton>
    </WhiteContainer>
  );
}

export default Deposit;
