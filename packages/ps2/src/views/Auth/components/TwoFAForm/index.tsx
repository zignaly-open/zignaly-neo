import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Field } from './styles';
import { TwoFAFormProps } from './types';
import { InputCode } from '@zignaly-open/ui';
import { PaddedTitle } from '../EmailVerifyForm/styles';

function TwoFAForm({
  onSubmit,
  isLoading,
  clearOnError,
  error = null,
}: TwoFAFormProps) {
  const { t } = useTranslation('auth');
  return (
    <Layout>
      <Field>
        <PaddedTitle id={'twoFA-modal__description'}>
          {t('auth-verify-modal.isNotDisabled.ask2FA.twoFA-description')}
        </PaddedTitle>
        <InputCode
          prefixId={'ask-2fa-modal'}
          fields={6}
          error={error}
          loading={isLoading}
          clearOnError={clearOnError}
          onComplete={onSubmit}
          autoFocus={true}
        />
      </Field>
    </Layout>
  );
}

export default TwoFAForm;
