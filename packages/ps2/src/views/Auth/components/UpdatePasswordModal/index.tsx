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
import TwoFAForm from '../TwoFAForm';
import UpdatePasswordForm from './UpdatePasswordForm';

const UpdatePasswordModal = ({
  close,
  action,
  ...props
}: {
  close: () => void;
  action: (code?: string) => void;
} & DialogProps) => {
  const { t } = useTranslation(['auth', 'error']);

  return (
    <ZModal
      {...props}
      wide
      close={close}
      title={t('update-password.title')}
      titleAlign='center'
    >
      <UpdatePasswordForm />
    </ZModal>
  );

  if (resetPasswordStatus.isSuccess) {
    return (
      <Box
        sx={{ width: '100%', p: 4, maxWidth: 700 }}
        gap={4.75}
        display='flex'
        flexDirection='column'
      >
        <TitleHead>
          <ZigTypography variant='h2'>
            {t('reset-password.reset-password')}
          </ZigTypography>
        </TitleHead>
        <ZigTypography textAlign='center'>
          {t('reset-password.email-sent')}
        </ZigTypography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', p: 4, maxWidth: 500 }}>
      <TitleHead>
        <ZigTypography variant={'h2'}>
          {t('reset-password.reset-password')}
        </ZigTypography>
      </TitleHead>
    </Box>
  );
};

UpdatePasswordModal.trackId = 'update-password';

export default UpdatePasswordModal;
