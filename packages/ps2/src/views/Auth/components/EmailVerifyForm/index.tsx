import React from 'react';
import { InputCode, ZigButton, ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { Layout, Field } from './styles';
import { EmailVerifyFormProps } from './types';

function EmailVerifyForm({
  onSubmit,
  onReSendCode,
  clearOnError,
  isLoading,
  error = null,
  isReSendLoading = false,
}: EmailVerifyFormProps) {
  const { t } = useTranslation('auth');
  return (
    <Layout>
      <Field>
        <ZigTypography
          variant={'body1'}
          id={'new-device-modal__description'}
          sx={{ mb: '40px' }}
        >
          {t('login-form.verifyEmail.title')}
        </ZigTypography>
        <InputCode
          prefixId={'new-device-modal'}
          fields={6}
          error={error}
          loading={isLoading}
          clearOnError={clearOnError}
          onComplete={onSubmit}
          autoFocus={false}
        />
        <ZigButton
          id={'new-device-modal__resend-code'}
          variant={'text'}
          onClick={onReSendCode}
          loading={isReSendLoading}
        >
          {t('login-form.verifyEmail.button')}
        </ZigButton>
      </Field>
    </Layout>
  );
}

export default EmailVerifyForm;
