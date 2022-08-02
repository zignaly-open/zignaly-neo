import Box from '@mui/material/Box';
import { Typography } from 'zignaly-ui';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { t } = useTranslation('global');
  return (
    <Box textAlign={'center'} margin={2} marginTop={4}>
      <Typography variant={'body1'} color={'secondary'}>
        &copy; {t('logo')} {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Header;
