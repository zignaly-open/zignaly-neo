import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import Enable2FAForm from './Enable2FaForm';
import Disable2FAForm from './Disable2FaForm';
import { useCurrentUser } from 'apis/user/use';
import { useTitle } from 'react-use';
import { PageContainer, ZigTypography } from '@zignaly-open/ui';
import { PageWithHeaderContainer } from '../../TraderService/components/styles';

const Toggle2FA: React.FC = () => {
  const { t } = useTranslation(['settings', 'pages']);
  useTitle(t('pages:2fa'));
  const user = useCurrentUser();
  return (
    <PageContainer style={{ maxWidth: '615px' }}>
      <PageWithHeaderContainer hasHeader>
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <ZigTypography variant={'h1'} id={'update-password__title'}>
            {t('enable-2fa.title')}
          </ZigTypography>
        </Box>

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
