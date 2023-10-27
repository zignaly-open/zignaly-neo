import React from 'react';
import { InputCode, ZigButton } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { Layout, Field, PaddedTitle } from './styles';
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
        <PaddedTitle variant={'body1'} id={'new-device-modal__description'}>
          {t('login-form.verifyEmail.title')}
        </PaddedTitle>
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
