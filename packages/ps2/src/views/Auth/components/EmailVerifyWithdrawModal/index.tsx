import React, { useEffect, useMemo } from 'react';
import { DialogProps } from '@mui/material/Dialog';
import { useTranslation } from 'react-i18next';
import ZModal from '../../../../components/ZModal';
import { QueryReturnTypeBasic } from 'util/queryReturnType';
import EmailVerifyForm from '../EmailVerifyForm';
import { useSendCodeWithdraw } from '../../../../apis/user/use';
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
  const [verify] = useSendCodeWithdraw();
  useEffect(() => {
    verify();
  }, [verify]);

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
      : errorCode === 37
      ? t(`error:error.wrong-code`)
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
      <EmailVerifyForm
        onReSendCode={() => {}}
        clearOnError
        onSubmit={action}
        isLoading={status.isLoading}
        error={error}
      />
    </ZModal>
  );
}

export default EmailVerifyWithdrawModal;
