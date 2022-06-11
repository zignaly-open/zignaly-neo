import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import WhiteContainer from '../common/WhiteContainer';
import DepositInput from './DepositInput';
import { Box } from '@mui/material';
import UserBalance from '../Header/UserBalance';

function DepositPage() {
  const { t } = useTranslation('balance');
  // send money from
  // TODO: maybe move address to the code for security reasons i.e. so any changes will be visible in git history
  return (
    <WhiteContainer maxWidth='sm'>
      <Typography variant={'h5'} marginBottom={1}>
        {t('buy-bids')}
      </Typography>

      <Typography marginBottom={2}>{t('buy-bids-explainer')}</Typography>

      <DepositInput />

      <Box marginTop={1.5}>
        <UserBalance />
      </Box>
    </WhiteContainer>
  );
}

export default DepositPage;
