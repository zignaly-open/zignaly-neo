import React from 'react';
import { InputCode, TextButton, ZigTypography } from '@zignaly-open/ui';
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
        <ZigTypography variant={'body1'}>
          {t('login-form.verifyEmail.title')}
        </ZigTypography>
        <InputCode
          fields={6}
          error={error}
          loading={isLoading}
          clearOnError={clearOnError}
          onComplete={onSubmit}
          autoFocus={false}
        />
        <TextButton
          onClick={onReSendCode}
          caption={t('login-form.verifyEmail.button')}
          loading={isReSendLoading}
        />
      </Field>
    </Layout>
  );
}

export default EmailVerifyForm;
