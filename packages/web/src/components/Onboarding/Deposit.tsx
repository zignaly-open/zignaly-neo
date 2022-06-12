import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DepositInput from './DepositInput';
import { Box } from '@mui/material';
import UserBalance from '../Header/UserBalance';

function Deposit() {
  const { t } = useTranslation('balance');
  return (
    <>
      <Typography>{t('buy-bids-explainer')}</Typography>

      <DepositInput />

      <Box marginTop={1}>
        <UserBalance />
      </Box>
    </>
  );
}

export default Deposit;
