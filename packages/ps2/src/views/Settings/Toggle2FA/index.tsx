import React from 'react';
import { useTranslation } from 'react-i18next';
import Enable2FAForm from './Enable2FaForm';
import Disable2FAForm from './Disable2FaForm';
import { useCurrentUser } from 'apis/user/use';
import { useTitle } from 'util/title';
import { PageContainer } from '@zignaly-open/ui';
import { PageWithHeaderContainer } from '../../TraderService/components/styles';

const Toggle2FA: React.FC = () => {
  const { t } = useTranslation(['settings', 'pages']);
  useTitle(t('pages:2fa'));
  const user = useCurrentUser();
  return (
    <PageContainer style={{ maxWidth: '615px' }}>
      <PageWithHeaderContainer hasHeader>
        {user['2FAEnable'] ? (
          <Disable2FAForm
            close={() => {
              // Do nothing
            }}
          />
        ) : (
          <Enable2FAForm
            close={() => {
              // Do nothing
            }}
          />
        )}
      </PageWithHeaderContainer>
    </PageContainer>
  );
};
export default Toggle2FA;
