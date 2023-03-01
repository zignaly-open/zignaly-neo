import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material';
import ZModal from 'components/ZModal';
import Enable2FAForm from './Enable2FaForm';
import Disable2FAForm from './Disable2FaForm';
import { useCurrentUser } from 'apis/user/use';

const UpdatePasswordModal = ({
  close,
  action,
  ...props
}: {
  close: () => void;
  action: (code?: string) => void;
} & DialogProps) => {
  const { t } = useTranslation('settings');
  const user = useCurrentUser();

  return (
    <ZModal
      {...props}
      wide
      close={close}
      title={t('enable-2fa.title')}
      titleAlign='left'
    >
      {user.ask2FA ? (
        <Disable2FAForm close={close} />
      ) : (
        <Enable2FAForm close={close} />
      )}
    </ZModal>
  );
};

UpdatePasswordModal.trackId = 'enable-2fa';

export default UpdatePasswordModal;
