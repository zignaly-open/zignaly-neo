import React from 'react';
import { Box } from '@mui/system';
import { Button, Typography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import DialogContainer from '../DialogContainer';
import { NoMetaMaskProps } from './types';

const NoMetaMask = (props: NoMetaMaskProps) => {
  const { t } = useTranslation('connect-wallet');
  return (
    <DialogContainer
      fullWidth={true}
      maxWidth={'sm'}
      title={t('no-wallet')}
      {...props}
    >
      <Box textAlign='center'>
        <Typography variant='body1' color='neutral200' weight='regular'>
          {t('no-wallet-info')}
        </Typography>
      </Box>
      <Box display='flex' mt='24px' justifyContent='center'>
        <a
          href='https://metamask.io/download/'
          target='_blank'
          rel='noreferrer'
        >
          <Button size='large' caption={t('get-mm')} minWidth={200} />
        </a>
      </Box>
    </DialogContainer>
  );
};
export default NoMetaMask;
