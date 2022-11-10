import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import { PageContainer } from '@zignaly-open/ui';
import SignupForm from './components/SignupForm';

const Signup: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('signup'));

  return (
    <PageContainer
      style={{
        marginTop: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <SignupForm />
    </PageContainer>
  );
};

export default Signup;
