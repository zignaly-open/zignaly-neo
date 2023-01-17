import React from 'react';
import { Box } from '@mui/system';
import { Trans, useTranslation } from 'react-i18next';
import { ZigTypography } from '@zignaly-open/ui';
import { Link } from '@mui/material';
import { HELP_MANAGE_FUNDS_URL } from 'util/constants';

const ManagementHelper: React.FC = () => {
  const { t } = useTranslation('management');
  return (
    <Box sx={{ mt: 10, textAlign: 'center' }}>
      <ZigTypography color='neutral400'>
        <Trans i18nKey={'helper'} t={t}>
          <Link href={HELP_MANAGE_FUNDS_URL} target='_blank' />
        </Trans>
      </ZigTypography>
    </Box>
  );
};

export default ManagementHelper;
