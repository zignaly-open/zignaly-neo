import React, { useCallback, useEffect, useMemo } from 'react';
import { DialogProps } from '@mui/material/Dialog';
import EmailVerifyForm from '../EmailVerifyForm';
import TwoFAForm from '../TwoFAForm';
import { LoginResponse } from '../../../../apis/user/types';
import { useTranslation } from 'react-i18next';
import { ZigTypography } from '@zignaly-open/ui';
import { Container, Title } from './styles';
import {
  useResendKnownDeviceCode,
  useVerify2FA,
  useResendCode,
  useVerifyEmail,
  useVerifyEmailKnownDevice,
  useVerifyEmailNewUser,
  useResendCodeNewUser,
} from '../../../../apis/user/use';
import { useToast } from '../../../../util/hooks/useToast';
import ZModal from '../../../../components/ZModal';

function AuthVerifyModal({
  user,
  close,
  onSuccess,
  onFailure,
  // Custom submit handler
  onSubmit,
  isLoading,
  ...props
}: {
  user: { token: string } & Partial<LoginResponse>;
  close: () => void;
  onSuccess: () => void;
  onFailure: ({ message }: { message: string }) => void;
  onSubmit?: (code: string) => void;
  isLoading?: boolean;
} & DialogProps): React.ReactElement {
  const { t } = useTranslation(['auth', 'error']);
  const { ask2FA, disabled, emailUnconfirmed, isUnknownDevice } = user;
  const resendEmail = useResendCode();
  const resendEmailNewUser = useResendCodeNewUser();
  const resendDevice = useResendKnownDeviceCode();
  const verifyEmail = useVerifyEmail();
  const verifyEmailNewUser = useVerifyEmailNewUser();
  const verifyDevice = useVerifyEmailKnownDevice();
  const [submit2FA, status2FA] = useVerify2FA();
  const toast = useToast();

  let [verify, verifyStatus] = verifyEmailNewUser;
  let [resend, resendStatus] = resendEmailNewUser;

  if (isUnknownDevice) {
    [verify, verifyStatus] = verifyDevice;
    [resend, resendStatus] = resendDevice;
  } else if (disabled) {
    [verify, verifyStatus] = verifyEmail;
    [resend, resendStatus] = resendEmail;
  }

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

  const getError = useCallback(
    (status: typeof verifyStatus) => {
      return status.isError
        ? t(
            (status.error as { data: { error: { code: number } } }).data.error
              .code === 13
              ? 'error:error.login-session-expired'
              : 'error:error.wrong-code',
          )
        : null;
    },
    [t],
  );

  const onClickClose = () => {
    onFailure && onFailure({ message: t('error:error.failed-verification') });
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
    <ZModal
      {...props}
      close={emailUnconfirmed ? null : onClickClose}
      title={texts.title}
      titleAlign='center'
    >
      <Title>
        {texts.description && (
          <ZigTypography>{texts.description}</ZigTypography>
        )}
      </Title>
      <Container>
        {(isUnknownDevice || disabled || emailUnconfirmed) && (
          <EmailVerifyForm
            clearOnError
            onSubmit={(code) => verify({ code })}
            onReSendCode={performResend}
            error={getError(verifyStatus)}
            isReSendLoading={resendStatus.isLoading}
            isLoading={verifyStatus.isLoading}
          />
        )}

        {ask2FA && !status2FA.isSuccess && (
          <TwoFAForm
            clearOnError
            onSubmit={(code) =>
              onSubmit ? onSubmit(code) : submit2FA({ code })
            }
            isLoading={isLoading ?? status2FA.isLoading}
            error={getError(status2FA)}
          />
        )}
      </Container>
    </ZModal>
  );
}

export default AuthVerifyModal;
