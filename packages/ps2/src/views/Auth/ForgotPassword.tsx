import { PageContainer } from '@zignaly-open/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import ForgotPasswordForm from './components/ForgotPasswordForm';

const ForgotPassword = () => {
  const { t } = useTranslation('pages');
  useTitle(t('forgot-password'));

  return (
    <PageContainer
      style={{
        marginTop: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ForgotPasswordForm />
    </PageContainer>
  );
};

export default ForgotPassword;
