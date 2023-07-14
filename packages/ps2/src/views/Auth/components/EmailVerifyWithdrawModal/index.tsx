import React, { useEffect, useMemo } from 'react';
import { DialogProps } from '@mui/material/Dialog';
import { useTranslation } from 'react-i18next';
import ZModal from '../../../../components/ZModal';
import { QueryReturnTypeBasic } from 'util/queryReturnType';
import EmailVerifyForm from '../EmailVerifyForm';
import { useSendCodeWithdraw } from '../../../../apis/user/use';
import { ZigTypography } from '@zignaly-open/ui';
import { useToast } from '../../../../util/hooks/useToast';
import { Title } from '../AuthVerifyModal/styles';
function EmailVerifyWithdrawModal({
  close,
  action,
  status,
  ...props
}: {
  close: () => void;
  action: (code?: string) => void;
  status: QueryReturnTypeBasic<void>;
} & DialogProps): React.ReactElement {
  const { t } = useTranslation(['auth', 'error']);
  const [sendCode] = useSendCodeWithdraw();
  useEffect(() => {
    sendCode();
  }, [sendCode]);
  const toast = useToast();
  const performResend = () => {
    sendCode().then(() => toast.success(t('auth:resend-code')));
  };

  useEffect(() => {
    if (status.isSuccess) {
      close();
    }
  }, [status.isSuccess]);

  const error = useMemo(() => {
    const errorCode = (status.error as { data?: { error: { code: number } } })
      ?.data?.error.code;

    return errorCode === 13
      ? t('error:error.login-session-expired')
      : errorCode === 1086
      ? t(`error:error.${errorCode}`)
      : null;
  }, [t, status]);

  return (
    <ZModal
      {...props}
      allowUnauth
      close={close}
      title={t('auth:email-verify-withdraw-modal.title')}
      titleAlign='center'
    >
      <Title data-testid={'auth-verify-modal__title'}>
        <ZigTypography
          whiteSpace='pre-line'
          id={'auth-verify-modal__description'}
          textAlign={'center'}
        >
          {t(
            'auth:auth-verify-modal.isNotDisabled.askNot2FA.isEmailUnconfirmed.description',
          )}
        </ZigTypography>
      </Title>
      <EmailVerifyForm
        clearOnError
        onReSendCode={performResend}
        onSubmit={action}
        isLoading={status.isLoading}
        error={error}
      />
    </ZModal>
  );
}

export default EmailVerifyWithdrawModal;
