import React from 'react';
import { useTranslation } from 'react-i18next';
import UpdatePasswordForm from './UpdatePasswordForm';
import { PageContainer, ZigTypography } from '@zignaly-open/ui';
import { PageWithHeaderContainer } from 'views/TraderService/components/styles';
import { useTitle } from 'util/title';
import { Box } from '@mui/material';

const UpdatePassword: React.FC = () => {
  const { t } = useTranslation(['settings', 'pages']);
  useTitle(t('pages:update-password'));
  return (
    <PageContainer style={{ maxWidth: '615px' }}>
      <PageWithHeaderContainer>
        <Box
          sx={{
            textAlign: 'center',
            pb: 4,
          }}
        >
          <ZigTypography variant={'h1'} id={'update-password__title'}>
            {t('update-password.title')}
          </ZigTypography>
          <ZigTypography
            variant={'body1'}
            id={'update-password__description'}
            color='neutral300'
            component={'p'}
          >
            {t('update-password.description')}
          </ZigTypography>
        </Box>

        <UpdatePasswordForm />
      </PageWithHeaderContainer>
    </PageContainer>
  );
};
export default UpdatePassword;
