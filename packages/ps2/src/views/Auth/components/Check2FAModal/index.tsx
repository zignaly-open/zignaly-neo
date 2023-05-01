import React, { useEffect, useMemo } from 'react';
import { DialogProps } from '@mui/material/Dialog';
import TwoFAForm from '../TwoFAForm';
import { useTranslation } from 'react-i18next';
import ZModal from '../../../../components/ZModal';
import { QueryReturnTypeBasic } from 'util/queryReturnType';

function Check2FAModal({
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
      ? t('error:error.wrong-code')
      : null;
  }, [t, status]);

  return (
    <ZModal
      {...props}
      allowUnauth
      close={close}
      title={t('auth-verify-modal.isNotDisabled.ask2FA.twoFA-title')}
      titleAlign='center'
    >
      <TwoFAForm
        clearOnError
        onSubmit={action}
        isLoading={status.isLoading}
        error={error}
      />
    </ZModal>
  );
}

export default Check2FAModal;
