import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Field } from './styles';
import { TwoFAFormProps } from './types';
import { InputCode, Typography } from '@zignaly-open/ui';

function TwoFAForm({ onSubmit, isLoading, error = null }: TwoFAFormProps) {
  const { t } = useTranslation('auth');
  return (
    <Layout>
      <Field>
        <Typography variant={'body1'}>{t('login-form.twoFA-title')}</Typography>
        <InputCode
          fields={6}
          error={error}
          loading={isLoading}
          onComplete={onSubmit}
          autoFocus={true}
        />
      </Field>
    </Layout>
  );
}

export default TwoFAForm;
