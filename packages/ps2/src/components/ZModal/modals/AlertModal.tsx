import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/system';
import ZModal from '../index';

export type AlertModalProps = {
  title: string | JSX.Element;
  description?: string | JSX.Element;
  okLabel?: string | JSX.Element;
  okAction?: () => void;
};

function AlertModal({
  close,
  title,
  description,
  okLabel,
  okAction,
  ...props
}: {
  close: () => void;
} & AlertModalProps &
  DialogProps): React.ReactElement {
  const { t } = useTranslation('action');

  return (
    <ZModal {...props} close={close} title={title}>
      {!!description && <ZigTypography>{description}</ZigTypography>}

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <ZigButton
          sx={{ mr: 1 }}
          variant={'contained'}
          type='submit'
          size={'large'}
          onClick={() => {
            okAction?.();
            close();
          }}
        >
          {okLabel || t('confirm')}
        </ZigButton>
      </Box>
    </ZModal>
  );
}

export default AlertModal;
