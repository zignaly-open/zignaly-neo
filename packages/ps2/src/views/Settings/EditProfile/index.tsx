import React from 'react';
import { useTranslation } from 'react-i18next';
import EditProfileForm from './EditProfileForm';
import { PageContainer, ZigTypography } from '@zignaly-open/ui';
import { PageWithHeaderContainer } from 'views/TraderService/components/styles';
import { useTitle } from 'util/title';
import { Box } from '@mui/material';

const EditProfile: React.FC = () => {
  const { t } = useTranslation(['settings', 'pages']);
  useTitle(t('pages:edit-profile'));
  return (
    <PageContainer style={{ maxWidth: '915px' }}>
      <PageWithHeaderContainer>
        <Box
          sx={{
            textAlign: 'center',
            pb: 4,
          }}
        >
          <ZigTypography variant={'h1'} id={'edit-profile__title'}>
            {t('edit-profile.title')}
          </ZigTypography>
          <ZigTypography
            variant={'body1'}
            id={'edit-profile__description'}
            color='neutral300'
            component={'p'}
          >
            {t('edit-profile.description')}
          </ZigTypography>
        </Box>

        <EditProfileForm />
      </PageWithHeaderContainer>
    </PageContainer>
  );
};
export default EditProfile;
