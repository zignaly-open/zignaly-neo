import Typography from '@mui/material/Typography';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import useBalance from '../../hooks/useBalance';

const HeaderBalance: React.FC = () => {
  const { balance } = useBalance();
  useTranslation('balance');
  return (
    <Typography>
      <Trans i18nKey={`balance:your-balance`} values={{ balance }}>
        <Typography
          fontSize={20}
          variant='body2'
          color='secondary.light'
          component='span'
          fontWeight={600}
        />
      </Trans>
    </Typography>
  );
};

export default HeaderBalance;
