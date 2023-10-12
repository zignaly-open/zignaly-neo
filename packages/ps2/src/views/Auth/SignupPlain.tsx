import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'util/title';
import { PageContainer } from '@zignaly-open/ui';
import SignupForm from './components/SignupForm';
import { useMaybeSaveMissedDestinationUrl } from '../../util/navigation';

const SignupPlain: React.FC = () => {
  const { t } = useTranslation(['pages', 'sign-up']);
  useMaybeSaveMissedDestinationUrl();

  useTitle(t('pages:signup'));

  return (
    <PageContainer
      style={{
        marginTop: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <SignupForm plain />
    </PageContainer>
  );
};

export default SignupPlain;
