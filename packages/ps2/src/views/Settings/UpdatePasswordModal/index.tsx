import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material';
import ZModal from 'components/ZModal';
import UpdatePasswordForm from './UpdatePasswordForm';

const UpdatePasswordModal = ({
  close,
  action,
  ...props
}: {
  close: () => void;
  action: (code?: string) => void;
} & DialogProps) => {
  const { t } = useTranslation('settings');

  return (
    <ZModal
      {...props}
      width={620}
      close={close}
      title={t('update-password.title')}
    >
      <UpdatePasswordForm close={close} />
    </ZModal>
  );
};

UpdatePasswordModal.trackId = 'update-password';

export default UpdatePasswordModal;
