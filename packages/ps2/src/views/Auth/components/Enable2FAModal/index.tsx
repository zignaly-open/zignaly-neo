import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Trans, useTranslation } from 'react-i18next';
import { Form, TitleHead } from './styles';
import { ForgotPasswordValidation } from './validations';
import { ROUTE_LOGIN, ROUTE_SIGNUP } from '../../../../routes';
import { Button, ZigInput, ZigTypography } from '@zignaly-open/ui';
import { Box, DialogProps } from '@mui/material';
import { useResetPasswordRequestMutation } from 'apis/user/api';
import AnchorLink from 'components/AnchorLink';
import ZModal from 'components/ZModal';
import Enable2FAForm from './Enable2FAForm';
import { useCurrentUser } from 'apis/user/use';

const UpdatePasswordModal = ({
  close,
  action,
  ...props
}: {
  close: () => void;
  action: (code?: string) => void;
} & DialogProps) => {
  const { t } = useTranslation('auth');
  const user = useCurrentUser();

  return (
    <ZModal
      {...props}
      wide
      close={close}
      title={t('enable-2fa.title')}
      titleAlign='left'
    >
      {user['2FAEnable'] ? <Enable2FAForm /> : <Enable2FAForm />}
    </ZModal>
  );
};

UpdatePasswordModal.trackId = 'enable-2fa';

export default UpdatePasswordModal;
