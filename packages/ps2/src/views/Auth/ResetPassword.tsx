import { PageContainer } from '@zignaly-open/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import ResetPasswordForm from './components/ResetPasswordForm';

const ForgotPassword = () => {
  const { t } = useTranslation('pages');
  useTitle(t('reset-password'));

  return (
    <PageContainer
      style={{
        marginTop: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ResetPasswordForm />
    </PageContainer>
  );
};

export default ForgotPassword;
