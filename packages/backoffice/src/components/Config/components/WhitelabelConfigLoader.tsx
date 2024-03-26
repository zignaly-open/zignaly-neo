import React from 'react';
import { Loader, ZigTypography } from '@zignaly-open/ui';
import { useUserInfoQuery } from '../../../apis/session/api';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useWlConfigQuery } from '../../../apis/config/api';
import { LoaderContainer } from '../../ZModal/styles';

function WhitelabelConfigLoader({ children }: { children: JSX.Element }) {
  const { isLoading: isLoadingUserData, data } = useUserInfoQuery();
  const { wl } = useParams();
  const { isLoading } = useWlConfigQuery(wl);
  const { t } = useTranslation('config');

  if (data && !data.projectIds?.includes(wl)) {
    // means user navigated to a page with wl in path that does not exist
    return (
      <Box sx={{ mt: '240px', mb: 8, textAlign: 'center' }}>
        <ZigTypography>{t('wl-not-found', { wl })}</ZigTypography>
      </Box>
    );
  }

  return isLoading || isLoadingUserData ? (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  ) : (
    <>{children}</>
  );
}

export default WhitelabelConfigLoader;
