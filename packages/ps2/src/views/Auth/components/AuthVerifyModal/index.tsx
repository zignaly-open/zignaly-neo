import React, { useEffect, useMemo } from 'react';
import { DialogProps } from '@mui/material/Dialog';
import EmailVerifyForm from '../EmailVerifyForm';
import TwoFAForm from '../TwoFAForm';
import { LoginResponse } from '../../../../apis/user/types';
import { useTranslation } from 'react-i18next';
import { Typography } from '@zignaly-open/ui';
import { Container, Title } from './styles';
import {
  useResendKnownDeviceCode,
  useVerify2FA,
  useResendCode,
  useVerifyEmail,
  useVerifyEmailKnownDevice,
} from '../../../../apis/user/use';
import { useToast } from '../../../../util/hooks/useToast';
import ZModal from '../../../../components/ZModal';

function AuthVerifyModal({
  user,
  close,
  onSuccess,
  onFailure,
  ...props
}: {
  user: LoginResponse;
  close: () => void;
  onSuccess: () => void;
  onFailure: ({ message }: { message: string }) => void;
} & DialogProps): React.ReactElement {
  const { t } = useTranslation(['auth', 'error']);
  const { ask2FA, disabled, emailUnconfirmed, isUnknownDevice } = user;
  const resendUnknown = useResendCode();
  const resendKnown = useResendKnownDeviceCode();
  const verifyUnknown = useVerifyEmail();
  const verifyKnown = useVerifyEmailKnownDevice();
  const [submit2FA, status2FA] = useVerify2FA();
  const toast = useToast();

  const [verify, verifyStatus] = disabled ? verifyUnknown : verifyKnown;
  const [resend, resendStatus] = disabled ? resendUnknown : resendKnown;

  const performResend = () => {
    resend().then(() => toast.success(t('auth:resend-code')));
  };

  const texts = useMemo(() => {
    let title = '';
    let description = '';
    if (disabled) {
      if (!verifyStatus.isSuccess) {
        title = t('auth-verify-modal.isDisabled.isNotVerifyEmailValid.title');
        description = t(
          'auth-verify-modal.isDisabled.isNotVerifyEmailValid.description',
        );
      }
    } else if (ask2FA) {
      if (verifyStatus.isSuccess) {
        // Do nothing
      } else if (isUnknownDevice) {
        title = t(
          'auth-verify-modal.isNotDisabled.ask2FA.isUnknownDevice-title',
        );
      } else {
        title = t('auth-verify-modal.isNotDisabled.ask2FA.twoFA-title');
      }
    } else {
      if (emailUnconfirmed) {
        title = t(
          'auth-verify-modal.isNotDisabled.askNot2FA.isEmailUnconfirmed.title',
        );
        description = t(
          'auth-verify-modal.isNotDisabled.askNot2FA.isEmailUnconfirmed.description',
        );
      } else if (isUnknownDevice) {
        title = t(
          'auth-verify-modal.isNotDisabled.askNot2FA.isUnknownDevice-title',
        );
      }
    }
    return { title, description };
  }, [user, t, verifyStatus.isSuccess]);

  const onClickClose = () => {
    onFailure({ message: t('error:error.failed-verification') });
    close();
  };

  const allGood =
    (!ask2FA || status2FA.isSuccess) &&
    (!(isUnknownDevice || disabled || emailUnconfirmed) ||
      verifyStatus.isSuccess);

  useEffect(() => {
    if (allGood) {
      onSuccess();
      close();
    }
  }, [allGood]);

  return (
    <ZModal {...props} close={onClickClose} title={texts.title}>
      <Title>
        {texts.description && (
          <Typography variant={'body1'} className={'description'}>
            {texts.description}
          </Typography>
        )}
      </Title>
      <Container>
        {(isUnknownDevice || disabled || emailUnconfirmed) && (
          <EmailVerifyForm
            clearOnError
            onSubmit={(code) => verify({ code })}
            onReSendCode={performResend}
            error={verifyStatus.isError ? t('error:error.wrong-code') : null}
            isReSendLoading={resendStatus.isLoading}
            isLoading={verifyStatus.isLoading}
          />
        )}

        {ask2FA && !status2FA.isSuccess && (
          <TwoFAForm
            clearOnError
            onSubmit={(code) => submit2FA({ code })}
            isLoading={status2FA.isLoading}
            error={status2FA.isError ? t('error:error.wrong-code') : null}
          />
        )}
      </Container>
    </ZModal>
  );
}

export default AuthVerifyModal;
