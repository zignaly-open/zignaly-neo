import React from 'react';
import { useTranslation } from 'react-i18next';
import { Actions } from './styles';
import { Typography, Button } from '@zignaly-open/ui';

import { Box } from '@mui/system';
import { Modal } from '@mui/material';
import { DialogProps } from '@mui/material/Dialog';
import ModalContainer from 'components/ModalContainer';

function NewVersionModal({
  close,
  reloadPage,
  ...props
}: {
  reloadPage: () => void;
  close: () => void;
} & DialogProps): React.ReactElement {
  const { t } = useTranslation('common');
  return (
    <Modal
      {...props}
      onClose={close}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <ModalContainer title={t('refresh.title')} onClickClose={close}>
        <Box sx={{ maxWidth: 400 }}>
          <Typography>{t('refresh.description')}</Typography>
        </Box>

        <Actions>
          <Button
            caption={t('refresh.action')}
            onClick={reloadPage}
            size='xlarge'
            type='submit'
          />
        </Actions>
      </ModalContainer>
    </Modal>
  );
}

export default NewVersionModal;
