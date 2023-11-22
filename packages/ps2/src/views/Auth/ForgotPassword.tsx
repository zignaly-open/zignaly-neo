import { PageContainer } from '@zignaly-open/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'util/title';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import { useLocation } from 'react-router-dom';

const ForgotPassword = () => {
  const { t } = useTranslation('pages');
  useTitle(t('forgot-password'));
  const { state } = useLocation();

  return (
    <PageContainer
      style={{
        marginTop: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ForgotPasswordForm defaultEmail={(state as { email?: string })?.email} />
    </PageContainer>
  );
};

export default ForgotPassword;
