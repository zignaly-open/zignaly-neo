import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/system';
import ZModal from '../index';
import { ZigButtonProps } from '@zignaly-open/ui/lib/components/inputs/ZigButton';

export type ConfirmModalProps = {
  title: string | JSX.Element;
  description?: string | JSX.Element;
  yesLabel?: string | JSX.Element;
  yesAction: () => void;
  yesButtonProps?: Partial<ZigButtonProps>;
  noLabel?: string | JSX.Element;
  noAction?: () => void;
};

function ConfirmModal({
  close,
  title,
  description,
  yesLabel,
  yesAction,
  yesButtonProps,
  noLabel,
  noAction,
  ...props
}: {
  close: () => void;
} & ConfirmModalProps &
  DialogProps): React.ReactElement {
  const { t } = useTranslation('action');

  return (
    <ZModal {...props} close={close} title={title}>
      {!!description && <ZigTypography>{description}</ZigTypography>}

      <Box sx={{ mt: 2 }}>
        <ZigButton
          sx={{ mr: 1 }}
          variant={'contained'}
          type='submit'
          size={'large'}
          onClick={() => {
            yesAction();
            close();
          }}
          {...(yesButtonProps || {})}
        >
          {yesLabel || t('confirm')}
        </ZigButton>

        <ZigButton
          variant={'outlined'}
          type='submit'
          size={'large'}
          onClick={() => {
            noAction?.();
            close();
          }}
        >
          {noLabel || t('cancel')}
        </ZigButton>
      </Box>
    </ZModal>
  );
}

export default ConfirmModal;
