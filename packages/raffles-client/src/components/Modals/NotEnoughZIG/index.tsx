import { Box } from '@mui/system';
import { Button, Typography } from '@zignaly-open/ui';
import { useModal } from 'mui-modal-provider';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DialogContainer from '../DialogContainer';
import TransferZigModal from '../TransferZig';
import { NotEnoughZIGsProps } from './types';

const NotEnoughZIG = (props: NotEnoughZIGsProps) => {
  const { t } = useTranslation('transfer-zig');
  const { showModal } = useModal();

  return (
    <DialogContainer
      fullWidth={true}
      maxWidth={'sm'}
      title={t('not-enough')}
      {...props}
    >
      <Box textAlign='center'>
        <Typography variant='body1' color='neutral200' weight='regular'>
          {t('not-enough-info')}
        </Typography>
      </Box>
      <Box display='flex' mt='24px' justifyContent='center'>
        <Button
          size='large'
          caption={t('title')}
          onClick={() => {
            showModal(TransferZigModal);
          }}
          minWidth={200}
        />
      </Box>
    </DialogContainer>
  );
};
export default NotEnoughZIG;
