import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Field } from './styles';
import { TwoFAFormProps } from './types';
import { InputCode, ZigTypography } from '@zignaly-open/ui';

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
        <ZigTypography>
          {t('auth-verify-modal.isNotDisabled.ask2FA.twoFA-description')}
        </ZigTypography>
        <InputCode
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
