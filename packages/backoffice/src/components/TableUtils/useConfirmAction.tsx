import { DialogProps } from '@mui/material/Dialog';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ZModal from '../ZModal';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/system';
import { useZModal } from '../ZModal/use';
import { ShowFnOutput } from 'mui-modal-provider';
import { useAsyncFn } from 'react-use';

type ConfirmActionModalProps = {
  close: () => void;
  title: string | JSX.Element;
  description?: string | JSX.Element;
  yesLabel?: string | JSX.Element;
  action: () => Promise<void>;
  noLabel?: string | JSX.Element;
};

function ConfirmActionModal({
  close,
  title,
  description,
  yesLabel,
  noLabel,
  action,
  ...props
}: ConfirmActionModalProps & DialogProps): React.ReactElement {
  const { t } = useTranslation('action');
  const [{ loading }, performAction] = useAsyncFn(action);
  return (
    <ZModal {...props} close={close} title={title}>
      {!!description && (
        <ZigTypography sx={{ textAlign: 'center' }} component={'p'}>
          {description}
        </ZigTypography>
      )}

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <ZigButton
          sx={{ mr: 1 }}
          variant={'contained'}
          type='submit'
          size={'large'}
          loading={loading}
          onClick={() => performAction().then(close)}
        >
          {yesLabel || t('confirm')}
        </ZigButton>

        <ZigButton
          variant={'outlined'}
          type='submit'
          size={'large'}
          disabled={loading}
          onClick={() => close()}
        >
          {noLabel || t('cancel')}
        </ZigButton>
      </Box>
    </ZModal>
  );
}

export default function useConfirmActionModal(): (
  props: Omit<ConfirmActionModalProps, 'close'>,
) => ShowFnOutput<void> {
  const { showModal } = useZModal();
  return (props) => showModal(ConfirmActionModal, props);
}
