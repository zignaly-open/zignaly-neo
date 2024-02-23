import React from 'react';
import { Loader, ZigTypography } from '@zignaly-open/ui';
import { useCurrentWlConfig } from './use';
import { useUserInfoQuery } from '../../apis/session/api';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

function WhitelabelConfigLoader({ children }: { children: JSX.Element }) {
  const { isLoading: isLoadingUserData, data } = useUserInfoQuery();
  const { isLoading } = useCurrentWlConfig();
  const { t } = useTranslation('config');
  const { wl } = useParams();

  if (data && !data.projectIds?.includes(wl)) {
    // means user navigated to a page with wl in path that does not exist
    return (
      <Box sx={{ mt: '240px', mb: 8, textAlign: 'center' }}>
        <ZigTypography>{t('wl-not-found', { wl })}</ZigTypography>
      </Box>
    );
  }

  return isLoading || isLoadingUserData ? <Loader /> : <>{children}</>;
}

export default WhitelabelConfigLoader;
