import React from 'react';
import { Box } from '@mui/system';
import { Button, Typography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import DialogContainer from '../DialogContainer';
import { ConnectionCanceledModalProps } from './types';

const ConnectionCanceledModal = (props: ConnectionCanceledModalProps) => {
  const { t } = useTranslation(['connect-wallet', 'global']);
  return (
    <DialogContainer
      fullWidth={true}
      maxWidth={'sm'}
      title={t('title')}
      {...props}
    >
      <Box textAlign='center'>
        <Typography variant='body1' color='neutral200' weight='regular'>
          {t('connection-canceled')}
        </Typography>
      </Box>
      <Box display='flex' mt='24px' justifyContent='center'>
        <Button
          size='large'
          caption={t('ok', { ns: 'global' })}
          minWidth={200}
          onClick={props.onCancel}
        />
      </Box>
    </DialogContainer>
  );
};
export default ConnectionCanceledModal;
