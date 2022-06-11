import Typography from '@mui/material/Typography';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import useBalance, { useBalanceSubscription } from '../../hooks/useBalance';

const UserBalance: React.FC = () => {
  const { balance } = useBalance();
  useTranslation('balance');
  useBalanceSubscription();
  return (
    <Typography>
      <Trans i18nKey={`balance:your-balance`} values={{ balance }}>
        <Typography
          fontSize={20}
          variant='body2'
          color='prettyPink.main'
          component='span'
          fontWeight={600}
        />
      </Trans>
    </Typography>
  );
};

export default UserBalance;
